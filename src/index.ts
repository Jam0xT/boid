import './style.css'
import Obstacle from './obstacle';
import Boid from './boid';
import { Vec2 } from './math';
import config from './config';
import Control from './control';

window.onload = () => {
	const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;

	const width = config.fullscreen_width ? window.innerWidth : config.width;
	const height = config.fullscreen_height ? window.innerHeight : config.height;

	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext('2d')!;

	const init = () => {
		Control.init();
		Boid.init(width, height);
		Obstacle.init(width, height);
		Boid.createRandom(config.init_boid_count);
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
	}

	const update = () => {
		fillBG();

		ctx.lineWidth = config.boid_stroke_width;
		ctx.strokeStyle = config.boid_stroke_color;
		ctx.fillStyle = config.boid_fill_color;
		
		const paused = Control.paused;
		Boid.boids.forEach(boid => {
			drawBoid(boid);
			if (!paused)
				boid.tick();
		});

		requestAnimationFrame(update);
	};

	const start = () => {
		requestAnimationFrame(update);
	}

	init();
	start();

	const fillBG = () => {
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(width, 0);
		ctx.lineTo(width, height);
		ctx.lineTo(0, height);
		ctx.closePath();
		ctx.lineWidth = config.background_stroke_width;
		ctx.fillStyle = config.background_color;
		ctx.strokeStyle = config.background_stroke_color;
		ctx.fill();
		ctx.stroke();
	}

	const drawBoid = (boid: Boid) => {
		// position
		const p = boid.position;
		// velocity
		const v = boid.velocity;
		// radius
		const r = config.boid_render_radius;

		const rVec = Vec2.scale(v.unit, r);
		const apex = Vec2.add(p, rVec);
		const baseL = Vec2.add(p, Vec2.rotate(rVec, Math.PI * 5/6));
		const baseR = Vec2.add(p, Vec2.rotate(rVec, Math.PI * -5/6));


		ctx.beginPath();
		ctx.moveTo(...apex.xy);
		ctx.lineTo(...baseL.xy);
		ctx.lineTo(...baseR.xy);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
}