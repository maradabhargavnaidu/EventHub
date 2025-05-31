import React, { useEffect, useRef } from "react";

interface DonutChartProps {
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const total = data.values.reduce((sum, value) => sum + value, 0);
    let startAngle = -0.5 * Math.PI; // Start at the top (12 o'clock position)

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw each segment
    data.values.forEach((value, index) => {
      const sliceAngle = (2 * Math.PI * value) / total;

      ctx.beginPath();
      ctx.moveTo(60, 60); // Center point
      ctx.arc(60, 60, 50, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = data.colors[index];
      ctx.fill();

      startAngle += sliceAngle;
    });

    // Draw inner circle to create donut hole
    ctx.beginPath();
    ctx.arc(60, 60, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "#252525";
    ctx.fill();

    // Draw percentage in the middle
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${data.values[0]}%`, 60, 60);
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={120}
      className="w-full h-full"
    />
  );
};
