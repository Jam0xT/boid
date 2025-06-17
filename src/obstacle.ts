import { Vec2, random } from './math';

class Obstacle {
	static obstacles: Obstacle[];

	private _position: Vec2;
	private static _worldWidth: number;
	private static _worldHeight: number;
	
	constructor(position: Vec2) {
		this._position = position;
	}

	public get position() { return this._position; }

	public static init(width: number, height: number) {
		this._worldWidth = width;
		this._worldHeight = height;
	}

	public static createRandom(n: number) {
		for (let i = 0; i < n; i ++ ) {
			Obstacle.create(
				new Vec2(random(0, Obstacle._worldWidth), random(0, Obstacle._worldHeight))
			);
		}
	}

	public static create(position: Vec2) {
		this.obstacles.push(new Obstacle(position));
	}
}

export default Obstacle;