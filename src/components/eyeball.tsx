import React from 'react';

import * as FaceConstants from '../constants/face-constants';

export default function Eyeball({
  offsetX = 0,
  offsetY = 0,
  position = 'left',
}: {
  offsetX?: number;
  offsetY?: number;
  position?: 'left' | 'right';
}): React.JSX.Element {
  // Constants
  const eyeDistance = FaceConstants.EYE_DISTANCE;
  const eyeOffsetX = FaceConstants.EYE_OFFSET_X;
  const eyeOffsetY = FaceConstants.EYE_OFFSET_Y;
  const radius = FaceConstants.EYEBALL_RADIUS;
  const svgHeight = FaceConstants.SVG_HEIGHT;
  const svgWidth = FaceConstants.SVG_WIDTH;

  // Calculate coordinates
  const offset = eyeDistance * (position == 'left' ? -0.5 : 0.5);
  const cx = svgWidth / 2 + eyeOffsetX + offsetX + offset;
  const cy = svgHeight / 2 + eyeOffsetY + offsetY;

  // Return element
  return <circle className="eyeball" cx={cx} cy={cy} r={radius} />;
}
