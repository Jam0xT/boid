import Boid from './boid';
import { Vec2, random } from './math';
import config from './config';

class Control {
	public static paused:boolean = false;
	constructor() {}
	public static init() {
		const control = document.querySelector<HTMLDivElement>('#control')!;
		const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
		canvas.addEventListener("click", e => {
			Boid.create(
				new Vec2(e.x, e.y),
				Vec2.createUnit(random(0, Math.PI * 2)) // random rotation
					.scale(random(config.init_speed_min, config.init_speed_max)) // random speed
			);
		});

		const alignment = document.querySelector<HTMLInputElement>('#alignment')!;
		alignment.addEventListener("input", e => {
			// @ts-ignore
			config.set('alignment', e.target!.value);
			// @ts-ignore
			document.querySelector<HTMLElement>('#alignment_')!.innerHTML=Number(e.target!.value as number).toFixed(2);
		});

		const separation = document.querySelector<HTMLInputElement>('#separation')!;
		separation.addEventListener("input", e => {
			// @ts-ignore
			config.set('separation', e.target!.value);
			// @ts-ignore
			document.querySelector<HTMLElement>('#separation_')!.innerHTML=Number(e.target!.value as number).toFixed(2);
		});

		const cohesion = document.querySelector<HTMLInputElement>('#cohesion')!;
		cohesion.addEventListener("input", e => {
			// @ts-ignore
			config.set('cohesion', e.target!.value);
			// @ts-ignore
			document.querySelector<HTMLElement>('#cohesion_')!.innerHTML=Number(e.target!.value as number).toFixed(2);
		});

		const clear = document.querySelector<HTMLButtonElement>('#clear')!;
		clear.addEventListener("click", () => {
			Boid.clear();
		});

		let spawnCount = 10;
		const spawn = document.querySelector<HTMLButtonElement>('#spawn')!;
		spawn.addEventListener("click", () => {
			Boid.createRandom(spawnCount);
		});
		
		const spawnInput = document.querySelector<HTMLInputElement>('#spawnInput')!;
		spawnInput.addEventListener("input", e => {
			// @ts-ignore
			spawnCount = e.target!.value;
		});

		const maxSpeed = document.querySelector<HTMLInputElement>('#maxSpeed')!;
		maxSpeed.addEventListener("input", e => {
			// @ts-ignore
			config.set('max_speed', e.target!.value);
			// @ts-ignore
			document.querySelector<HTMLElement>('#maxSpeed_')!.innerHTML=Number(e.target!.value as number).toFixed(2);
		});

		const maxForce = document.querySelector<HTMLInputElement>('#maxForce')!;
		maxForce.addEventListener("input", e => {
			// @ts-ignore
			config.set('max_acceleration', e.target!.value);
			// @ts-ignore
			document.querySelector<HTMLElement>('#maxForce_')!.innerHTML=Number(e.target!.value as number).toFixed(2);
		});

		const noise = document.querySelector<HTMLInputElement>('#noise')!;
		noise.addEventListener("input", e => {
			// @ts-ignore
			config.set('noise', e.target!.value);
			// @ts-ignore
			document.querySelector<HTMLElement>('#noise_')!.innerHTML=Number((e.target!.value as number) * 100).toFixed(0);
		});

		const noiseMag = document.querySelector<HTMLInputElement>('#noiseMag')!;
		noiseMag.addEventListener("input", e => {
			// @ts-ignore
			config.set('noise_magnitude', e.target!.value);
			// @ts-ignore
			document.querySelector<HTMLElement>('#noiseMag_')!.innerHTML=Number(e.target!.value as number).toFixed(2);
		});

		const separationRange = document.querySelector<HTMLInputElement>('#separationRange')!;
		separationRange.addEventListener("input", e => {
			// @ts-ignore
			config.set('separation_range', e.target!.value);
		});
		const perceptionRange = document.querySelector<HTMLInputElement>('#perceptionRange')!;
		perceptionRange.addEventListener("input", e => {
			// @ts-ignore
			config.set('perception_range', e.target!.value);
		});
		const perceptionAngle = document.querySelector<HTMLInputElement>('#perceptionAngle')!;
		perceptionAngle.addEventListener("input", e => {
			// @ts-ignore
			config.set('perception_angle', e.target!.value);
			// @ts-ignore
			document.querySelector<HTMLElement>('#perceptionAngle_')!.innerHTML=Number(e.target!.value as number).toFixed(2);
		});

		let shiftReleased = true;
		window.addEventListener("keydown", (e) => {
			if (e.key === ' ') {
				Control.paused = true;
			}
			if (e.key === 'Shift' ) {
				if ( shiftReleased ) {
					control.hidden = !control.hidden;
					shiftReleased = false;
				}
			}
		});
		window.addEventListener("keyup", (e) => {
			if (e.key === ' ') {
				Control.paused = false;
			}
			if (e.key === 'Shift') {
				shiftReleased = true;
			}
		});

		window.addEventListener("contextmenu", e => {e.preventDefault()});
		window.addEventListener("selectstart", e => {e.preventDefault()});
	}
}

export default Control;