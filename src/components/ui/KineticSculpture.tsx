import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const KineticSculpture = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = mount.clientWidth || 450;
    const height = mount.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Kinetic Outer Wireframe Icosahedron
    const outerGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x315CFF,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeometry, wireframeMaterial);
    scene.add(outerMesh);

    // Inner Glowing Core (Torus Knot / Core)
    const innerGeometry = new THREE.TorusKnotGeometry(0.7, 0.22, 100, 16);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x111216,
      emissive: 0x315CFF,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // Orbiting Acid Lime Particle Ring
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorCobalt = new THREE.Color(0x315CFF);
    const colorLime = new THREE.Color(0xD8F45A);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.2 + (Math.random() - 0.5) * 0.4;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      const c = i % 4 === 0 ? colorLime : colorCobalt;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x315CFF, 3, 50);
    pointLight.position.set(3, 4, 3);
    scene.add(pointLight);

    const limeLight = new THREE.PointLight(0xD8F45A, 2, 40);
    limeLight.position.set(-3, -3, 2);
    scene.add(limeLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / mount.clientWidth) * 2 - 1;
      const y = -(((event.clientY - rect.top) / mount.clientHeight) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth mouse easing
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      outerMesh.rotation.x += 0.003;
      outerMesh.rotation.y += 0.005;

      innerMesh.rotation.x += 0.006;
      innerMesh.rotation.y += 0.008;

      particles.rotation.y -= 0.004;

      // Cursor tilt response
      scene.rotation.y = mouseX * 0.5;
      scene.rotation.x = -mouseY * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerGeometry.dispose();
      innerGeometry.dispose();
      particleGeometry.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] max-h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing relative"
    />
  );
};

