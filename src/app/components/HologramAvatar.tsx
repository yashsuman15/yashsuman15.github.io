import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ── Shader: Holographic Material ──────────────────────────────────────

const HOLO_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uGlitchIntensity;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;

    vec3 pos = position;

    // Glitch: horizontal slice displacement
    if (uGlitchIntensity > 0.0) {
      float sliceHash = fract(sin(floor(pos.y * 30.0 + uTime * 8.0)) * 43758.5453);
      float sliceActive = step(0.85, sliceHash);
      pos.x += sliceActive * uGlitchIntensity * 0.12 * (sliceHash - 0.5) * 2.0;
    }

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const HOLO_FRAGMENT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uGlitchIntensity;
  uniform vec3 uCameraPosition;
  uniform float uSpeakPulse; // 0..1 — flares when Alt speaks

  // Simple pseudo-random
  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    // ── Fresnel edge glow ──
    vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
    float fresnel = 1.0 - abs(dot(viewDir, vNormal));
    fresnel = pow(fresnel, 1.8);

    // ── Speaking pulse: intensify fresnel when Alt speaks ──
    float fresnelBoost = fresnel + uSpeakPulse * 0.4;
    fresnelBoost = clamp(fresnelBoost, 0.0, 1.0);

    // ── Scanlines (scrolling horizontal bands) ──
    float scanFreq = 100.0;
    float scanSpeed = 2.5;
    float scanRaw = sin(vWorldPosition.y * scanFreq + uTime * scanSpeed);
    float scanline = smoothstep(0.0, 0.4, scanRaw * 0.5 + 0.5);

    // ── Fine scanlines (static, denser) ──
    float fineScan = abs(sin(vWorldPosition.y * 300.0)) * 0.15;

    // ── Holographic color palette — Blackwall red ──
    vec3 bloodRed = vec3(1.0, 0.1, 0.1);      // #FF1A1A
    vec3 white    = vec3(1.0, 1.0, 1.0);
    vec3 darkRed  = vec3(0.4, 0.0, 0.0);      // deep void red
    vec3 hotWhite = vec3(1.0, 0.85, 0.85);    // glitch flash — warm white

    // Base color: blood red with bright highlights at edges (boosted by speak pulse)
    vec3 baseColor = mix(bloodRed, white, fresnelBoost * 0.45);
    // Add depth: darker in center, glowing at edges
    baseColor = mix(darkRed, baseColor, 0.35 + fresnelBoost * 0.65);

    // Speaking pulse: overall brightness surge — hot white edge flare
    baseColor += vec3(0.35, 0.12, 0.08) * uSpeakPulse * fresnelBoost;

    // ── Chromatic aberration at edges ──
    float rShift = fresnelBoost * 0.12;
    baseColor.r += rShift;
    baseColor.b -= rShift * 0.3;

    // ── Noise flicker ──
    float noise = rand(vUv + vec2(uTime * 0.13, 0.0));
    float flicker = 0.90 + noise * 0.10;

    // ── Scan sweep (bright horizontal line moving down) ──
    float sweepPos = fract(uTime * 0.25);
    float sweepY = mix(-1.5, 2.0, sweepPos);
    float sweep = 1.0 - smoothstep(0.0, 0.06, abs(vWorldPosition.y - sweepY));
    baseColor += vec3(0.5, 0.1, 0.08) * sweep;

    // ── Alpha computation ──
    float baseAlpha = 0.12 + fresnelBoost * 0.65;
    float alpha = baseAlpha * scanline * flicker * uOpacity;
    alpha += fineScan * uOpacity * 0.5;
    alpha += sweep * 0.3 * uOpacity;

    // Speaking pulse: overall alpha boost (glow effect)
    alpha += uSpeakPulse * 0.18 * uOpacity;

    // Minimum visibility so the model is never invisible in center
    alpha = max(alpha, 0.04 * uOpacity);

    // ── Glitch effect ──
    if (uGlitchIntensity > 0.0) {
      float glitchBand = step(0.88, rand(vec2(floor(vWorldPosition.y * 25.0), floor(uTime * 6.0))));
      baseColor = mix(baseColor, hotWhite, glitchBand * uGlitchIntensity * 0.8);
      alpha = mix(alpha, min(alpha + 0.4, 1.0), glitchBand * uGlitchIntensity);

      // Random block corruption
      float blockNoise = step(0.92, rand(vec2(floor(vUv.x * 8.0), floor(vUv.y * 15.0 + uTime * 3.0))));
      baseColor = mix(baseColor, white, blockNoise * uGlitchIntensity * 0.5);
    }

    gl_FragColor = vec4(baseColor * flicker, alpha);
  }
