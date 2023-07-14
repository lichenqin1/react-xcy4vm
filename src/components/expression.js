import React from 'react';
import * as d3 from 'd3';

export default function Expression({
  // Necessary properties
  color = '#bc3fbc',
  nPoint = [0.5, 0.5, 0.5, 0.5, 0.5],
  opacity = 1,
  // Optional properties
  offset = { x: 0, y: 0 },
  strokeWidth = 2,
}) {
  // Preprocess the normalized point
  nPoint = nPoint.map((nValue) => {
    if (!Number.isFinite(nValue)) {
      return 0.5;
    } else if (nValue < 0) {
      return 0;
    } else if (nValue > 1) {
      return 1;
    }
    return nValue;
  });

  // Preprocess the opacity
  if (!Number.isFinite(opacity)) {
    opacity = 1;
  } else if (opacity < 0) {
    opacity = 0;
  } else if (opacity > 1) {
    opacity = 1;
  }

  // Curve functions
  let basis = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(d3.curveBasisClosed);
  let cardinal = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(d3.curveCardinalClosed);

  // Get eyebrows
  let lEyebrowX = offset.x + 44;
  let rEyebrowX = offset.x + 120;
  let eyebrowY = offset.y + 60;
  let lEyebrowMin = 0;
  let lEyebrowMax = 60;
  let rEyebrowMin = 0;
  let rEyebrowMax = -60;
  let lEyebrowVar = [
    lEyebrowMin + (lEyebrowMax - lEyebrowMin) * nPoint[0],
    lEyebrowX + 39.6,
    eyebrowY + 5,
  ];
  let rEyebrowVar = [
    rEyebrowMin + (rEyebrowMax - rEyebrowMin) * nPoint[0],
    rEyebrowX,
    eyebrowY + 5,
  ];

  // Get eyes
  let lEyeX = offset.x + 52;
  let rEyeX = offset.x + 144;
  let eyeY = offset.y + 100;
  let lEyeMin = [
    { x: lEyeX, y: eyeY - 8 },
    { x: lEyeX + 8, y: eyeY },
    { x: lEyeX, y: eyeY + 8 },
    { x: lEyeX - 8, y: eyeY },
  ];
  let lEyeMax = [
    { x: lEyeX, y: eyeY - 30 },
    { x: lEyeX + 30, y: eyeY },
    { x: lEyeX, y: eyeY + 30 },
    { x: lEyeX - 30, y: eyeY },
  ];
  let rEyeMin = [
    { x: rEyeX, y: eyeY - 8 },
    { x: rEyeX + 8, y: eyeY },
    { x: rEyeX, y: eyeY + 8 },
    { x: rEyeX - 8, y: eyeY },
  ];
  let rEyeMax = [
    { x: rEyeX, y: eyeY - 30 },
    { x: rEyeX + 30, y: eyeY },
    { x: rEyeX, y: eyeY + 30 },
    { x: rEyeX - 30, y: eyeY },
  ];
  let lEyeVar = [
    {
      x: lEyeMin[0].x + (lEyeMax[0].x - lEyeMin[0].x) * nPoint[1],
      y: lEyeMin[0].y + (lEyeMax[0].y - lEyeMin[0].y) * nPoint[1],
    },
    {
      x: lEyeMin[1].x + (lEyeMax[1].x - lEyeMin[1].x) * nPoint[1],
      y: lEyeMin[1].y + (lEyeMax[1].y - lEyeMin[1].y) * nPoint[1],
    },
    {
      x: lEyeMin[2].x + (lEyeMax[2].x - lEyeMin[2].x) * nPoint[1],
      y: lEyeMin[2].y + (lEyeMax[2].y - lEyeMin[2].y) * nPoint[1],
    },
    {
      x: lEyeMin[3].x + (lEyeMax[3].x - lEyeMin[3].x) * nPoint[1],
      y: lEyeMin[3].y + (lEyeMax[3].y - lEyeMin[3].y) * nPoint[1],
    },
  ];
  let rEyeVar = [
    {
      x: rEyeMin[0].x + (rEyeMax[0].x - rEyeMin[0].x) * nPoint[1],
      y: rEyeMin[0].y + (rEyeMax[0].y - rEyeMin[0].y) * nPoint[1],
    },
    {
      x: rEyeMin[1].x + (rEyeMax[1].x - rEyeMin[1].x) * nPoint[1],
      y: rEyeMin[1].y + (rEyeMax[1].y - rEyeMin[1].y) * nPoint[1],
    },
    {
      x: rEyeMin[2].x + (rEyeMax[2].x - rEyeMin[2].x) * nPoint[1],
      y: rEyeMin[2].y + (rEyeMax[2].y - rEyeMin[2].y) * nPoint[1],
    },
    {
      x: rEyeMin[3].x + (rEyeMax[3].x - rEyeMin[3].x) * nPoint[1],
      y: rEyeMin[3].y + (rEyeMax[3].y - rEyeMin[3].y) * nPoint[1],
    },
  ];

  // Get nose
  let noseX = offset.x + 100;
  let noseY = offset.y + 120;
  let noseMin = [
    { x: noseX - 10, y: noseY + 11.4 },
    { x: noseX - 10, y: noseY + 28.6 },
    { x: noseX - 18, y: noseY + 28.6 },
    { x: noseX - 18, y: noseY + 11.4 },
  ];
  let noseMax = [
    { x: noseX - 10, y: noseY + 11.4 },
    { x: noseX - 10, y: noseY + 28.6 },
    { x: noseX - 48, y: noseY + 28.6 },
    { x: noseX - 48, y: noseY + 11.4 },
  ];
  let noseVar = [
    {
      x: noseMin[0].x + (noseMax[0].x - noseMin[0].x) * nPoint[2],
      y: noseMin[0].y + (noseMax[0].y - noseMin[0].y) * nPoint[2],
    },
    {
      x: noseMin[1].x + (noseMax[1].x - noseMin[1].x) * nPoint[2],
      y: noseMin[1].y + (noseMax[1].y - noseMin[1].y) * nPoint[2],
    },
    {
      x: noseMin[2].x + (noseMax[2].x - noseMin[2].x) * nPoint[2],
      y: noseMin[2].y + (noseMax[2].y - noseMin[2].y) * nPoint[2],
    },
    {
      x: noseMin[3].x + (noseMax[3].x - noseMin[3].x) * nPoint[2],
      y: noseMin[3].y + (noseMax[3].y - noseMin[3].y) * nPoint[2],
    },
  ];

  // Get cheeks
  let lCheekX = offset.x + 24;
  let rCheekX = offset.x + 160;
  let cheekY = offset.y + 140;
  let lCheekMin = [
    { x: lCheekX, y: cheekY - 4 },
    { x: lCheekX + 4, y: cheekY },
    { x: lCheekX, y: cheekY + 4 },
    { x: lCheekX - 4, y: cheekY },
  ];
  let lCheekMax = [
    { x: lCheekX, y: cheekY - 26 },
    { x: lCheekX + 26, y: cheekY },
    { x: lCheekX, y: cheekY + 26 },
    { x: lCheekX - 26, y: cheekY },
  ];
  let rCheekMin = [
    { x: rCheekX, y: cheekY - 4 },
    { x: rCheekX + 4, y: cheekY },
    { x: rCheekX, y: cheekY + 4 },
    { x: rCheekX - 4, y: cheekY },
  ];
  let rCheekMax = [
    { x: rCheekX, y: cheekY - 26 },
    { x: rCheekX + 26, y: cheekY },
    { x: rCheekX, y: cheekY + 26 },
    { x: rCheekX - 26, y: cheekY },
  ];
  let lCheekVar = [
    {
      x: lCheekMin[0].x + (lCheekMax[0].x - lCheekMin[0].x) * nPoint[3],
      y: lCheekMin[0].y + (lCheekMax[0].y - lCheekMin[0].y) * nPoint[3],
    },
    {
      x: lCheekMin[1].x + (lCheekMax[1].x - lCheekMin[1].x) * nPoint[3],
      y: lCheekMin[1].y + (lCheekMax[1].y - lCheekMin[1].y) * nPoint[3],
    },
    {
      x: lCheekMin[2].x + (lCheekMax[2].x - lCheekMin[2].x) * nPoint[3],
      y: lCheekMin[2].y + (lCheekMax[2].y - lCheekMin[2].y) * nPoint[3],
    },
    {
      x: lCheekMin[3].x + (lCheekMax[3].x - lCheekMin[3].x) * nPoint[3],
      y: lCheekMin[3].y + (lCheekMax[3].y - lCheekMin[3].y) * nPoint[3],
    },
  ];
  let rCheekVar = [
    {
      x: rCheekMin[0].x + (rCheekMax[0].x - rCheekMin[0].x) * nPoint[3],
      y: rCheekMin[0].y + (rCheekMax[0].y - rCheekMin[0].y) * nPoint[3],
    },
    {
      x: rCheekMin[1].x + (rCheekMax[1].x - rCheekMin[1].x) * nPoint[3],
      y: rCheekMin[1].y + (rCheekMax[1].y - rCheekMin[1].y) * nPoint[3],
    },
    {
      x: rCheekMin[2].x + (rCheekMax[2].x - rCheekMin[2].x) * nPoint[3],
      y: rCheekMin[2].y + (rCheekMax[2].y - rCheekMin[2].y) * nPoint[3],
    },
    {
      x: rCheekMin[3].x + (rCheekMax[3].x - rCheekMin[3].x) * nPoint[3],
      y: rCheekMin[3].y + (rCheekMax[3].y - rCheekMin[3].y) * nPoint[3],
    },
  ];

  // Get mouth
  let mouthX = offset.x + 100;
  let mouthY = offset.y + 120;
  let mouthMin = [
    { x: mouthX + 40, y: mouthY + 44 },
    { x: mouthX + 20, y: mouthY + 55 },
    { x: mouthX, y: mouthY + 44 },
  ];
  let mouthMax = [
    { x: mouthX + 40, y: mouthY + 44 },
    { x: mouthX + 20, y: mouthY + 90 },
    { x: mouthX, y: mouthY + 44 },
  ];
  let mouthVar = [
    {
      x: mouthMin[0].x + (mouthMax[0].x - mouthMin[0].x) * nPoint[4],
      y: mouthMin[0].y + (mouthMax[0].y - mouthMin[0].y) * nPoint[4],
    },
    {
      x: mouthMin[1].x + (mouthMax[1].x - mouthMin[1].x) * nPoint[4],
      y: mouthMin[1].y + (mouthMax[1].y - mouthMin[1].y) * nPoint[4],
    },
    {
      x: mouthMin[2].x + (mouthMax[2].x - mouthMin[2].x) * nPoint[4],
      y: mouthMin[2].y + (mouthMax[2].y - mouthMin[2].y) * nPoint[4],
    },
  ];

  // Return Expression
  return (
    <g className="expression">
      {/* Eyebrows */}
      <rect
        fill={color}
        fillOpacity={opacity}
        height={5}
        transform={`rotate(${lEyebrowVar})`}
        width={39.6}
        x={lEyebrowX}
        y={eyebrowY}
      />
      <rect
        fill={color}
        fillOpacity={opacity}
        height={5}
        transform={`rotate(${rEyebrowVar})`}
        width={39.6}
        x={rEyebrowX}
        y={eyebrowY}
      />
      {/* Eyes */}
      <path
        d={basis(lEyeVar)}
        fill="none"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
      />
      <path
        d={basis(rEyeVar)}
        fill="none"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
      />
      {/* Nose */}
      <path
        d={cardinal(noseVar)}
        fill="none"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
      />
      {/* Cheeks */}
      <path
        d={basis(lCheekVar)}
        fill="none"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
      />
      <path
        d={basis(rCheekVar)}
        fill="none"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
      />
      {/* Mouth */}
      <path
        d={cardinal(mouthVar)}
        fill="none"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
      />
    </g>
  );
}
