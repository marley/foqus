(function() {
	if (window.__foqusGradientInitialized) return;
	window.__foqusGradientInitialized = true;

class _FoqusTouchTexture {
	constructor() {
		this.size = 64;
		this.width = this.height = this.size;
		this.maxAge = 64;
		this.radius = 0.25 * this.size;
		this.speed = 1 / this.maxAge;
		this.trail = [];
		this.last = null;
		this.canvas = document.createElement("canvas");
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.texture = new THREE.Texture(this.canvas);
	}

	update() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.width, this.height);
		for (let i = this.trail.length - 1; i >= 0; i--) {
			const point = this.trail[i];
			const f = point.force * this.speed * (1 - point.age / this.maxAge);
			point.x += point.vx * f;
			point.y += point.vy * f;
			point.age++;
			if (point.age > this.maxAge) {
				this.trail.splice(i, 1);
			} else {
				this._drawPoint(point);
			}
		}
		this.texture.needsUpdate = true;
	}

	addTouch(point) {
		let force = 0, vx = 0, vy = 0;
		if (this.last) {
			const dx = point.x - this.last.x;
			const dy = point.y - this.last.y;
			if (dx === 0 && dy === 0) return;
			const dd = dx * dx + dy * dy;
			const d = Math.sqrt(dd);
			vx = dx / d;
			vy = dy / d;
			force = Math.min(dd * 20000, 2.0);
		}
		this.last = { x: point.x, y: point.y };
		this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
	}

	_drawPoint(point) {
		const pos = { x: point.x * this.width, y: (1 - point.y) * this.height };
		let intensity;
		if (point.age < this.maxAge * 0.3) {
			intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
		} else {
			const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
			intensity = -t * (t - 2);
		}
		intensity *= point.force;
		const color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`;
		const offset = this.size * 5;
		this.ctx.shadowOffsetX = offset;
		this.ctx.shadowOffsetY = offset;
		this.ctx.shadowBlur = this.radius;
		this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;
		this.ctx.beginPath();
		this.ctx.fillStyle = "rgba(255,0,0,1)";
		this.ctx.arc(pos.x - offset, pos.y - offset, this.radius, 0, Math.PI * 2);
		this.ctx.fill();
	}
}

const _FOQUS_VERTEX = `
varying vec2 vUv;
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
	vUv = uv;
}`;

const _FOQUS_FRAGMENT = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform float uSpeed;
uniform float uIntensity;
uniform sampler2D uTouchTexture;
uniform float uGrainIntensity;
uniform vec3 uDarkNavy;
uniform float uGradientSize;
uniform float uGradientCount;
uniform float uColor1Weight;
uniform float uColor2Weight;
varying vec2 vUv;

#define PI 3.14159265359

float grain(vec2 uv, float time) {
	vec2 g = uv * uResolution * 0.5;
	return fract(sin(dot(g + time, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
}

vec3 getGradientColor(vec2 uv, float time) {
	float r = uGradientSize;
	vec2 c1  = vec2(0.5 + sin(time*uSpeed*0.4)*0.4,  0.5 + cos(time*uSpeed*0.5)*0.4);
	vec2 c2  = vec2(0.5 + cos(time*uSpeed*0.6)*0.5,  0.5 + sin(time*uSpeed*0.45)*0.5);
	vec2 c3  = vec2(0.5 + sin(time*uSpeed*0.35)*0.45, 0.5 + cos(time*uSpeed*0.55)*0.45);
	vec2 c4  = vec2(0.5 + cos(time*uSpeed*0.5)*0.4,  0.5 + sin(time*uSpeed*0.4)*0.4);
	vec2 c5  = vec2(0.5 + sin(time*uSpeed*0.7)*0.35, 0.5 + cos(time*uSpeed*0.6)*0.35);
	vec2 c6  = vec2(0.5 + cos(time*uSpeed*0.45)*0.5, 0.5 + sin(time*uSpeed*0.65)*0.5);
	vec2 c7  = vec2(0.5 + sin(time*uSpeed*0.55)*0.38, 0.5 + cos(time*uSpeed*0.48)*0.42);
	vec2 c8  = vec2(0.5 + cos(time*uSpeed*0.65)*0.36, 0.5 + sin(time*uSpeed*0.52)*0.44);
	vec2 c9  = vec2(0.5 + sin(time*uSpeed*0.42)*0.41, 0.5 + cos(time*uSpeed*0.58)*0.39);
	vec2 c10 = vec2(0.5 + cos(time*uSpeed*0.48)*0.37, 0.5 + sin(time*uSpeed*0.62)*0.43);
	vec2 c11 = vec2(0.5 + sin(time*uSpeed*0.68)*0.33, 0.5 + cos(time*uSpeed*0.44)*0.46);
	vec2 c12 = vec2(0.5 + cos(time*uSpeed*0.38)*0.39, 0.5 + sin(time*uSpeed*0.56)*0.41);

	float i1  = 1.0 - smoothstep(0.0, r, length(uv - c1));
	float i2  = 1.0 - smoothstep(0.0, r, length(uv - c2));
	float i3  = 1.0 - smoothstep(0.0, r, length(uv - c3));
	float i4  = 1.0 - smoothstep(0.0, r, length(uv - c4));
	float i5  = 1.0 - smoothstep(0.0, r, length(uv - c5));
	float i6  = 1.0 - smoothstep(0.0, r, length(uv - c6));
	float i7  = 1.0 - smoothstep(0.0, r, length(uv - c7));
	float i8  = 1.0 - smoothstep(0.0, r, length(uv - c8));
	float i9  = 1.0 - smoothstep(0.0, r, length(uv - c9));
	float i10 = 1.0 - smoothstep(0.0, r, length(uv - c10));
	float i11 = 1.0 - smoothstep(0.0, r, length(uv - c11));
	float i12 = 1.0 - smoothstep(0.0, r, length(uv - c12));

	vec2 rot1 = uv - 0.5;
	float a1 = time * uSpeed * 0.15;
	rot1 = vec2(rot1.x*cos(a1) - rot1.y*sin(a1), rot1.x*sin(a1) + rot1.y*cos(a1)) + 0.5;
	vec2 rot2 = uv - 0.5;
	float a2 = -time * uSpeed * 0.12;
	rot2 = vec2(rot2.x*cos(a2) - rot2.y*sin(a2), rot2.x*sin(a2) + rot2.y*cos(a2)) + 0.5;

	float ri1 = 1.0 - smoothstep(0.0, 0.8, length(rot1 - 0.5));
	float ri2 = 1.0 - smoothstep(0.0, 0.8, length(rot2 - 0.5));

	vec3 color = vec3(0.0);
	color += uColor1 * i1  * (0.55 + 0.45*sin(time*uSpeed))       * uColor1Weight;
	color += uColor2 * i2  * (0.55 + 0.45*cos(time*uSpeed*1.2))   * uColor2Weight;
	color += uColor3 * i3  * (0.55 + 0.45*sin(time*uSpeed*0.8))   * uColor1Weight;
	color += uColor4 * i4  * (0.55 + 0.45*cos(time*uSpeed*1.3))   * uColor2Weight;
	color += uColor5 * i5  * (0.55 + 0.45*sin(time*uSpeed*1.1))   * uColor1Weight;
	color += uColor6 * i6  * (0.55 + 0.45*cos(time*uSpeed*0.9))   * uColor2Weight;
	if (uGradientCount > 6.0) {
		color += uColor1 * i7  * (0.55 + 0.45*sin(time*uSpeed*1.4)) * uColor1Weight;
		color += uColor2 * i8  * (0.55 + 0.45*cos(time*uSpeed*1.5)) * uColor2Weight;
		color += uColor3 * i9  * (0.55 + 0.45*sin(time*uSpeed*1.6)) * uColor1Weight;
		color += uColor4 * i10 * (0.55 + 0.45*cos(time*uSpeed*1.7)) * uColor2Weight;
	}
	if (uGradientCount > 10.0) {
		color += uColor5 * i11 * (0.55 + 0.45*sin(time*uSpeed*1.8)) * uColor1Weight;
		color += uColor6 * i12 * (0.55 + 0.45*cos(time*uSpeed*1.9)) * uColor2Weight;
	}

	color += mix(uColor1, uColor3, ri1) * 0.45 * uColor1Weight;
	color += mix(uColor2, uColor4, ri2) * 0.4  * uColor2Weight;
	color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;
	float lum = dot(color, vec3(0.299, 0.587, 0.114));
	color = mix(vec3(lum), color, 1.35);
	color = pow(color, vec3(0.92));
	float b1 = length(color);
	color = mix(uDarkNavy, color, max(b1 * 1.2, 0.15));
	float br = length(color);
	if (br > 1.0) color *= 1.0 / br;
	return color;
}

void main() {
	vec2 uv = vUv;
	vec4 tt = texture2D(uTouchTexture, uv);
	float vx = -(tt.r * 2.0 - 1.0);
	float vy = -(tt.g * 2.0 - 1.0);
	float ti = tt.b;
	uv.x += vx * 0.8 * ti;
	uv.y += vy * 0.8 * ti;

	vec2 center = vec2(0.5);
	float dist = length(uv - center);
	uv += vec2(
		sin(dist * 20.0 - uTime * 3.0) * 0.04 * ti +
		sin(dist * 15.0 - uTime * 2.0) * 0.03 * ti
	);

	vec3 color = getGradientColor(uv, uTime);
	color += grain(uv, uTime) * uGrainIntensity;
	float ts = uTime * 0.5;
	color.r += sin(ts) * 0.02;
	color.g += cos(ts * 1.4) * 0.02;
	color.b += sin(ts * 1.2) * 0.02;
	float b2 = length(color);
	color = mix(uDarkNavy, color, max(b2 * 1.2, 0.15));
	color = clamp(color, vec3(0.0), vec3(1.0));
	float bf = length(color);
	if (bf > 1.0) color *= 1.0 / bf;
	gl_FragColor = vec4(color, 1.0);
}`;

class FoqusGradient {
	constructor(container) {
		this._container = container;
		this._animId = null;
		this._boundResize = () => this._onResize();
		this._boundMouseMove = (e) => this._onMouseMove(e);
		this._boundTouchMove = (e) => this._onTouchMove(e);

		const w = container.offsetWidth || window.innerWidth;
		const h = container.offsetHeight || window.innerHeight;

		this._renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: false,
			stencil: false,
			depth: false,
			powerPreference: "high-performance"
		});
		this._renderer.setSize(w, h);
		this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this._renderer.domElement.className = "foqus-gradient-canvas";
		container.insertBefore(this._renderer.domElement, container.firstChild);

		this._camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 10000);
		this._camera.position.z = 50;
		this._scene = new THREE.Scene();
		this._scene.background = new THREE.Color(0x000000);
		this._clock = new THREE.Clock();

		this._touchTexture = new _FoqusTouchTexture();

		this._uniforms = {
			uTime:           { value: 0 },
			uResolution:     { value: new THREE.Vector2(w, h) },
			uColor1:         { value: new THREE.Vector3(0.945, 0.353, 0.133) },
			uColor2:         { value: new THREE.Vector3(0.0, 0.259, 0.220) },
			uColor3:         { value: new THREE.Vector3(0.945, 0.353, 0.133) },
			uColor4:         { value: new THREE.Vector3(0.0, 0.0, 0.0) },
			uColor5:         { value: new THREE.Vector3(0.945, 0.353, 0.133) },
			uColor6:         { value: new THREE.Vector3(0.0, 0.0, 0.0) },
			uSpeed:          { value: 1.5 },
			uIntensity:      { value: 1.8 },
			uTouchTexture:   { value: this._touchTexture.texture },
			uGrainIntensity: { value: 0.08 },
			uDarkNavy:       { value: new THREE.Vector3(0.0, 0.0, 0.0) },
			uGradientSize:   { value: 0.45 },
			uGradientCount:  { value: 12.0 },
			uColor1Weight:   { value: 0.5 },
			uColor2Weight:   { value: 1.8 }
		};

		const viewSize = this._getViewSize();
		const geometry = new THREE.PlaneGeometry(viewSize.width, viewSize.height, 1, 1);
		const material = new THREE.ShaderMaterial({
			uniforms: this._uniforms,
			vertexShader: _FOQUS_VERTEX,
			fragmentShader: _FOQUS_FRAGMENT
		});
		this._mesh = new THREE.Mesh(geometry, material);
		this._scene.add(this._mesh);

		window.addEventListener("resize", this._boundResize);
		window.addEventListener("mousemove", this._boundMouseMove);
		window.addEventListener("touchmove", this._boundTouchMove);

		this._tick();
	}

	_getViewSize() {
		const fov = (this._camera.fov * Math.PI) / 180;
		const h = Math.abs(this._camera.position.z * Math.tan(fov / 2) * 2);
		return { width: h * this._camera.aspect, height: h };
	}

	_onResize() {
		const w = this._container.offsetWidth || window.innerWidth;
		const h = this._container.offsetHeight || window.innerHeight;
		this._camera.aspect = w / h;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(w, h);
		this._uniforms.uResolution.value.set(w, h);
		const vs = this._getViewSize();
		this._mesh.geometry.dispose();
		this._mesh.geometry = new THREE.PlaneGeometry(vs.width, vs.height, 1, 1);
	}

	_onMouseMove(ev) {
		const w = this._container.offsetWidth || window.innerWidth;
		const h = this._container.offsetHeight || window.innerHeight;
		this._touchTexture.addTouch({
			x: ev.clientX / w,
			y: 1 - ev.clientY / h
		});
	}

	_onTouchMove(ev) {
		const t = ev.touches[0];
		this._onMouseMove({ clientX: t.clientX, clientY: t.clientY });
	}

	_tick() {
		const delta = Math.min(this._clock.getDelta(), 0.1);
		this._touchTexture.update();
		this._uniforms.uTime.value += delta;
		this._renderer.render(this._scene, this._camera);
		this._animId = requestAnimationFrame(() => this._tick());
	}

	destroy() {
		if (this._animId != null) {
			cancelAnimationFrame(this._animId);
			this._animId = null;
		}
		window.removeEventListener("resize", this._boundResize);
		window.removeEventListener("mousemove", this._boundMouseMove);
		window.removeEventListener("touchmove", this._boundTouchMove);
		this._mesh.geometry.dispose();
		this._mesh.material.dispose();
		this._touchTexture.texture.dispose();
		this._renderer.dispose();
		if (this._renderer.domElement.parentNode) {
			this._renderer.domElement.parentNode.removeChild(this._renderer.domElement);
		}
	}
}

	window.FoqusGradient = FoqusGradient;
})();
