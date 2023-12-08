import React from 'react';

import PressCircle from './press-circle';

export default function Plot({
  // Necessary properties
  callback = (isCentroid) => console.log(isCentroid),
  datas = [
    { color: '#bc3fbc', nPoint: [0.5, 0.5, 0.5, 0.5, 0.5], opacity: 1 },
    { color: '#cd3131', nPoint: [0.1, 0.1, 0.1, 0.1, 0.1], opacity: 0.1 },
    { color: '#0dbc79', nPoint: [0.3, 0.3, 0.3, 0.3, 0.3], opacity: 0.3 },
    { color: '#e5e510', nPoint: [0.7, 0.7, 0.7, 0.7, 0.7], opacity: 0.7 },
    { color: '#2472c8', nPoint: [0.9, 0.9, 0.9, 0.9, 0.9], opacity: 0.9 },
  ],
  range = { min: [10, 20, 30, 40, 50], max: [110, 120, 130, 140, 150] },
  shortNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
  // Optional properties
  color = '#000000',
  fromCentroid = false,
  interval = 100,
  isClickable = true,
  scaleHeight = 5,
  split = 5,
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
  let coef1 = !isClickable ? 1 : value / 10;
  let coef2 = !isClickable ? 1 : 1 - value / 10;

  // Path functions
  let axis = (x, y1, y2) => {
    let commands = [
      `M ${x - scaleHeight} ${y1}`,
      `L ${x} ${y1}`,
      `L ${x} ${y2}`,
      `L ${x - scaleHeight} ${y2}`,
    ];
    for (let i = 1; i < split; i++) {
      let y = y1 + ((y2 - y1) / split) * i;
      commands.push(`M ${x - scaleHeight} ${y}`);
      commands.push(`L ${x} ${y}`);
    }
    return commands.join(' ');
  };
  let line = (nPoint) => {
    let xys = nPoint.map((nValue, i) => [i * 50 + 30, 170 - nValue * 150]);
    let commands = [
      `M ${xys[0][0]} ${xys[0][1]}`,
      `L ${xys[1][0]} ${xys[1][1]}`,
      `L ${xys[2][0]} ${xys[2][1]}`,
      `L ${xys[3][0]} ${xys[3][1]}`,
      `L ${xys[4][0]} ${xys[4][1]}`,
    ];
    return commands.join(' ');
  };

  // Build axes
  let axes = shortNames.map((_, i) => (
    <path
      d={axis(i * 50 + 30, 20, 170)}
      fill="none"
      key={i}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  ));

  // Build headers
  let headers = shortNames.map((shortName, i) => (
    <text key={i} x={i * 50 + 30} y={10}>
      {shortName}
    </text>
  ));

  // Build scales
  let scales = shortNames.map((_, i) => (
    <g className="scale" key={i}>
      {new Array(split + 1).fill(0).map((_, j) => {
        if (Number.isFinite(range.max[i]) && Number.isFinite(range.min[i])) {
          let x = i * 50 + 30 - scaleHeight;
          let y = 170 - (150 / split) * j;
          let value =
            range.min[i] + ((range.max[i] - range.min[i]) / split) * j;
          return (
            <text key={j} x={x} y={y}>
              {Math.round(value * 10) / 10}
            </text>
          );
        }
        return null;
      })}
    </g>
  ));

  // Build lines
  let lines = datas.map((data, i) => (
    <path
      d={line(data.nPoint)}
      fill="none"
      key={i}
      stroke={data.color}
      strokeOpacity={data.opacity * (i === 0 ? coef1 : coef2)}
      strokeWidth={strokeWidth}
    />
  ));

  // Callback effect
  React.useEffect(() => {
    if (isClickable) {
      callback(value === 10);
    }
  }, [isClickable, value === 10]);

  // Build press circle
  let pressCircle = isClickable ? (
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

  // Return Plot
  return (
    <svg
      className="plot"
      height={height}
      style={{ cursor: isClickable ? 'pointer' : 'inherit' }}
      viewBox={[0, 0, rawWidth, rawHeight]}
      width={width}
    >
      {axes}
      {headers}
      {lines}
      {scales}
      {pressCircle}
    </svg>
  );
}
