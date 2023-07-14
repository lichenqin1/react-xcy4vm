import React from 'react';
import * as d3 from 'd3';

export default function HighlightRange({
  // Necessary property
  dValue = { active: false, degree: 180 },
  // Optional properties
  color = '#fd935759',
  offset = { x: 0, y: 0 },
}) {
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
  let lEyebrowMin = [0, lEyebrowX + 39.6, eyebrowY + 5];
  let lEyebrowMax = [60, lEyebrowX + 39.6, eyebrowY + 5];
  let rEyebrowMin = [0, rEyebrowX, eyebrowY + 5];
  let rEyebrowMax = [-60, rEyebrowX, eyebrowY + 5];
  let lEyebrowIn = 319 < dValue.degree && dValue.degree < 348;
  let rEyebrowIn = 15 < dValue.degree && dValue.degree < 44;

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
  let lEyeIn = 267 < dValue.degree && dValue.degree < 316;
  let rEyeIn = 42 < dValue.degree && dValue.degree < 91;

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
  let noseIn = 198 < dValue.degree && dValue.degree < 248;

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
  let lCheekIn = 248 < dValue.degree && dValue.degree < 267;
  let rCheekIn = 98 < dValue.degree && dValue.degree < 127;

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
  let mouthIn = 136 < dValue.degree && dValue.degree < 184.5;

  // Return HighlightRange
  return (
    <g className="highlight-range">
      {/* Left eyebrow */}
      <rect
        fill={dValue.active && lEyebrowIn ? color : 'none'}
        height={5}
        transform={`rotate(${lEyebrowMin})`}
        width={39.6}
        x={lEyebrowX}
        y={eyebrowY}
      />
      <rect
        fill={dValue.active && lEyebrowIn ? color : 'none'}
        height={5}
        transform={`rotate(${lEyebrowMax})`}
        width={39.6}
        x={lEyebrowX}
        y={eyebrowY}
      />
      {/* Right eyebrow */}
      <rect
        fill={dValue.active && rEyebrowIn ? color : 'none'}
        height={5}
        transform={`rotate(${rEyebrowMin})`}
        width={39.6}
        x={rEyebrowX}
        y={eyebrowY}
      />
      <rect
        fill={dValue.active && rEyebrowIn ? color : 'none'}
        height={5}
        transform={`rotate(${rEyebrowMax})`}
        width={39.6}
        x={rEyebrowX}
        y={eyebrowY}
      />
      {/* Left eye */}
      <path
        d={basis(lEyeMin) + basis(lEyeMax)}
        fill={dValue.active && lEyeIn ? color : 'none'}
      />
      {/* Right eye */}
      <path
        d={basis(rEyeMin) + basis(rEyeMax)}
        fill={dValue.active && rEyeIn ? color : 'none'}
      />
      {/* Nose */}
      <path
        d={cardinal(noseMin) + cardinal(noseMax)}
        fill={dValue.active && noseIn ? color : 'none'}
      />
      {/* Left cheek */}
      <path
        d={basis(lCheekMin) + basis(lCheekMax)}
        fill={dValue.active && lCheekIn ? color : 'none'}
      />
      {/* Right cheek */}
      <path
        d={basis(rCheekMin) + basis(rCheekMax)}
        fill={dValue.active && rCheekIn ? color : 'none'}
      />
      {/* Mouth */}
      <path
        d={cardinal(mouthMin) + cardinal(mouthMax)}
        fill={dValue.active && mouthIn ? color : 'none'}
      />
    </g>
  );
}
