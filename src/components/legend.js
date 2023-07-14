import React from 'react';

export default function Legend({
  // Necessary properties
  dValue = { active: false, degree: 180 },
  shortNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
  // Optional properties
  colors = ['#000000', '#fd9357'],
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

  // Return Legend
  return (
    <g className="legend">
      {/* Eyebrow */}
      <text
        fill={dValue.active && eyebrowIn ? colors[1] : colors[0]}
        x={offset.x + 174}
        y={offset.y + 30}
      >
        {shortNames[0]}
      </text>
      {/* Eye */}
      <text
        fill={dValue.active && eyeIn ? colors[1] : colors[0]}
        x={offset.x + 206}
        y={offset.y + 90}
      >
        {shortNames[1]}
      </text>
      {/* Nose */}
      <text
        fill={dValue.active && noseIn ? colors[1] : colors[0]}
        x={offset.x}
        y={offset.y + 226}
      >
        {shortNames[2]}
      </text>
      {/* Cheek */}
      <text
        fill={dValue.active && cheekIn ? colors[1] : colors[0]}
        x={offset.x + 200}
        y={offset.y + 180}
      >
        {shortNames[3]}
      </text>
      {/* Mouth */}
      <text
        fill={dValue.active && mouthIn ? colors[1] : colors[0]}
        x={offset.x + 146}
        y={offset.y + 226}
      >
        {shortNames[4]}
      </text>
    </g>
  );
}
