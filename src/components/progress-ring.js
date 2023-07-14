import React from 'react';

export default function ProgressRing({
  // Necessary property
  dValue = { active: false, degree: 180 },
  // Optional properties
  colors = ['#8080804d', '#fd935759'],
  offset = { x: 0, y: 0 },
  radius = 110,
  thickness = 10,
}) {
  // Get center coordinates
  let cx = offset.x + 100;
  let cy = offset.y + 120;

  // Get degree
  let degree = dValue.active ? dValue.degree : 0;

  // Arc function
  let arc = (cx, cy, degree1, degree2, radius) => {
    let radian1 = (degree1 * Math.PI) / 180;
    let radian2 = (degree2 * Math.PI) / 180;
    let radianM = (radian1 + radian2) / 2;
    let x1 = cx + Math.sin(radian1) * radius;
    let y1 = cy - Math.cos(radian1) * radius;
    let x2 = cx + Math.sin(radian2) * radius;
    let y2 = cy - Math.cos(radian2) * radius;
    let xM = cx + Math.sin(radianM) * radius;
    let yM = cy - Math.cos(radianM) * radius;
    let commands = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 0 1 ${xM} ${yM}`,
      `A ${radius} ${radius} 0 0 1 ${x2} ${y2}`,
    ];
    return commands.join(' ');
  };

  // Return ProgressRing
  return (
    <g className="progress-ring">
      <path
        d={arc(cx, cy, degree, 360, radius)}
        fill="none"
        stroke={colors[0]}
        strokeWidth={thickness}
      />
      <path
        d={arc(cx, cy, 0, degree, radius)}
        fill="none"
        stroke={colors[1]}
        strokeWidth={thickness}
      />
    </g>
  );
}
