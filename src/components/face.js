import React from 'react';

import Dial from './dial';
import Expression from './expression';
import HighlightRange from './highlight-range';
import Legend from './legend';
import NumericValue from './numeric-value';
import PressCircle from './press-circle';
import ProgressRing from './progress-ring';
import SizeCircle from './size-circle';

export default function Face({
  // Necessary properties
  callback = (isCentroid) => console.log(isCentroid),
  datas = [
    {
      color: '#bc3fbc',
      nPoint: [0.5, 0.5, 0.5, 0.5, 0.5],
      opacities: [1, 0],
    },
    {
      color: '#cd3131',
      nPoint: [0.1, 0.1, 0.1, 0.1, 0.1],
      opacities: [0.1, 0.1],
    },
    {
      color: '#0dbc79',
      nPoint: [0.3, 0.3, 0.3, 0.3, 0.3],
      opacities: [0.3, 0.3],
    },
    {
      color: '#e5e510',
      nPoint: [0.7, 0.7, 0.7, 0.7, 0.7],
      opacities: [0.7, 0.7],
    },
    {
      color: '#2472c8',
      nPoint: [0.9, 0.9, 0.9, 0.9, 0.9],
      opacities: [0.9, 0.9],
    },
  ],
  range = {
    min: [10, 20, 30, 40, 50],
    mean: [60, 70, 80, 90, 100],
    max: [110, 120, 130, 140, 150],
  },
  shortNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
  // Optional properties
  color = 'auto',
  dialRadius = 7,
  fromCentroid = false,
  interval = 100,
  isPressable = true,
  opacity = 'auto',
  showDial = true,
  showHighlightRange = true,
  showLegend = true,
  showNumericValue = true,
  showProgressRing = true,
  showSizeCircle = true,
  strokeWidth = 2,
  zoom = 1,
}) {
  // Hooks
  let ref = React.useRef();
  let [dValue, setDValue] = React.useState({
    active: false,
    degree: 180,
    distance: 98,
  });
  let [refOffset, setRefOffset] = React.useState({ x: 8, y: 8 });
  let [value, setValue] = React.useState(fromCentroid ? 10 : 0);

  // Get size
  let rawWidth = 200;
  let rawHeight = 240;
  let viewWidth = rawWidth;
  let viewHeight = rawHeight;
  let width = rawWidth * zoom;
  let height = rawHeight * zoom;
  if (showLegend || showNumericValue) {
    viewWidth *= 1.5;
    width *= 1.5;
  } else if (showDial || showProgressRing) {
    viewWidth *= 1.2;
    width *= 1.2;
  }
  if (showSizeCircle) {
    viewHeight += (datas.length - 1) * 10;
    height += (datas.length - 1) * zoom * 10;
  }

  // Get offset
  let offset = {
    x: showDial || showProgressRing ? 20 : 0,
    y: showSizeCircle ? (datas.length - 1) * 10 : 0,
  };

  // Get head
  let headData = datas[datas.length - 1];
  let headColor = color === 'auto' ? headData.color : color;
  let headOpacity = opacity === 'auto' ? headData.opacities[1] : opacity;

  // Get coefficients
  let coef1 = !isPressable ? 1 : value / 10;
  let coef2 = !isPressable ? 1 : 1 - value / 10;

  // Mouse function
  let mouseEnter = () => {
    let rect = ref.current.getBoundingClientRect();
    setRefOffset({ x: rect.x, y: rect.y });
  };

  // Build highlight range
  let highlightRange = showHighlightRange ? (
    <HighlightRange color="#fd935759" dValue={dValue} offset={offset} />
  ) : null;

  // Build expressions
  let expressions = datas.map((data, i) => (
    <Expression
      color={data.color}
      key={i}
      nPoint={data.nPoint}
      offset={offset}
      opacity={data.opacities[0] * (i == 0 ? coef1 : coef2)}
      strokeWidth={strokeWidth}
    />
  ));

  // Build numeric value
  let numericValue = showNumericValue ? (
    <NumericValue
      color="#ff0000"
      dValue={dValue}
      offset={offset}
      range={range}
    />
  ) : null;

  // Build progress ring
  let progressRing = showProgressRing ? (
    <ProgressRing
      colors={['#8080804d', '#fd935759']}
      dValue={dValue}
      offset={offset}
      radius={110}
      thickness={10}
    />
  ) : null;

  // Build size circle
  let sizeCircle = showSizeCircle ? (
    <SizeCircle
      datas={datas.map((data) => ({
        color: data.color,
        opacity: data.opacities[1] * coef2,
      }))}
      offset={{ ...offset, y: 0 }}
      strokeWidth={strokeWidth}
    />
  ) : null;

  // Build legend
  let legend = showLegend ? (
    <Legend
      colors={['#000000', '#fd9357']}
      dValue={dValue}
      offset={offset}
      shortNames={shortNames}
    />
  ) : null;

  // Build press circle
  let pressCircle = isPressable ? (
    <PressCircle
      callback={(value) => setValue(value)}
      color={datas[0].color}
      interval={interval}
      offset={offset}
      opacity={datas[0].opacities[0] * coef1}
      strokeWidth={strokeWidth}
      valueRange={[fromCentroid ? 10 : 0, fromCentroid ? 0 : 10]}
    />
  ) : null;

  // Build dial
  let dial = showDial ? (
    <Dial
      callback={(dValue) => setDValue(dValue)}
      dialRadius={dialRadius}
      refOffset={refOffset}
      offset={offset}
      zoom={zoom}
    />
  ) : null;

  // Callback effect
  if (isPressable) {
    React.useEffect(() => callback(value === 10), [value === 10]);
  }

  // Return Face
  return (
    <svg
      className="face"
      height={height}
      onMouseEnter={showDial ? mouseEnter : () => {}}
      ref={ref}
      viewBox={[0, 0, viewWidth, viewHeight]}
      width={width}
    >
      {/* Head */}
      <circle
        cx={offset.x + 100}
        cy={offset.y + 120}
        fill="none"
        r={98}
        stroke={headColor}
        strokeOpacity={headOpacity * coef2}
        strokeWidth={strokeWidth}
      />
      {/* Eyeballs */}
      <circle cx={offset.x + 52} cy={offset.y + 100} r={3} />
      <circle cx={offset.x + 144} cy={offset.y + 100} r={3} />
      {/* Static components */}
      {highlightRange}
      {expressions}
      {numericValue}
      {progressRing}
      {sizeCircle}
      {legend}
      {/* Interactive components */}
      {pressCircle}
      {dial}
    </svg>
  );
}
