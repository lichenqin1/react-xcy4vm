import React from 'react';

import * as FaceConstants from '../constants/face-constants';

export default function Eyebrow({
  color = '#000000',
  offsetX = 0,
  offsetY = 0,
  opacity = 1,
  position = 'left',
}: {
  color?: string;
  offsetX?: number;
  offsetY?: number;
  opacity?: number;
  position?: 'left' | 'right';
}): React.JSX.Element {
  // // Constants
  const height = FaceConstants.EYEBROW_HEIGHT;
  const width = FaceConstants.EYEBROW_WIDTH;
  // const svgHeight = FaceConstants.SVG_HEIGHT;
  // const svgWidth = FaceConstants.SVG_WIDTH;

  // // a
  // const rotate = [0, eyebrowX + width, eyebrowY + height];

  // Return element
  return (
    <rect
      className="eyebrow"
      fill={color}
      fillOpacity={opacity}
      height={height}
      // transform={`rotate(${rotate.join(' ')})`}
      width={width}
      // x={eyebrowX}
      // y={eyebrowY}
    />
  );
}
