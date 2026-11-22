import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type SculptureVariant = 'hero' | 'about' | 'work' | 'experience' | 'contact' | 'footer';

interface CobaltRibbon3DProps {
  className?: string;
  variant?: SculptureVariant;
}

export const CobaltRibbon3D = ({ className = '', variant = 'hero' }: CobaltRibbon3DProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 550;
    const height = mount.clientHeight || 550;

    const scene = new THREE.Scene();

    // Generous camera distance and calibrated FOV so 3D objects NEVER touch or clip canvas boundaries
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
      color: 0x0A0D18,
      emissive: 0x244BEE,
      emissiveIntensity: 0.72,
      roughness: 0.12,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });

    // Material 2: Acid-Lime Neon
    const limeMaterial = new THREE.MeshStandardMaterial({
      color: 0x7CE028,
      emissive: 0x7CE028,
      emissiveIntensity: 0.85,
      roughness: 0.25,
      metalness: 0.4,
    });

    // Material 3: Wireframe Neon Accent
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x436BFF,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    // Root Group for animations
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Keep track of disposable items
    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [
      cobaltMaterial,
      limeMaterial,
      wireframeMaterial
    ];

    // Animation hooks
    let updateAnimation: (time: number, mouseX: number, mouseY: number) => void;

    // =========================================================================
    // VARIANT 1: HERO — Glossy Electric Cobalt Torus Knot + Orbiting Lime Sphere
    // =========================================================================
    if (variant === 'hero') {
      const knotGeo = new THREE.TorusKnotGeometry(0.85, 0.28, 140, 36, 2, 3);
      disposables.push(knotGeo);
      const knotMesh = new THREE.Mesh(knotGeo, cobaltMaterial);
      knotMesh.rotation.x = 0.35;
      knotMesh.rotation.y = -0.45;
      mainGroup.add(knotMesh);

      const sphereGeo = new THREE.SphereGeometry(0.14, 32, 32);
      disposables.push(sphereGeo);
      const sphereMesh = new THREE.Mesh(sphereGeo, limeMaterial);
      sphereMesh.position.set(-1.18, -0.78, 0.75);
      mainGroup.add(sphereMesh);

      updateAnimation = (time, mX, mY) => {
        knotMesh.rotation.y += 0.007;
        knotMesh.rotation.x = Math.sin(time * 0.5) * 0.10 + mY * 0.22;
        knotMesh.rotation.z = mX * 0.22;

        sphereMesh.position.y = -0.78 + Math.sin(time * 1.5) * 0.12;
        sphereMesh.position.x = -1.18 + Math.cos(time * 1.2) * 0.10;
      };

    // =========================================================================
    // VARIANT 2: ABOUT — Concentric Gyroscope with 3 Gimbal Rings + Obsidian Core
    // =========================================================================
    } else if (variant === 'about') {
      const gyroGroup = new THREE.Group();

      // Ring 1: Outer Cobalt Ring
      const r1Geo = new THREE.TorusGeometry(1.22, 0.055, 16, 120);
      disposables.push(r1Geo);
      const ring1 = new THREE.Mesh(r1Geo, cobaltMaterial);
      gyroGroup.add(ring1);

      // Ring 2: Middle Lime/Chrome Ring
      const r2Geo = new THREE.TorusGeometry(0.92, 0.048, 16, 100);
      disposables.push(r2Geo);
      const ring2 = new THREE.Mesh(r2Geo, limeMaterial);
      ring2.rotation.x = Math.PI / 3;
      gyroGroup.add(ring2);

      // Ring 3: Inner Wireframe Ring
      const r3Geo = new THREE.TorusGeometry(0.65, 0.04, 16, 80);
      disposables.push(r3Geo);
      const ring3 = new THREE.Mesh(r3Geo, wireframeMaterial);
      ring3.rotation.y = Math.PI / 4;
      gyroGroup.add(ring3);

      // Core: Faceted Octahedron Gem
      const coreGeo = new THREE.OctahedronGeometry(0.38, 0);
      disposables.push(coreGeo);
      const core = new THREE.Mesh(coreGeo, cobaltMaterial);
      gyroGroup.add(core);

      mainGroup.add(gyroGroup);

      updateAnimation = (time, mX, mY) => {
        ring1.rotation.y += 0.008;
        ring1.rotation.x = Math.sin(time * 0.4) * 0.1 + mY * 0.25;
        ring2.rotation.x += 0.012;
        ring2.rotation.z += 0.006;
        ring3.rotation.y -= 0.014;
        core.rotation.y += 0.015;
        core.rotation.x += 0.01;
        gyroGroup.rotation.z = Math.cos(time * 0.3) * 0.08 + mX * 0.25;
      };

    // =========================================================================
    // VARIANT 3: WORK / PROJECTS — 3D Cyber-Cube Hypercube with Floating Node Spheres
    // =========================================================================
    } else if (variant === 'work') {
      const cubeGroup = new THREE.Group();

      // Outer Wireframe Cage (Sized with generous safety margin)
      const boxGeo = new THREE.BoxGeometry(1.3, 1.3, 1.3);
      disposables.push(boxGeo);
      const wireBox = new THREE.LineSegments(
        new THREE.EdgesGeometry(boxGeo),
        new THREE.LineBasicMaterial({ color: 0x436BFF, linewidth: 2 })
      );
      cubeGroup.add(wireBox);

      // 8 Corner Node Spheres in Lime
      const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
      disposables.push(nodeGeo);
      const c = 0.65;
      const corners = [
        [-c, -c, -c], [c, -c, -c], [c, c, -c], [-c, c, -c],
        [-c, -c, c], [c, -c, c], [c, c, c], [-c, c, c],
      ];
      corners.forEach(([x, y, z]) => {
        const node = new THREE.Mesh(nodeGeo, limeMaterial);
        node.position.set(x, y, z);
        cubeGroup.add(node);
      });

      // Inner Tilted Solid Cobalt Cube
      const innerBoxGeo = new THREE.BoxGeometry(0.68, 0.68, 0.68);
      disposables.push(innerBoxGeo);
      const innerCube = new THREE.Mesh(innerBoxGeo, cobaltMaterial);
      cubeGroup.add(innerCube);

      mainGroup.add(cubeGroup);

      updateAnimation = (time, mX, mY) => {
        cubeGroup.rotation.x = Math.sin(time * 0.5) * 0.1 + mY * 0.15;
        cubeGroup.rotation.y += 0.009 + mX * 0.1;
        innerCube.rotation.x -= 0.014;
        innerCube.rotation.y -= 0.012;
      };

    // =========================================================================
    // VARIANT 4: EXPERIENCE / JOURNEY — Double Helix DNA Data Spiral Column
    // =========================================================================
    } else if (variant === 'experience') {
      const helixGroup = new THREE.Group();
      const numNodes = 22;
      const sphereGeo = new THREE.SphereGeometry(0.065, 16, 16);
      disposables.push(sphereGeo);

      for (let i = 0; i < numNodes; i++) {
        const t = (i / numNodes) * Math.PI * 4;
        const y = (i / numNodes) * 2.3 - 1.15;
        const radius = 0.75;

        // Strand A Node (Cobalt)
        const nodeA = new THREE.Mesh(sphereGeo, cobaltMaterial);
        nodeA.position.set(Math.cos(t) * radius, y, Math.sin(t) * radius);
        helixGroup.add(nodeA);

        // Strand B Node (Acid Lime)
        const nodeB = new THREE.Mesh(sphereGeo, limeMaterial);
        nodeB.position.set(Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius);
        helixGroup.add(nodeB);

        // Connecting Horizontal Rung Line (every 2 nodes)
        if (i % 2 === 0) {
          const points = [nodeA.position, nodeB.position];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          disposables.push(lineGeo);
          const line = new THREE.Line(
            lineGeo,
            new THREE.LineBasicMaterial({ color: 0x436BFF, transparent: true, opacity: 0.4 })
          );
          helixGroup.add(line);
        }
      }

      mainGroup.add(helixGroup);

      updateAnimation = (time, mX, mY) => {
        helixGroup.rotation.y += 0.012;
        helixGroup.rotation.x = Math.sin(time * 0.6) * 0.08 + mY * 0.22;
        helixGroup.rotation.z = mX * 0.22;
      };

    // =========================================================================
    // VARIANT 5: CONTACT — Geodesic Cyber-Orb with Tilted Orbiting Satellite Beacon
    // =========================================================================
    } else if (variant === 'contact') {
      const orbGroup = new THREE.Group();

      // Central Polyhedral Icosahedron Orb
      const orbGeo = new THREE.IcosahedronGeometry(0.95, 1);
      disposables.push(orbGeo);
      const orbMesh = new THREE.Mesh(orbGeo, cobaltMaterial);
      orbGroup.add(orbMesh);

      // Orbiting Equatorial Ring
      const ringGeo = new THREE.TorusGeometry(1.35, 0.035, 16, 120);
      disposables.push(ringGeo);
      const ringMesh = new THREE.Mesh(ringGeo, wireframeMaterial);
      ringMesh.rotation.x = Math.PI / 2.8;
      orbGroup.add(ringMesh);

      // Satellite Beacon 1 (Acid Lime)
      const satGeo = new THREE.SphereGeometry(0.11, 24, 24);
      disposables.push(satGeo);
      const satelliteA = new THREE.Mesh(satGeo, limeMaterial);
      orbGroup.add(satelliteA);

      // Satellite Beacon 2 (Electric Cobalt)
      const sat2Geo = new THREE.SphereGeometry(0.08, 24, 24);
      disposables.push(sat2Geo);
      const satelliteB = new THREE.Mesh(sat2Geo, new THREE.MeshStandardMaterial({
        color: 0x436BFF,
        emissive: 0x436BFF,
        emissiveIntensity: 0.9,
      }));
      orbGroup.add(satelliteB);

      mainGroup.add(orbGroup);

      updateAnimation = (time, mX, mY) => {
        orbMesh.rotation.y += 0.008;
        orbMesh.rotation.x = Math.sin(time * 0.7) * 0.12 + mY * 0.18;
        orbGroup.rotation.z = mX * 0.18;

        // Satellites orbiting around the tilted ring path
        const angleA = time * 1.5;
        satelliteA.position.set(
          Math.cos(angleA) * 1.35,
          Math.sin(angleA) * 0.55,
          Math.sin(angleA) * 1.35 * 0.7
        );

        const angleB = time * 1.5 + Math.PI;
        satelliteB.position.set(
          Math.cos(angleB) * 1.35,
          Math.sin(angleB) * 0.55,
          Math.sin(angleB) * 1.35 * 0.7
        );
      };

    // =========================================================================
    // VARIANT 6: FOOTER — Mobius 4-Lobe Harmonic Ribbon
    // =========================================================================
    } else {
      const mobiusGeo = new THREE.TorusKnotGeometry(0.90, 0.22, 140, 32, 3, 4);
      disposables.push(mobiusGeo);
      const mobiusMesh = new THREE.Mesh(mobiusGeo, cobaltMaterial);
      mainGroup.add(mobiusMesh);

      const sphereGeo = new THREE.SphereGeometry(0.10, 24, 24);
      disposables.push(sphereGeo);
      const sphere = new THREE.Mesh(sphereGeo, limeMaterial);
      sphere.position.set(0, -1.05, 0.5);
      mainGroup.add(sphere);

      updateAnimation = (time, mX, mY) => {
        mobiusMesh.rotation.y += 0.008;
        mobiusMesh.rotation.x = Math.sin(time * 0.5) * 0.12 + mY * 0.22;
        mobiusMesh.rotation.z = mX * 0.22;

        sphere.position.x = Math.sin(time * 1.2) * 1.1;
        sphere.position.y = -0.9 + Math.cos(time) * 0.15;
      };
    }

    // -------------------------------------------------------------------------
    // LIGHTING SETUP
    // -------------------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyCobalt = new THREE.DirectionalLight(0x2B59FF, 4.5);
    keyCobalt.position.set(5, 5, 4);
    scene.add(keyCobalt);

    const fillLime = new THREE.DirectionalLight(0x7CE028, 1.8);
    fillLime.position.set(-4, -3, 3);
    scene.add(fillLime);

    const rimWhite = new THREE.DirectionalLight(0xffffff, 3.0);
    rimWhite.position.set(-5, 4, -3);
    scene.add(rimWhite);

    // -------------------------------------------------------------------------
    // MOUSE INTERACTIVITY
    // -------------------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / mount.clientWidth) * 2 - 1;
      const y = -(((event.clientY - rect.top) / mount.clientHeight) * 2 - 1);
      targetX = x * 0.5;
      targetY = y * 0.5;
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(mount);

    // -------------------------------------------------------------------------
    // RENDER LOOP
    // -------------------------------------------------------------------------
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.016;

      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      updateAnimation(time, mouseX, mouseY);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      disposables.forEach(d => d.dispose());
    };
  }, [variant]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-[440px] sm:h-[500px] lg:h-[560px] max-w-[580px] flex items-center justify-center relative select-none pointer-events-auto overflow-visible ${className}`}
    >
      {/* Soft ambient radial illumination to float freely */}
      <div className="absolute inset-4 rounded-full bg-cobalt/10 dark:bg-cobalt/20 blur-[90px] pointer-events-none -z-10" />

      {/* Decorative Sparkle ✦ */}
      <div className="absolute top-4 right-8 text-xl sm:text-2xl text-text-black dark:text-white select-none pointer-events-none opacity-80 animate-pulse">
        ✦
      </div>
      <div className="absolute bottom-8 left-6 text-xs text-cobalt dark:text-cobalt-light select-none pointer-events-none">
        ✦
      </div>
    </div>
  );
};
