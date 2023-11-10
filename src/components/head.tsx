import React from 'react';

import * as FaceConstants from '../constants/face-constants';

export default function Head({
  color = '#000000',
  offsetX = 0,
  offsetY = 0,
  opacity = 1,
}: {
  color?: string;
  offsetX?: number;
  offsetY?: number;
  opacity?: number;
}): React.JSX.Element {
  // Constants
  const faceRadius = FaceConstants.FACE_RADIUS;
  const faceStrokeWidth = FaceConstants.FACE_STROKE_WIDTH;
  const svgHeight = FaceConstants.SVG_HEIGHT;
  const svgWidth = FaceConstants.SVG_WIDTH;

  // Return element
  return (
    <circle
      className="head"
      cx={svgWidth / 2 + offsetX}
      cy={svgHeight / 2 + offsetY}
      fill="none"
      r={faceRadius - faceStrokeWidth / 2}
      stroke={color}
      strokeOpacity={opacity}
      strokeWidth={faceStrokeWidth}
    />
  );
}
