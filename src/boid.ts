import { Vec2, random } from './math';
// import Obstacle from './obstacle';
import config from './config';

class Boid {
	static boids: Boid[] = [];

	private _position!: Vec2;
	private _velocity!: Vec2;
	private _acceleration!: Vec2;

	private _neighbours!: Boid[];

	private static _worldWidth: number;
	private static _worldHeight: number;

	public get position() { return this._position }
	public get velocity() { return this._velocity }

	public get angle() { return this._velocity.direction }

	constructor(position: Vec2, velocity: Vec2) {
		this._position = position;
		this._velocity = velocity;
		this._acceleration = Vec2.zero();
	}

	private addAcceleration(a: Vec2) {
		this._acceleration.add(a);
	}

	public tick() {
		this.flock();
		this.update();
	}

	private flock() {
		// find local boids
		this._neighbours = this.findNeighbours();

		// apply 3 rules
		const ali = this.alignment(),
			sep = this.seperation(),
			coh = this.cohesion();
		
		// adjust the 3 forces(accelerations)
		ali.scale(config.alignment);
		sep.scale(config.separation);
		coh.scale(config.cohesion);

		this.addAcceleration(ali.add(sep).add(coh));
	}

	private update() {
		// this._acceleration.scale(.4);
		this.addNoise();
		
		// updates velocity
		this._velocity.add(this._acceleration);
		this._velocity.limit(config.max_speed);


		// updates position
		this._position.add(this._velocity);

		// check if its outside the screen
		this.checkBorder();

		// reset acceleration to 0
		this._acceleration = Vec2.zero();
	}

	private checkBorder() {
		const p = this._position;
		const w = Boid._worldWidth, h = Boid._worldHeight;
		if (p.x < 0) {
			p.add(new Vec2(w, 0));
		} else if (p.x > w) {
			p.add(new Vec2(-w, 0));
		} else if (p.y < 0) {
			p.add(new Vec2(0, h));
		} else if (p.y > h) {
			p.add(new Vec2(0, -h));
		}
	}

	private alignment(): Vec2 {
		const neighbours = this._neighbours;

		// no neighbours
		if (neighbours.length === 0)
			return Vec2.zero();

		// average velocity is the target velocity
		const avgVel = Vec2.zero();
		neighbours.forEach(boid => {
			avgVel.add(boid.velocity);
		});
		avgVel.scale(1 / neighbours.length); // this line is actually useless!
		avgVel.scaleTo(config.max_speed);

		// calculate steering force (acceleration)
		const steer = Vec2.sub(avgVel, this.velocity)
			.limit(config.max_acceleration);
		return steer;
	}

	private cohesion(): Vec2 {
		const neighbours = this._neighbours;

		// no neighbours
		if (neighbours.length === 0)
			return Vec2.zero();

		// find average position
		const avgPos = Vec2.zero();
		neighbours.forEach(boid => {
			avgPos.add(boid.position);
		});
		avgPos.scale(1 / neighbours.length);
		// avgPos.scaleTo(config.max_speed);

		const targetVel = Vec2.sub(avgPos, this.position).scaleTo(config.max_speed);
		const steer = Vec2.sub(targetVel, this.velocity).limit(config.max_acceleration);

		return steer;
	}

	private seperation(): Vec2 {
		const neighbours = this._neighbours;

		const targetVel = Vec2.zero();
		let count = 0;
		neighbours.forEach(boid => {
			if ( this.distanceTo(boid) < config.separation_range ) {
				count ++;
				targetVel.add(
					Vec2.sub(this.position, boid.position)
						.scale(1 / this.distanceTo(boid))
				);
			}
		});

		// no seperation
		if ( count === 0 ) {
			return Vec2.zero();
		} 

		targetVel.scaleTo(config.max_speed);
		const steer = Vec2.sub(targetVel, this.velocity).limit(config.max_acceleration);
		return steer;
	}

	private addNoise() {
		if (Math.random() < config.noise) {
			const targetVel = Vec2.rotate(this._velocity, random(-config.noise_magnitude * Math.PI, config.noise_magnitude * Math.PI));
			this.addAcceleration(targetVel.sub(this._velocity));
		}
	}

	private findNeighbours(): Boid[] {
		return Boid.boids.filter((boid) => {
			const angle = Math.abs(this.velocity.direction - Vec2.sub(boid.position, this._position).direction);
			return (this.distanceTo(boid) < config.perception_range)
				&& (this != boid)
				&& Math.min(angle, Math.PI * 2 - angle) < (config.perception_angle / 2);
		});
	}

	public distanceTo(boid: Boid) {
		return Vec2.sub(this._position, boid.position).magnitude;
	}

	public static init(width: number, height: number) {
		this._worldWidth = width;
		this._worldHeight = height;
	}

	public static createRandom(n: number) {
		for (let i = 0; i < n; i ++ ) {
			const position = new Vec2(
				random(0, Boid._worldWidth),
				random(0, Boid._worldHeight)
			), velocity = Vec2
				.createUnit(random(0, Math.PI * 2)) // random rotation
				.scale(random(config.init_speed_min, config.init_speed_max)); // random speed

			Boid.create(
				position,
				velocity
			);
		}
	}

	public static create(position: Vec2, velocity: Vec2) {
		Boid.boids.push(new Boid(position, velocity));
	}

	public static clear() {
		Boid.boids = [];
	}
}

export default Boid;