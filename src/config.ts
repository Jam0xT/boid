const config = {
	fullscreen_width: true,
	fullscreen_height: true,
	width: 100,
	height: 900,

	init_boid_count: 100,
	init_speed_min: 2,
	init_speed_max: 4,

	boid_render_radius: 10,

	max_speed: 4,
	max_acceleration: 0.2,

	separation_range: 100,
	perception_range: 100,
	perception_angle: Math.PI * 2 * 12/12,

	alignment: 1,
	cohesion: 1,
	separation: 1,

	noise: 0.05, // chance
	noise_magnitude: 0.05, // Rotate_Max = PI/2 * noise_magnitude

	background_color: '#898AC4',
	background_stroke_color: '#819A91',
	background_stroke_width: 10,

	boid_stroke_color: '#C0C9EE',
	boid_stroke_width: 5,
	boid_fill_color: '#C0C9EE',

	set(key: string, value: number) {
		(config as any)[key] = value;
	}
};

export default config;