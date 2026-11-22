export const runCobaltLimeConfetti = (originX = window.innerWidth / 2, originY = window.innerHeight / 2) => {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const colors = ['#2B59FF', '#7CE028', '#FFFFFF', '#60A5FA', '#A3E635'];
  const particleCount = 70;
  const particles: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
    rotation: number;
    vr: number;
  }[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.016 + Math.random() * 0.02,
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 12,
    });
  }

  let animId: number;
  const startTime = performance.now();

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.alpha -= p.decay;
      p.rotation += p.vr;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (alive && performance.now() - startTime < 1400) {
      animId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animId);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }
  };

  animId = requestAnimationFrame(render);
};
