import React from 'react';

export default function NumericValue({
  // Necessary properties
  dValue = { active: false, degree: 180, distance: 98 },
  range = {
    min: [10, 20, 30, 40, 50],
    mean: [60, 70, 80, 90, 100],
    max: [110, 120, 130, 140, 150],
  },
  // Optional properties
  color = '#ff0000',
  offset = { x: 0, y: 0 },
  numFmt = (num) => `${num}`,
}) {
  // Get eyebrow
  let lEyebrowIn = 319 < dValue.degree && dValue.degree < 348;
  let rEyebrowIn = 15 < dValue.degree && dValue.degree < 44;
  let eyebrowIn = lEyebrowIn || rEyebrowIn;

  // Get eye
  let lEyeIn = 267 < dValue.degree && dValue.degree < 316;
  let rEyeIn = 42 < dValue.degree && dValue.degree < 91;
  let eyeIn = lEyeIn || rEyeIn;

  // Get nose
  let noseIn = 198 < dValue.degree && dValue.degree < 248;

  // Get cheek
  let lCheekIn = 248 < dValue.degree && dValue.degree < 267;
  let rCheekIn = 98 < dValue.degree && dValue.degree < 127;
  let cheekIn = lCheekIn || rCheekIn;

  // Get mouth
  let mouthIn = 136 < dValue.degree && dValue.degree < 184.5;

  // Get index
  let index = -1;
  if (dValue.active && eyebrowIn) {
    index = 0;
  } else if (dValue.active && eyeIn) {
    index = 1;
  } else if (dValue.active && noseIn) {
    index = 2;
  } else if (dValue.active && cheekIn) {
    index = 3;
  } else if (dValue.active && mouthIn) {
    index = 4;
  }

  // Get position
  let x = offset.x;
  let y = offset.y;
  if (lEyebrowIn) {
    y += 25;
  } else if (rEyebrowIn) {
    x += 165;
    y += 35;
  } else if (lEyeIn) {
    x -= 15;
    y += 80;
  } else if (rEyeIn) {
    x += 170;
    y += 80;
  } else if (noseIn) {
    x += 40;
    y += 160;
  } else if (lCheekIn) {
    x -= 10;
    y += 160;
  } else if (rCheekIn) {
    x += 185;
    y += 120;
  } else if (mouthIn) {
    x += 150;
    y += 165;
  }

  // Build value
  let minValue = index < 0 ? 0 : range.min[index];
  let meanValue = index < 0 ? 0 : range.mean[index];
  let maxValue = index < 0 ? 0 : range.max[index];

  // Build text
  let minText = `MIN: ${numFmt(minValue)}`;
  let meanText = `MEAN: ${numFmt(meanValue)}`;
  let maxText = `MAX: ${numFmt(maxValue)}`;

  // Return NumericValue
  return index === -1 ? null : (
    <g className="numeric-value">
      <rect x={x} y={y} fill="#80808020" width="70" height="40" />
      <text fill="#fd9357" x={x} y={y + 5}>
        {minText}
      </text>
      <text fill="black" x={x} y={y + 15}>
        {meanText}
      </text>
      <text fill="#fd9357" x={x} y={y + 25}>
        {maxText}
      </text>
    </g>
  );
}
