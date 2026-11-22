import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ErrorBoundary } from '../ErrorBoundary';

export type SculptureVariant = 'hero' | 'about' | 'work' | 'experience' | 'contact' | 'footer';

interface CobaltRibbon3DProps {
  className?: string;
  variant?: SculptureVariant;
}

const STATIC_FALLBACKS: Record<SculptureVariant, string> = {
  hero: '/assets/hero/hero-3d-sculpture.webp',
  about: '/assets/hero/hero-3d-sculpture.webp',
  work: '/assets/hero/hero-3d-sculpture.webp',
  experience: '/assets/hero/hero-3d-sculpture.webp',
  contact: '/assets/contact/contact-sculpture.webp',
  footer: '/assets/footer/footer-sculpture.webp',
};

const CanvasInner = ({ className = '', variant = 'hero' }: CobaltRibbon3DProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [useFallback] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return true;
    } catch {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (useFallback) return;

    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 550;
    const height = mount.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);

      // Cap devicePixelRatio at 1.5 on mobile/tablet viewports under 768px to save GPU/battery
      const isMobile = window.innerWidth < 768;
      const pixelRatioCap = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(pixelRatioCap);

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.outline = 'none';
      renderer.domElement.style.background = 'transparent';
      mount.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Material 1: Glossy Obsidian & Electric Cobalt
    const cobaltMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a0d18,
      emissive: 0x244bee,
      emissiveIntensity: 0.72,
      roughness: 0.12,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });

    // Material 2: Acid-Lime Neon
    const limeMaterial = new THREE.MeshStandardMaterial({
      color: 0x7ce028,
      emissive: 0x7ce028,
      emissiveIntensity: 0.85,
      roughness: 0.25,
      metalness: 0.2,
    });

    // Material 3: Geometric Cobalt Wireframe
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x2b59ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [
      cobaltMaterial,
      limeMaterial,
      wireframeMaterial,
    ];

    let updateAnimation: (time: number, mx: number, my: number) => void = () => {};

    // -------------------------------------------------------------------------
    // SCULPTURE GEOMETRY BUILDER PER VARIANT
    // -------------------------------------------------------------------------
    if (variant === 'hero') {
      const knotGeo = new THREE.TorusKnotGeometry(0.85, 0.28, 140, 36, 2, 3);
      disposables.push(knotGeo);
      const knotMesh = new THREE.Mesh(knotGeo, cobaltMaterial);
      knotMesh.scale.set(1.4, 1.4, 1.4);
      mainGroup.add(knotMesh);

      const sphereGeo = new THREE.SphereGeometry(0.14, 32, 32);
      disposables.push(sphereGeo);
      const sphereMesh = new THREE.Mesh(sphereGeo, limeMaterial);
      mainGroup.add(sphereMesh);

      updateAnimation = (t, mx, my) => {
        knotMesh.rotation.x = t * 0.32 + my * 0.7;
        knotMesh.rotation.y = t * 0.44 + mx * 0.7;
        knotMesh.rotation.z = Math.sin(t * 0.25) * 0.2;

        const radius = 2.15;
        sphereMesh.position.x = Math.cos(t * 1.1) * radius;
        sphereMesh.position.y = Math.sin(t * 1.5) * 0.8;
        sphereMesh.position.z = Math.sin(t * 1.1) * radius;

        mainGroup.rotation.y = mx * 0.4;
        mainGroup.rotation.x = my * 0.4;
      };
    } else if (variant === 'about') {
      const gyroGroup = new THREE.Group();
      mainGroup.add(gyroGroup);

      const r1Geo = new THREE.TorusGeometry(1.22, 0.055, 16, 120);
      disposables.push(r1Geo);
      const ring1 = new THREE.Mesh(r1Geo, cobaltMaterial);
      gyroGroup.add(ring1);

      const r2Geo = new THREE.TorusGeometry(0.92, 0.048, 16, 100);
      disposables.push(r2Geo);
      const ring2 = new THREE.Mesh(r2Geo, limeMaterial);
      ring2.rotation.x = Math.PI / 3;
      gyroGroup.add(ring2);

      const r3Geo = new THREE.TorusGeometry(0.65, 0.04, 16, 80);
      disposables.push(r3Geo);
      const ring3 = new THREE.Mesh(r3Geo, wireframeMaterial);
      ring3.rotation.y = Math.PI / 3;
      gyroGroup.add(ring3);

      const coreGeo = new THREE.OctahedronGeometry(0.38, 0);
      disposables.push(coreGeo);
      const core = new THREE.Mesh(coreGeo, cobaltMaterial);
      gyroGroup.add(core);

      updateAnimation = (t, mx, my) => {
        ring1.rotation.z = t * 0.5 + mx * 0.5;
        ring2.rotation.x = t * 0.4 + my * 0.5;
        ring3.rotation.y = t * 0.6;
        core.rotation.x = t * 0.8;
        core.rotation.y = t * 0.8;

        gyroGroup.rotation.x = my * 0.4;
        gyroGroup.rotation.y = mx * 0.4;
      };
    } else if (variant === 'work') {
      const cubeGroup = new THREE.Group();
      mainGroup.add(cubeGroup);

      const boxGeo = new THREE.BoxGeometry(1.3, 1.3, 1.3);
      disposables.push(boxGeo);
      const wireBox = new THREE.LineSegments(
        new THREE.EdgesGeometry(boxGeo),
        new THREE.LineBasicMaterial({ color: 0x436bff, linewidth: 2 })
      );
      cubeGroup.add(wireBox);

      const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
      disposables.push(nodeGeo);
      const corners = [
        [-0.65, -0.65, -0.65], [0.65, -0.65, -0.65], [0.65, 0.65, -0.65], [-0.65, 0.65, -0.65],
        [-0.65, -0.65, 0.65], [0.65, -0.65, 0.65], [0.65, 0.65, 0.65], [-0.65, 0.65, 0.65],
      ];
      corners.forEach(([cx, cy, cz]) => {
        const node = new THREE.Mesh(nodeGeo, limeMaterial);
        node.position.set(cx, cy, cz);
        cubeGroup.add(node);
      });

      const innerBoxGeo = new THREE.BoxGeometry(0.68, 0.68, 0.68);
      disposables.push(innerBoxGeo);
      const innerCube = new THREE.Mesh(innerBoxGeo, cobaltMaterial);
      cubeGroup.add(innerCube);

      updateAnimation = (t, mx, my) => {
        cubeGroup.rotation.x = t * 0.35 + my * 0.6;
        cubeGroup.rotation.y = t * 0.45 + mx * 0.6;
        innerCube.rotation.x = -t * 0.7;
        innerCube.rotation.y = -t * 0.7;
      };
    } else if (variant === 'experience') {
      const helixGroup = new THREE.Group();
      mainGroup.add(helixGroup);
      const sphereGeo = new THREE.SphereGeometry(0.065, 16, 16);
      disposables.push(sphereGeo);

      for (let i = 0; i < 30; i++) {
        const progress = (i / 30) * Math.PI * 4;
        const y = (i / 30) * 3.4 - 1.7;
        const radius = 0.9;

        const nodeA = new THREE.Mesh(sphereGeo, cobaltMaterial);
        nodeA.position.set(Math.cos(progress) * radius, y, Math.sin(progress) * radius);
        helixGroup.add(nodeA);

        const nodeB = new THREE.Mesh(sphereGeo, limeMaterial);
        nodeB.position.set(Math.cos(progress + Math.PI) * radius, y, Math.sin(progress + Math.PI) * radius);
        helixGroup.add(nodeB);

        if (i % 3 === 0) {
          const points = [nodeA.position, nodeB.position];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          disposables.push(lineGeo);
          const line = new THREE.Line(
            lineGeo,
            new THREE.LineBasicMaterial({ color: 0x436bff, transparent: true, opacity: 0.4 })
          );
          helixGroup.add(line);
        }
      }

      updateAnimation = (t, mx, my) => {
        helixGroup.rotation.y = t * 0.5 + mx * 0.7;
        helixGroup.rotation.x = my * 0.4;
      };
    } else if (variant === 'contact') {
      const orbGroup = new THREE.Group();
      mainGroup.add(orbGroup);

      const orbGeo = new THREE.IcosahedronGeometry(0.95, 1);
      disposables.push(orbGeo);
      const orbMesh = new THREE.Mesh(orbGeo, cobaltMaterial);
      orbGroup.add(orbMesh);

      const ringGeo = new THREE.TorusGeometry(1.35, 0.035, 16, 120);
      disposables.push(ringGeo);
      const ringMesh = new THREE.Mesh(ringGeo, wireframeMaterial);
      orbGroup.add(ringMesh);

      const satGeo = new THREE.SphereGeometry(0.11, 24, 24);
      disposables.push(satGeo);
      const satelliteA = new THREE.Mesh(satGeo, limeMaterial);
      orbGroup.add(satelliteA);

      const sat2Geo = new THREE.SphereGeometry(0.08, 24, 24);
      disposables.push(sat2Geo);
      const satelliteB = new THREE.Mesh(sat2Geo, new THREE.MeshStandardMaterial({
        color: 0x436bff,
        emissive: 0x244bee,
        emissiveIntensity: 0.9,
      }));
      orbGroup.add(satelliteB);

      updateAnimation = (t, mx, my) => {
        orbMesh.rotation.y = t * 0.25 + mx * 0.4;
        ringMesh.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.3) * 0.2;
        ringMesh.rotation.y = t * 0.4;

        satelliteA.position.x = Math.cos(t * 1.2) * 1.55;
        satelliteA.position.z = Math.sin(t * 1.2) * 1.55;
        satelliteA.position.y = Math.sin(t * 1.8) * 0.4;

        satelliteB.position.x = Math.cos(-t * 0.9 + 2) * 1.85;
        satelliteB.position.z = Math.sin(-t * 0.9 + 2) * 1.85;
        satelliteB.position.y = Math.cos(t * 1.1) * 0.5;

        orbGroup.rotation.x = my * 0.3;
      };
    } else {
      const mobiusGeo = new THREE.TorusKnotGeometry(0.90, 0.22, 140, 32, 3, 4);
      disposables.push(mobiusGeo);
      const mobiusMesh = new THREE.Mesh(mobiusGeo, cobaltMaterial);
      mainGroup.add(mobiusMesh);

      const sphereGeo = new THREE.SphereGeometry(0.10, 24, 24);
      disposables.push(sphereGeo);
      const sphere = new THREE.Mesh(sphereGeo, limeMaterial);
      mainGroup.add(sphere);

      updateAnimation = (t, mx, my) => {
        mobiusMesh.rotation.x = t * 0.3 + my * 0.5;
        mobiusMesh.rotation.y = t * 0.4 + mx * 0.5;

        sphere.position.x = Math.cos(t * 1.3) * 1.7;
        sphere.position.y = Math.sin(t * 1.6) * 0.6;
        sphere.position.z = Math.sin(t * 1.3) * 1.7;
      };
    }

    // Cinematic Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyCobalt = new THREE.DirectionalLight(0x2b59ff, 4.5);
    keyCobalt.position.set(4, 5, 4);
    scene.add(keyCobalt);

    const fillLime = new THREE.DirectionalLight(0x7ce028, 1.8);
    fillLime.position.set(-4, -3, 3);
    scene.add(fillLime);

    const rimWhite = new THREE.DirectionalLight(0xffffff, 3.0);
    rimWhite.position.set(-5, 4, -3);
    scene.add(rimWhite);

    // Mouse Tracking with cached layout to avoid DOM layout recalculations on mousemove
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollProgress = 0;
    let mountRect = mount.getBoundingClientRect();

    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollProgress = Math.min(1, Math.max(0, scrollY / (window.innerHeight * 1.2)));
      if (mount) mountRect = mount.getBoundingClientRect();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouseMove = (event: MouseEvent) => {
      if (!isIntersecting || !isDocumentVisible) return;
      const x = ((event.clientX - mountRect.left) / (mountRect.width || 1)) * 2 - 1;
      const y = -(((event.clientY - mountRect.top) / (mountRect.height || 1)) * 2 - 1);
      targetX = x * 0.5;
      targetY = y * 0.5;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const handleResize = () => {
      if (!mount) return;
      mountRect = mount.getBoundingClientRect();
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(mount);

    // -------------------------------------------------------------------------
    // PERFORMANCE OPTIMIZATION: IntersectionObserver + document.hidden
    // -------------------------------------------------------------------------
    let isIntersecting = true;
    let isDocumentVisible = !document.hidden;

    const visibilityHandler = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', visibilityHandler);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(mount);

    // Render loop
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Skip GPU computation if off-screen or tab is backgrounded
      if (!isIntersecting || !isDocumentVisible) {
        return;
      }

      time += 0.016;

      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Camera dolly zoom & rim light color shifting with scroll
      camera.position.z = THREE.MathUtils.lerp(8.8, 6.5, scrollProgress);
      rimWhite.color.setHSL(0.58 + Math.sin(time * 0.7) * 0.22, 0.9, 0.65);

      updateAnimation(time, mouseX, mouseY);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', visibilityHandler);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      disposables.forEach((d) => d.dispose());
    };
  }, [variant, useFallback]);

  if (useFallback) {
    const fallbackSrc = STATIC_FALLBACKS[variant] || STATIC_FALLBACKS.hero;
    return (
      <div className={`w-full h-[440px] sm:h-[500px] lg:h-[560px] max-w-[580px] flex items-center justify-center relative select-none ${className}`}>
        <img
          src={fallbackSrc}
          alt={`Arjunan V ${variant} 3D architectural sculpture`}
          width={580}
          height={560}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`w-full h-[440px] sm:h-[500px] lg:h-[560px] max-w-[580px] flex items-center justify-center relative select-none pointer-events-auto overflow-visible ${className}`}
    >
      {/* Soft ambient radial illumination */}
      <div className="absolute inset-4 rounded-full bg-cobalt/10 blur-[90px] pointer-events-none -z-10" />

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-[radial-gradient(circle_at_center,transparent_50%,rgba(12,13,17,0.6)_100%)] -z-0" />

      {/* Decorative Sparkle ✦ */}
      <div className="absolute top-4 right-8 text-xl sm:text-2xl text-white select-none pointer-events-none opacity-80 animate-pulse">
        ✦
      </div>
      <div className="absolute bottom-8 left-6 text-xs text-cobalt-light select-none pointer-events-none">
        ✦
      </div>
    </div>
  );
};

export const CobaltRibbon3D = (props: CobaltRibbon3DProps) => {
  return (
    <ErrorBoundary name="CobaltRibbon3D">
      <CanvasInner {...props} />
    </ErrorBoundary>
  );
};
