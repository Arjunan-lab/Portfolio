import React, { useEffect, useRef } from 'react';

export const TechnicalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 440);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 440);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Mathematical nodes forming an abstract 3D computational polyhedron
    const numNodes = 14;
    const nodes: { x: number; y: number; z: number; ox: number; oy: number; oz: number }[] = [];

    for (let i = 0; i < numNodes; i++) {
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi;
      const radius = 125;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      nodes.push({ x, y, z, ox: x, oy: y, oz: z });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      angleX += 0.003 + (mouseY - centerY) * 0.00002;
      angleY += 0.004 + (mouseX - centerX) * 0.00002;

      // 1. Draw architectural reference circles
      ctx.strokeStyle = 'rgba(223, 192, 133, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 175, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(223, 192, 133, 0.15)';
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Project 3D rotating nodes
      const projected: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let x1 = n.ox * Math.cos(angleY) - n.oz * Math.sin(angleY);
        let z1 = n.oz * Math.cos(angleY) + n.ox * Math.sin(angleY);

        let y1 = n.oy * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = z1 * Math.cos(angleX) + n.oy * Math.sin(angleX);

        const fov = 340;
        const scale = fov / (fov + z2);
        projected.push({
          x: centerX + x1 * scale,
          y: centerY + y1 * scale,
          z: z2
        });
      }

      // 3. Draw connecting architectural edges
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.35;
            ctx.strokeStyle = `rgba(223, 192, 133, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Draw node points
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.25, (p.z + 125) / 250);

        ctx.fillStyle = `rgba(249, 248, 246, ${alpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        if (i % 3 === 0) {
          ctx.strokeStyle = `rgba(223, 192, 133, ${alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
      />
    </div>
  );
};
