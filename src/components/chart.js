import React from 'react';

import PressCircle from './press-circle';

export default function Chart({
  // Necessary properties
  callback = (isCentroid) => console.log(isCentroid),
  datas = [
    { color: '#bc3fbc', nPoint: [0.1, 0.5, 0.3, 0.8, 1.0], opacity: 0.5 },
    { color: '#cd3131', nPoint: [0.1, 0.6, 0.7, 0.4, 0.7], opacity: 0.5 },
    { color: '#0dbc79', nPoint: [0.2, 0.2, 0.1, 0.6, 0.2], opacity: 0.5 },
    { color: '#e5e510', nPoint: [0.9, 0.8, 0.2, 0.5, 0.3], opacity: 0.5 },
    { color: '#2472c8', nPoint: [0.3, 0.6, 0.4, 0.1, 0.8], opacity: 0.5 },
  ],
  shortNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
  // Optional properties
  barInterval = 5,
  color = '#000000',
  fromCentroid = false,
  interval = 100,
  isPressable = true,
  lineColor = '#80808030',
  lineNumber = 10,
  strokeWidth = 1,
  zoom = 1,
}) {
  // Hook
  let [value, setValue] = React.useState(fromCentroid ? 10 : 0);

  // Get size
  let rawWidth = 260;
  let rawHeight = 180;
  let width = rawWidth * zoom;
  let height = rawHeight * zoom;

  // Get coefficients
  let coef1 = !isPressable ? 1 : value / 10;
  let coef2 = !isPressable ? 1 : 1 - value / 10;

  // Build axes
  const axesT = 10;
  const axesB = 20;
  const axesL = 10;
  const axesR = 10;
  const axesCommands = [
    `M ${axesL} ${axesT}`,
    `V ${rawHeight - axesB}`,
    `H ${rawWidth - axesR}`,
  ];
  const axes = (
    <path
      d={axesCommands.join(' ')}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    />
  );

  // Build arrows
  const arrowH = 5;
  const arrowW = 5;
  const arrowCommands = [
    `M ${axesL} ${axesT}`,
    `L ${axesL - arrowW / 2} ${axesT + arrowH}`,
    `H ${axesL + arrowW / 2}`,
    `Z`,
    `M ${rawWidth - axesR} ${rawHeight - axesB}`,
    `L ${rawWidth - axesR - arrowH} ${rawHeight - axesB - arrowW / 2}`,
    `V ${rawHeight - axesB + arrowW / 2}`,
    `Z`,
  ];
  const arrows = (
    <path
      d={arrowCommands.join(' ')}
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  );

  // Build bars
  const dimension = shortNames.length;
  const barT = 10;
  const barL = 10;
  const barR = 10;
  const barTotalHeight = rawHeight - axesT - axesB - barT;
  const barTotalWidth = rawWidth - axesL - axesR - barL - barR;
  const barWidth = (barTotalWidth - barInterval * dimension - 1) / dimension;
  const barGroups = datas.map((data, i) => (
    <g key={i}>
      {data.nPoint.map((nValue, j) => (
        <rect
          fill={data.color}
          height={barTotalHeight * nValue}
          key={j}
          stroke={color}
          opacity={data.opacity * (i === 0 ? coef1 : coef2)}
          strokeWidth={strokeWidth}
          width={barWidth}
          x={axesL + barL + j * (barWidth + barInterval)}
          y={rawHeight - axesB - barTotalHeight * nValue}
        />
      ))}
    </g>
  ));

  // Build lines
  const lineInterval = barTotalHeight / lineNumber;
  let lines = [];
  for (let i = 0; i < lineNumber; i++) {
    lines.push(
      <path
        d={`M ${axesL} ${axesB + i * lineInterval} H ${rawWidth - axesR}`}
        fill="none"
        key={i}
        stroke={lineColor}
        strokeWidth={strokeWidth}
      />
    );
  }

  // Build headers
  const headersB = 10;
  const headers = shortNames.map((shortName, i) => (
    <text
      key={i}
      x={axesL + barL + i * (barWidth + barInterval) + barWidth / 2}
      y={rawHeight - headersB}
    >
      {shortName}
    </text>
  ));

  // Callback effect
  React.useEffect(() => {
    if (isPressable) {
      callback(value === 10);
    }
  }, [isPressable, value === 10]);

  // Build press circle
  let pressCircle = isPressable ? (
    <PressCircle
      callback={(value) => setValue(value)}
      color="transparent"
      interval={interval}
      offset={{ x: 30, y: -30 }}
      opacity={0}
      radius={200}
      strokeWidth={0}
      valueRange={[fromCentroid ? 10 : 0, fromCentroid ? 0 : 10]}
    />
  ) : null;

  // Return Chart
  return (
    <svg
      className="chart"
      height={height}
      style={{ cursor: isPressable ? 'pointer' : 'inherit' }}
      viewBox={[0, 0, rawWidth, rawHeight]}
      width={width}
    >
      {lines}
      {axes}
      {arrows}
      {barGroups}
      {headers}
      {pressCircle}
    </svg>
  );
}
