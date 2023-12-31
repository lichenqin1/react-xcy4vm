import React from 'react';

export default function SizeCircle({
  // Necessary property
  datas = [
    { color: '#bc3fbc', opacity: 0 },
    { color: '#cd3131', opacity: 0.1 },
    { color: '#0dbc79', opacity: 0.3 },
    { color: '#e5e510', opacity: 0.7 },
    { color: '#2472c8', opacity: 0.9 },
  ],
  // Optional properties
  gap = 3,
  offset = { x: 0, y: 0 },
  strokeWidth = 2,
}) {
  // Get coordinates
  let x1 = offset.x + strokeWidth;
  let x2 = offset.x + 200 - strokeWidth;
  let y = offset.y + 120;

  // Build circles
  let circles = datas
    .slice(0, datas.length - 1)
    .map((data, i) => (
      <path
        d={`M ${x1} ${y + i * gap} A 49 49 0 0 1 ${x2} ${y + i * gap}`}
        fill="none"
        key={i}
        stroke={data.color}
        strokeOpacity={data.opacity}
        strokeWidth={strokeWidth}
      />
    ));

  // Return SizeCircle
  return <g className="size-circle">{circles}</g>;
}
