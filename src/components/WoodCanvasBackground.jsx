import React, { useEffect, useRef } from 'react';

const WoodCanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const sr = (s) => {
      const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const addKnot = (cx, cy, maxR, distort) => {
      const rings = 16;
      for (let k = rings; k >= 1; k--) {
        const f = k / rings;
        const r = maxR * f;
        const rx = r * (1.6 + distort * 0.1);
        const ry = r * (0.85 - distort * 0.04);
        const ang = Math.PI * 0.18;

        if (k === rings) {
          const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.7);
          glow.addColorStop(0, 'rgba(80, 40, 10, 0.18)');
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.ellipse(cx, cy, maxR * 1.3, maxR * 0.75, ang, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, ang, 0, Math.PI * 2);

        const bright = f;
        const rr = Math.floor(55 + bright * 60);
        const gg = Math.floor(25 + bright * 30);
        const bb = Math.floor(5 + bright * 10);
        const alpha = 0.03 + (1 - f) * 0.16;

        ctx.strokeStyle = `rgba(${rr},${gg},${bb},${alpha})`;
        ctx.lineWidth = 0.7 + (1 - f) * 0.8;
        ctx.stroke();
      }
    };

    const renderWood = () => {
      const W = (canvas.width = window.innerWidth);
      const H = (canvas.height = window.innerHeight);

      // 1. Deep Rich Walnut/Teak Base Gradient — Darkened left text area for perfect contrast
      const base = ctx.createLinearGradient(0, 0, W, H);
      const palette = [
        [0.00, '#0d0501'], // Dark espresso left side for text readability
        [0.18, '#1c0a03'],
        [0.35, '#2e1205'],
        [0.50, '#3e1b08'],
        [0.65, '#4a210a'],
        [0.80, '#311406'],
        [1.00, '#160802'],
      ];
      palette.forEach(([p, c]) => base.addColorStop(p, c));
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);

      // 2. Grain Lines (Subtle warm amber highlights + dark espresso ribbons)
      const totalLines = Math.round(H / 4.2);
      for (let i = 0; i < totalLines; i++) {
        const seed = i * 83.1 + 19;
        const t = i / totalLines;
        const yBase = t * H;

        const amp1 = 3.5 + sr(seed) * 20;
        const amp2 = 1.2 + sr(seed + 1) * 7;
        const freq1 = 0.0022 + sr(seed + 3) * 0.005;
        const freq2 = freq1 * (1.6 + sr(seed + 4) * 1.1);
        const ph1 = sr(seed + 6) * Math.PI * 2;
        const ph2 = sr(seed + 7) * Math.PI * 2;
        const yOff = sr(seed + 9) * 5 - 2.5;

        ctx.beginPath();
        for (let x = 0; x <= W + 4; x += 3) {
          const y =
            yBase +
            yOff +
            Math.sin(x * freq1 + ph1) * amp1 +
            Math.sin(x * freq2 + ph2) * amp2;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        const bright = sr(seed + 10);
        const isAmberHighlight = bright > 0.75;
        const isDarkGrain = bright < 0.22;

        let r, g, b, alpha;
        if (isAmberHighlight) {
          // Warm Golden Amber Highlight (Controlled opacity)
          r = 160 + Math.floor(bright * 30);
          g = 90 + Math.floor(bright * 25);
          b = 20 + Math.floor(bright * 15);
          alpha = 0.06 + bright * 0.12;
          ctx.lineWidth = 0.5 + sr(seed + 11) * 0.8;
        } else if (isDarkGrain) {
          // Deep Espresso Accent Line
          r = 20 + Math.floor(bright * 15);
          g = 7 + Math.floor(bright * 8);
          b = 1;
          alpha = 0.22 + (0.22 - bright) * 0.4;
          ctx.lineWidth = 0.7 + sr(seed + 11) * 1.3;
        } else {
          // Warm Midtone
          r = 85 + Math.floor(bright * 45);
          g = 38 + Math.floor(bright * 25);
          b = 8 + Math.floor(bright * 10);
          alpha = 0.04 + sr(seed + 12) * 0.16;
          ctx.lineWidth = 0.5 + sr(seed + 11) * 1.3;
        }

        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.stroke();
      }

      // 3. Subtle Modern Diagonal Plank Seams
      ctx.save();
      ctx.strokeStyle = 'rgba(140, 85, 30, 0.04)';
      ctx.lineWidth = 1;
      const plankGap = 260;
      for (let x = -H; x < W + H; x += plankGap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + H * 0.45, H);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Wood Knots
      addKnot(W * 0.80, H * 0.26, 52, 4);
      addKnot(W * 0.15, H * 0.75, 36, 3);

      // 5. Left Text Backdrop Dark Gradient Overlay (Ensures headline text readability)
      const textBackdrop = ctx.createLinearGradient(0, 0, W * 0.65, 0);
      textBackdrop.addColorStop(0, 'rgba(8, 3, 1, 0.60)');
      textBackdrop.addColorStop(0.5, 'rgba(8, 3, 1, 0.35)');
      textBackdrop.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = textBackdrop;
      ctx.fillRect(0, 0, W, H);

      // 6. Polished Sheen (Shifted slightly right to keep text crisp)
      const sheen = ctx.createLinearGradient(W * 0.3, 0, W * 0.9, H);
      sheen.addColorStop(0, 'rgba(210, 145, 55, 0.00)');
      sheen.addColorStop(0.5, 'rgba(210, 145, 55, 0.06)');
      sheen.addColorStop(1, 'rgba(210, 145, 55, 0.00)');
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, W, H);

      // 7. Vignette for Cinematic Framing
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, Math.max(W, H) * 0.72);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(6, 2, 0, 0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(renderWood);
    };

    renderWood();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default WoodCanvasBackground;
