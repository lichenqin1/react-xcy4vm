import React from 'react';

import PressCircle from './press-circle';

export default function Star({
  // Necessary properties
  callback = (isCentroid) => console.log(isCentroid),
  datas = [
    { color: '#bc3fbc', nPoint: [0.5, 0.5, 0.5, 0.5, 0.5], opacity: 1 },
    { color: '#cd3131', nPoint: [0.1, 0.1, 0.1, 0.1, 0.1], opacity: 0.1 },
    { color: '#0dbc79', nPoint: [0.3, 0.3, 0.3, 0.3, 0.3], opacity: 0.3 },
    { color: '#e5e510', nPoint: [0.7, 0.7, 0.7, 0.7, 0.7], opacity: 0.7 },
    { color: '#2472c8', nPoint: [0.9, 0.9, 0.9, 0.9, 0.9], opacity: 0.9 },
  ],
  shortNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
  // Optional properties
  color = '#ffff00',
  fromCentroid = false,
  interval = 100,
  isPressable = true,
  opacity = 1,
  showLegend = true,
  strokeWidth = 2,
  zoom = 1,
}) {
  // Hook
  let [value, setValue] = React.useState(fromCentroid ? 10 : 0);

  // Get size
  let rawWidth = 200;
  let rawHeight = 240;
  let viewWidth = rawWidth;
  let viewHeight = rawHeight;
  let width = rawWidth * zoom;
  let height = rawHeight * zoom;
  if (showLegend) {
    viewWidth *= 1.5;
    width *= 1.5;
  }

  // Get center coordinates
  let cx = showLegend ? 150 : 100;
  let cy = 120;

  // Get coefficients
  let coef1 = !isPressable ? 1 : value / 10;
  let coef2 = !isPressable ? 1 : 1 - value / 10;

  // Arc function
  let arc = (cx, cy, degree, radius) => {
    let radian = (degree * Math.PI) / 180;
    let x1 = cx + Math.sin(radian) * radius;
    let y1 = cy - Math.cos(radian) * radius;
    let x2 = cx + Math.cos(Math.PI / 10 - radian) * radius;
    let y2 = cy - Math.sin(Math.PI / 10 - radian) * radius;
    let commands = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 0 1 ${x2} ${y2}`,
      `L ${cx} ${cy}`,
    ];
    return commands.join(' ');
  };

  // Build arcs
  let arcs = datas.map((data, i) => (
    <g className="arcs" key={i}>
      {data.nPoint.map((nValue, j) => (
        <path
          d={arc(cx, cy, j * 72, nValue * 98)}
          fill="none"
          key={j}
          stroke={data.color}
          strokeOpacity={data.opacity * (i === 0 ? coef1 : coef2)}
          strokeWidth={strokeWidth}
        />
      ))}
    </g>
  ));

  // Build legend
  let legend = showLegend ? (
    <g className="legend">
      {shortNames.map((shortName, i) => (
        <text
          x={cx + Math.sin(((i * 72 + 36) * Math.PI) / 180) * 115}
          y={cy - Math.cos(((i * 72 + 36) * Math.PI) / 180) * 115}
          key={i}
        >
          {shortName}
        </text>
      ))}
    </g>
  ) : null;

  // Build press circle
  let pressCircle = isPressable ? (
    <PressCircle
      callback={(value) => setValue(value)}
      color="transparent"
      interval={interval}
      offset={{ x: showLegend ? 50 : 0, y: 0 }}
      opacity={0}
      strokeWidth={0}
      valueRange={[fromCentroid ? 10 : 0, fromCentroid ? 0 : 10]}
    />
  ) : null;

  // Callback effect
  if (isPressable) {
    React.useEffect(() => callback(value === 10), [value === 10]);
  }

  // Return Star
  return (
    <svg
      className="star"
      height={height}
      viewBox={[0, 0, viewWidth, viewHeight]}
      width={width}
    >
      <circle
        cx={cx}
        cy={cy}
        fill="none"
        r={98}
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
      />
      {/* Static components */}
      {arcs}
      {legend}
      {/* Interactive components */}
      {pressCircle}
    </svg>
  );
}
