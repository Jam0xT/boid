export class Vec2 {
	private _x!: number;
	private _y!: number;
	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	public get x() { return this._x }
	public get y() { return this._y }
	public get magnitude() { return Math.sqrt(this._x * this._x + this._y * this._y) }
	public get unit() {
		if ( this.magnitude === 0 )
			return Vec2.zero();
		return new Vec2(this._x / this.magnitude, this._y / this.magnitude)
	}
	public get xy(): [number, number] { return [this._x, this._y] }
	public get direction() { return Math.atan2(this.y, this.x) }

	public set(v: Vec2) { this._x = v.x; this._y = v.y; return this; }
	public add(v: Vec2) { this._x += v.x; this._y += v.y;return this; }
	public sub(v: Vec2) { this._x -= v.x; this._y -= v.y; return this; }
	public dot(v: Vec2) { return this._x * v.x + this._y * v.y; }
	public toZero() { this._x = 0; this._y = 0; return this; }
	public toUnit() {
		if ( this.magnitude === 0 )
			return this.toZero();
		const magnitude = this.magnitude;
		this.scale(1 / magnitude);
		return this;
	}
	public limit(maxMagnitude: number) {
		if (this.magnitude > maxMagnitude)
			this.scale(maxMagnitude / this.magnitude);
		return this;
	}
	public scale(scale: number) { this._x *= scale; this._y *= scale; return this; }
	public scaleTo(magnitude: number) { return this.toUnit().scale(magnitude); }
	public rotate(radiansCounterClockwise: number) { return this.set(Vec2.createUnit(this.direction + radiansCounterClockwise).scale(this.magnitude)); }

	public static zero() { return new Vec2(0, 0) }
	public static copy(v: Vec2) { return new Vec2(v.x, v.y) }

	public static add(v1: Vec2, v2: Vec2) { return Vec2.copy(v1).add(v2) }
	public static sub(v1: Vec2, v2: Vec2) { return Vec2.copy(v1).sub(v2) }
	public static dot(v1: Vec2, v2: Vec2) { return v1.dot(v2) }
	public static scale(v: Vec2, scale: number) { return Vec2.copy(v).scale(scale) }
	public static rotate(v: Vec2, radiansCounterClockwise: number) { return Vec2.copy(v).rotate(radiansCounterClockwise) }

	public static createUnit(direction: number) { return new Vec2(Math.cos(direction), Math.sin(direction)); }

	public static sum(vList: Vec2[]) {
		const result: Vec2 = new Vec2(0, 0);
		vList.map((v) => { result.add(v) });
		return result;
	}
}

export function random(min: number, max: number) {
	return Math.random() * (max - min) + min;
}