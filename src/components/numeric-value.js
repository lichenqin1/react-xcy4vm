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

  // Build key
  let key = 'MEAN';
  if (dValue.distance < 91) {
    key = 'MIN';
  } else if (dValue.distance > 105) {
    key = 'MAX';
  }

  // Build value
  let value = index < 0 ? 0 : range.mean[index];
  if (index >= 0 && dValue.distance < 91) {
    value = range.min[index];
  } else if (index >= 0 && dValue.distance > 105) {
    value = range.max[index];
  }

  // Build text
  let text = index >= 0 ? `${key}: ${value}` : null;

  // Return NumericValue
  return (
    <text
      className="numeric-value"
      fill={color}
      x={offset.x + 210}
      y={offset.y + 150}
    >
      {text}
    </text>
  );
}