`;

// ── Shader: Wireframe overlay ─────────────────────────────────────────

const WIRE_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uGlitchIntensity;

  void main() {
    vec3 pos = position;
    if (uGlitchIntensity > 0.0) {
      float sliceHash = fract(sin(floor(pos.y * 30.0 + uTime * 8.0)) * 43758.5453);
      float sliceActive = step(0.85, sliceHash);
      pos.x += sliceActive * uGlitchIntensity * 0.12 * (sliceHash - 0.5) * 2.0;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const WIRE_FRAGMENT = /* glsl */ `
  uniform float uOpacity;
  uniform float uTime;

  void main() {
    float flicker = 0.85 + fract(sin(uTime * 7.3) * 43758.5453) * 0.15;
    gl_FragColor = vec4(1.0, 0.1, 0.1, 0.07 * uOpacity * flicker);
  }
`;

// ── Procedural humanoid (fallback when no GLB model is available) ─────

function createProceduralHumanoid(): THREE.Group {
  const group = new THREE.Group();

  const mat = new THREE.MeshStandardMaterial(); // placeholder, will be replaced

  // Head — slightly elongated sphere
  const headGeo = new THREE.SphereGeometry(0.14, 24, 18);
  headGeo.scale(1, 1.15, 0.95);
  const head = new THREE.Mesh(headGeo, mat);
  head.position.set(0, 0.72, 0);
  group.add(head);

  // Neck — small cylinder
  const neckGeo = new THREE.CylinderGeometry(0.05, 0.06, 0.08, 12);
  const neck = new THREE.Mesh(neckGeo, mat);
  neck.position.set(0, 0.57, 0);
  group.add(neck);

  // Torso — tapered cylinder
  const torsoGeo = new THREE.CylinderGeometry(0.14, 0.11, 0.4, 16);
  const torso = new THREE.Mesh(torsoGeo, mat);
  torso.position.set(0, 0.33, 0);
  group.add(torso);

  // Shoulders — slightly wider section
  const shoulderGeo = new THREE.CylinderGeometry(0.19, 0.14, 0.06, 16);
  const shoulders = new THREE.Mesh(shoulderGeo, mat);
  shoulders.position.set(0, 0.52, 0);
  group.add(shoulders);

  // Upper arms
  for (const side of [-1, 1]) {
    const armGeo = new THREE.CylinderGeometry(0.035, 0.03, 0.28, 8);
    const arm = new THREE.Mesh(armGeo, mat);
    arm.position.set(side * 0.22, 0.36, 0);
    arm.rotation.z = side * 0.15;
    group.add(arm);

    // Forearm
    const foreGeo = new THREE.CylinderGeometry(0.03, 0.025, 0.22, 8);
    const forearm = new THREE.Mesh(foreGeo, mat);
    forearm.position.set(side * 0.25, 0.16, 0);
    forearm.rotation.z = side * 0.1;
    group.add(forearm);
  }

  // Lower torso / hips
  const hipsGeo = new THREE.CylinderGeometry(0.11, 0.13, 0.14, 16);
  const hips = new THREE.Mesh(hipsGeo, mat);
  hips.position.set(0, 0.1, 0);
  group.add(hips);

  // Fade-out skirt (dissolving lower body)
  const fadeGeo = new THREE.CylinderGeometry(0.13, 0.18, 0.2, 16, 4, true);
  const fade = new THREE.Mesh(fadeGeo, mat);
  fade.position.set(0, -0.07, 0);
  group.add(fade);

  // Hair — back volume
  const hairGeo = new THREE.SphereGeometry(0.15, 16, 12);
  hairGeo.scale(1, 1.3, 0.7);
  const hair = new THREE.Mesh(hairGeo, mat);
  hair.position.set(0, 0.78, -0.06);
  group.add(hair);

  // Hair — side strands
  for (const side of [-1, 1]) {
    const strandGeo = new THREE.CylinderGeometry(0.025, 0.015, 0.25, 6);
    const strand = new THREE.Mesh(strandGeo, mat);
    strand.position.set(side * 0.12, 0.62, -0.04);
    strand.rotation.z = side * 0.2;
    group.add(strand);
  }

  return group;
}

// ── Component ─────────────────────────────────────────────────────────

interface HologramAvatarProps {
  phase: string; // 'materializing' | 'glitching' | '' (idle)
  isSpeaking?: boolean; // true briefly when Alt sends a new message
}

const MODEL_PATH = '/models/alt-avatar.glb';

export function HologramAvatar({ phase, isSpeaking = false }: HologramAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    holoMaterial: null as THREE.ShaderMaterial | null,
    wireMaterial: null as THREE.ShaderMaterial | null,
    model: null as THREE.Group | null,
    rafId: 0,
    startTime: 0,
    disposed: false,
    // Animation targets (smoothly interpolated)
    targetOpacity: 0,
    currentOpacity: 0,
    targetGlitch: 0,
    currentGlitch: 0,
    // Idle micro-glitch timer
    lastMicroGlitch: 0,
    microGlitchActive: false,
    microGlitchEnd: 0,
    // ── 4th-wall: Mouse tracking ──
    mouseX: 0,       // normalized -1..1 (target)
    mouseY: 0,       // normalized -1..1 (target)
    currentLookX: 0,  // smoothed
    currentLookY: 0,  // smoothed
    mouseActive: false,
    mouseIdleTimer: 0,
    // ── 4th-wall: Forward lean on materialize ──
    targetLeanZ: 0,
    currentLeanZ: -0.3,  // start pulled back
    targetScale: 1.0,
    currentScale: 0.92,
    // ── 4th-wall: Speaking pulse ──
    speakPulse: 0,       // 0..1, decays in animation loop
    speakTriggered: false,
  });

  // ── Create holographic material ──
  const createHoloMaterial = useCallback(() => {
    return new THREE.ShaderMaterial({
      vertexShader: HOLO_VERTEX,
      fragmentShader: HOLO_FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0 },
        uGlitchIntensity: { value: 0 },
        uCameraPosition: { value: new THREE.Vector3() },
        uSpeakPulse: { value: 0 },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // ── Create wireframe material ──
  const createWireMaterial = useCallback(() => {
    return new THREE.ShaderMaterial({
      vertexShader: WIRE_VERTEX,
      fragmentShader: WIRE_FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0 },
        uGlitchIntensity: { value: 0 },
      },
      transparent: true,
      wireframe: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // ── Apply holographic materials to model ──
  const applyHologramMaterials = useCallback(
    (model: THREE.Group, holoMat: THREE.ShaderMaterial, wireMat: THREE.ShaderMaterial) => {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Dispose original material
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m: THREE.Material) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
          // Apply holographic shader
          child.material = holoMat;

          // Create wireframe clone
          const wireClone = new THREE.Mesh(child.geometry, wireMat);
          wireClone.position.copy(child.position);
          wireClone.rotation.copy(child.rotation);
          wireClone.scale.copy(child.scale);
          child.parent?.add(wireClone);
        }
      });
    },
    []
  );

  // ── Center and scale model to fit viewport ──
  const fitModel = useCallback((model: THREE.Group) => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Scale to fit ~1.6 units tall
    const targetHeight = 1.6;
    const scale = targetHeight / size.y;
    model.scale.setScalar(scale);

    // Re-center
    model.position.x = -center.x * scale;
    model.position.y = -center.y * scale + 0.05;
    model.position.z = -center.z * scale;
  }, []);

  // ── Main setup effect ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const state = stateRef.current;
    state.disposed = false;
    state.startTime = performance.now();

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    const width = container.clientWidth || 220;
    const height = container.clientHeight || 340;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    state.renderer = renderer;

    // Style the canvas
    renderer.domElement.style.display = 'block';

    // ── Scene ──
    const scene = new THREE.Scene();
    state.scene = scene;

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 50);
    camera.position.set(0, 0.45, 2.4);
    camera.lookAt(0, 0.35, 0);
    state.camera = camera;

    // ── Materials ──
    const holoMaterial = createHoloMaterial();
    const wireMaterial = createWireMaterial();
    state.holoMaterial = holoMaterial;
    state.wireMaterial = wireMaterial;

    // ── Load model or use procedural fallback ──
    const loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        if (state.disposed) return;
        const model = gltf.scene;
        fitModel(model);
        applyHologramMaterials(model, holoMaterial, wireMaterial);
        scene.add(model);
        state.model = model;
      },
      undefined,
      () => {
        // GLB not found — use procedural humanoid
        if (state.disposed) return;
        console.info('[HologramAvatar] No GLB model found, using procedural humanoid.');
        const model = createProceduralHumanoid();
        applyHologramMaterials(model, holoMaterial, wireMaterial);
        scene.add(model);
        state.model = model;
      }
    );

    // ── Mouse tracking (4th-wall effect) ──
    const handlePointerMove = (e: PointerEvent) => {
      if (state.disposed) return;
      // Normalize to -1..1 across the full viewport
      state.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      state.mouseY = -((e.clientY / window.innerHeight) * 2 - 1); // invert Y
      state.mouseActive = true;
      // Reset idle timer — if mouse stops, we fade back to idle sway
      clearTimeout(state.mouseIdleTimer);
      state.mouseIdleTimer = window.setTimeout(() => {
        state.mouseActive = false;
      }, 3000);
    };
    window.addEventListener('pointermove', handlePointerMove);

    // ── Animation loop ──
    const animate = () => {
      if (state.disposed) return;

      const now = performance.now();
      const elapsed = (now - state.startTime) * 0.001; // seconds

      // Smooth interpolation of opacity and glitch
      state.currentOpacity += (state.targetOpacity - state.currentOpacity) * 0.06;
      state.currentGlitch += (state.targetGlitch - state.currentGlitch) * 0.12;

      // Idle micro-glitch bursts
      if (state.targetGlitch === 0 && state.targetOpacity > 0.5) {
        if (!state.microGlitchActive && now - state.lastMicroGlitch > 3000 + Math.random() * 5000) {
          state.microGlitchActive = true;
          state.microGlitchEnd = now + 80 + Math.random() * 150;
          state.lastMicroGlitch = now;
        }
        if (state.microGlitchActive) {
          state.currentGlitch = 0.3 + Math.random() * 0.3;
          if (now > state.microGlitchEnd) {
            state.microGlitchActive = false;
            state.currentGlitch = 0;
          }
        }
      }

      // ── 4th-wall: Speaking pulse decay ──
      if (state.speakPulse > 0.005) {
        state.speakPulse *= 0.96; // smooth exponential decay (~800ms to near-zero)
      } else {
        state.speakPulse = 0;
      }

      // Update uniforms
      if (holoMaterial) {
        holoMaterial.uniforms.uTime.value = elapsed;
        holoMaterial.uniforms.uOpacity.value = state.currentOpacity;
        holoMaterial.uniforms.uGlitchIntensity.value = state.currentGlitch;
        holoMaterial.uniforms.uCameraPosition.value.copy(camera.position);
        holoMaterial.uniforms.uSpeakPulse.value = state.speakPulse;
      }
      if (wireMaterial) {
        wireMaterial.uniforms.uTime.value = elapsed;
        wireMaterial.uniforms.uOpacity.value = state.currentOpacity;
        wireMaterial.uniforms.uGlitchIntensity.value = state.currentGlitch;
      }

      // ── 4th-wall: Model transforms (mouse tracking + forward lean + idle sway) ──
      if (state.model) {
        // Mouse tracking: smooth lerp toward cursor
        const lerpFactor = 0.05;
        if (state.mouseActive) {
          state.currentLookX += (state.mouseX - state.currentLookX) * lerpFactor;
          state.currentLookY += (state.mouseY - state.currentLookY) * lerpFactor;
        } else {
          // Fade back to center when mouse is idle
          state.currentLookX += (0 - state.currentLookX) * 0.02;
          state.currentLookY += (0 - state.currentLookY) * 0.02;
        }

        // Combine mouse tracking with subtle idle sway
        const idleSway = Math.sin(elapsed * 0.4) * 0.06; // reduced from 0.12
        const maxRotY = 0.26; // ~15 degrees horizontal
        const maxRotX = 0.14; // ~8 degrees vertical
        state.model.rotation.y = state.currentLookX * maxRotY + idleSway;
        state.model.rotation.x = -state.currentLookY * maxRotX; // look up/down

        // Forward lean: smooth Z translation
        state.currentLeanZ += (state.targetLeanZ - state.currentLeanZ) * 0.03;
        state.model.position.z = state.currentLeanZ;

        // Scale animation (accompanies forward lean)
        state.currentScale += (state.targetScale - state.currentScale) * 0.03;
        const baseScale = state.model.scale.x; // preserve fitModel's scale
        // Only adjust if we haven't stored the base scale yet
        if (!(state as any)._baseScale) {
          (state as any)._baseScale = baseScale;
        }
        const bs = (state as any)._baseScale as number;
        state.model.scale.setScalar(bs * state.currentScale);
      }

      renderer.render(scene, camera);
      state.rafId = requestAnimationFrame(animate);
    };

    state.rafId = requestAnimationFrame(animate);

    // ── Resize handler ──
    const handleResize = () => {
      if (state.disposed || !container) return;
      const w = container.clientWidth || 220;
      const h = container.clientHeight || 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup ──
    return () => {
      state.disposed = true;
      cancelAnimationFrame(state.rafId);
      clearTimeout(state.mouseIdleTimer);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: THREE.Material) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      state.renderer = null;
      state.scene = null;
      state.camera = null;
      state.holoMaterial = null;
      state.wireMaterial = null;
      state.model = null;
    };
  }, [createHoloMaterial, createWireMaterial, applyHologramMaterials, fitModel]);

  // ── React to phase changes ──
  useEffect(() => {
    const state = stateRef.current;

    switch (phase) {
      case 'materializing':
        state.targetOpacity = 0;
        state.currentOpacity = 0;
        state.targetGlitch = 0.5;
        // 4th-wall: Start pulled back, lean forward during materialize
        state.currentLeanZ = -0.3;
        state.targetLeanZ = 0;
        state.currentScale = 0.92;
        state.targetScale = 1.0;
        // Animate in
        {
          const matTimer = window.setTimeout(() => {
            state.targetOpacity = 1;
            state.targetGlitch = 0.15;
          }, 100);
          const settleTimer = window.setTimeout(() => {
            state.targetGlitch = 0;
          }, 1400);
          return () => {
            clearTimeout(matTimer);
            clearTimeout(settleTimer);
          };
        }

      case 'glitching':
        state.targetGlitch = 1.0;
        {
          const glitchTimer = window.setTimeout(() => {
            state.targetGlitch = 0;
          }, 300);
          return () => clearTimeout(glitchTimer);
        }

      default:
        // Idle — opacity stays at 1, glitch at 0
        state.targetOpacity = 1;
        state.targetGlitch = 0;
        // Ensure lean is forward
        state.targetLeanZ = 0;
        state.targetScale = 1.0;
        break;
    }
  }, [phase]);

  // ── React to isSpeaking changes ──
  useEffect(() => {
    if (isSpeaking) {
      const state = stateRef.current;
      state.speakPulse = 1.0; // spike to full, will decay in animation loop
    }
  }, [isSpeaking]);

  return (
    <div
      ref={containerRef}
      className="hologram-avatar-container"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '200px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
}
