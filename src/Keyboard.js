import { useRef, useState, useEffect } from "react";
import "./Keyboard.css";

const CHORDS = new Map([
  ["C", [0 % 12, 4 % 12, 7 % 12]],
  ["Cm", [0 % 12, 3 % 12, 7 % 12]],
  ["Cdim", [0 % 12, 3 % 12, 6 % 12]],
  ["D", [2 % 12, 6 % 12, 9 % 12]],
  ["Dm", [2 % 12, 5 % 12, 9 % 12]],
  ["Ddim", [2 % 12, 5 % 12, 8 % 12]],
  ["E", [4 % 12, 8 % 12, 11 % 12]],
  ["Em", [4 % 12, 7 % 12, 11 % 12]],
  ["Edim", [4 % 12, 7 % 12, 10 % 12]],
  ["F", [5 % 12, 9 % 12, 12 % 12]],
  ["Fm", [5 % 12, 8 % 12, 12 % 12]],
  ["Fdim", [5 % 12, 8 % 12, 11 % 12]],
  ["G", [7 % 12, 11 % 12, 14 % 12]],
  ["Gm", [7 % 12, 10 % 12, 14 % 12]],
  ["Gdim", [7 % 12, 10 % 12, 13 % 12]],
  ["A", [9 % 12, 13 % 12, 16 % 12]],
  ["Am", [9 % 12, 12 % 12, 16 % 12]],
  ["Adim", [9 % 12, 12 % 12, 15 % 12]],
  ["B", [11 % 12, 15 % 12, 18 % 12]],
  ["Bm", [11 % 12, 14 % 12, 18 % 12]],
  ["Bdim", [11 % 12, 14 % 12, 17 % 12]],
]);

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

const Keyboard = ({ chord = "" }) => {
  const canvasRef = useRef(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const w = Math.min(width, height) * 0.8;
    const h = w * 0.5;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const octave = 7;
    const kw = w / octave / 2;
    const sharps = [0, 1, 3, 4, 5];
    const white_n = [0, 2, 4, 5, 7, 9, 11];
    const black_n = [1, 3, -1, 6, 8, 10, -1];
    const pushed = CHORDS.get(chord);

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < octave * 2; ++i) {
      const n = i % octave;
      const active = pushed ? pushed.includes(white_n[n]) : false;
      ctx.fillStyle = active ? "#ff0" : "#fff";
      ctx.strokeStyle = "#000";
      ctx.fillRect(i * kw, 0, kw, h);
      ctx.strokeRect(i * kw, 0, kw, h);
    }
    for (let i = 0; i < octave * 2; ++i) {
      const n = i % octave;
      const active = pushed ? pushed.includes(black_n[n]) : false;
      if (sharps.includes(i % octave)) {
        ctx.fillStyle = active ? "#ff0" : "#000";
        ctx.strokeStyle = "#000";
        ctx.fillRect(i * kw + (kw * 2) / 3, 0, (kw * 2) / 3, (h * 3) / 5);
        ctx.strokeRect(i * kw + (kw * 2) / 3, 0, (kw * 2) / 3, (h * 3) / 5);
      }
    }
  });

  return <canvas ref={canvasRef} id="canvas"></canvas>;
};

export default Keyboard;
