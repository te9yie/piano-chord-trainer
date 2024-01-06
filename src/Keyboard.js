import { useRef, useEffect } from "react";

const Keyboard = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = canvas.width;
    const h = canvas.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const octave = 7;
    const kw = w / octave / 2;
    const sharps = [0, 1, 3, 4, 5];

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < octave * 2; ++i) {
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#000";
      ctx.fillRect(i * kw, 0, kw - 2, h);
    }
    for (let i = 0; i < octave * 2; ++i) {
      if (sharps.includes(i % octave)) {
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#000";
        ctx.fillRect(i * kw + (kw * 2) / 3, 0, (kw * 2) / 3 - 2, (h * 3) / 5);
      }
    }
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Keyboard;
