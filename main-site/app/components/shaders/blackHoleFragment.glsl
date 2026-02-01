precision highp float;

uniform float u_time;
uniform vec2 u_mouse;   // 0..1
uniform float u_strength;

varying vec2 vUv;

// radial smoothstep
float smoothCircle(float r, float center, float width) {
  return smoothstep(center+width, center, r);
}

void main() {
  vec2 uv = vUv;

  // difference from mouse (in uv space)
  vec2 diff = uv - u_mouse;
  float dist = length(diff);

  // SWIRL: compute a rotation amount that falls off with distance
  float falloff = 1.0 / (1.0 + dist*12.0);            // stronger near the mouse
  float angle = u_strength * falloff * (1.5 + 0.5*sin(u_time*1.2));
  float s = sin(angle);
  float c = cos(angle);
  diff = mat2(c, -s, s, c) * diff;
  uv = u_mouse + diff;

  // Black hole center:
  float r = length(uv - u_mouse);

  // inner dark disc
  float inner = smoothCircle(r, 0.05, 0.02);

  // glowing accretion ring
  float ring = exp(-pow((r - 0.14)*30.0, 2.0)) * (0.6 + 0.4*sin(u_time*3.0 + r*40.0));

  // subtle vignette
  float vignette = smoothstep(1.2, 0.3, length(vUv - 0.5));

  // compose color
  vec3 bg = vec3(0.01, 0.02, 0.04) * vignette;
  vec3 ringColor = vec3(1.0, 0.6, 0.2) * ring;
  vec3 color = bg + ringColor * (1.0 - inner);

  // ensure center is black
  color *= 1.0 - inner;

  gl_FragColor = vec4(color, 1.0);
}
