import React from 'react';

import * as FaceConstants from '../constants/face-constants';

import Dial from './dial';
import Eyeball from './eyeball';
import Head from './head';

export default function Face({
  dps = [
    ['#cd3131', 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 1],
    ['#0dbc79', 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 1],
    ['#e5e510', 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1],
    ['#2472c8', 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 1],
    ['#bc3fbc', 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 1],
  ],
  gap = 3,
  turnOnDial = true,
  turnOnHighlightRange = false,
  turnOnLegends = false,
  turnOnNumericValue = false,
  turnOnPressableArea = false,
  turnOnProgressRing = false,
  turnOnSizeArcs = false,
  turnOnStartFromCluster = false,
  zoom = 1,
}: {
  dps?: [string, number, number, number, number, number, number, number][];
  gap?: number;
  turnOnDial?: boolean;
  turnOnHighlightRange?: boolean;
  turnOnLegends?: boolean;
  turnOnNumericValue?: boolean;
  turnOnPressableArea?: boolean;
  turnOnProgressRing?: boolean;
  turnOnSizeArcs?: boolean;
  turnOnStartFromCluster?: boolean;
  zoom?: number;
}): React.JSX.Element {
  // Constants
  const svgExtraWidth = FaceConstants.SVG_EXTRA_WIDTH;
  const svgHeight = FaceConstants.SVG_HEIGHT;
  const svgWidth = FaceConstants.SVG_WIDTH;

  // States
  const svgRef = React.useRef<SVGSVGElement>(null);

  // Calculate flag
  const flag = [
    turnOnDial,
    turnOnHighlightRange,
    turnOnLegends,
    turnOnNumericValue,
    turnOnPressableArea,
    turnOnProgressRing,
    turnOnSizeArcs,
    turnOnStartFromCluster,
  ].reduce((ans, on) => ans * 2 + (on ? 1 : 0), 0);

  // Calculate offset
  const offsetX = flag & 0b10110100 ? Math.abs(svgHeight - svgWidth) / 2 : 0;
  const offsetY = flag & 0b10 ? (dps.length - 1) * gap : 0;

  // Calculate view
  const viewHeight = svgHeight + offsetY;
  const viewWidth = svgWidth + (flag & 0b110000 ? svgExtraWidth : offsetX * 2);
  const viewBox = [0, 0, viewWidth, viewHeight];

  // Build dial
  const dial = turnOnDial ? (
    <Dial offsetX={offsetX} offsetY={offsetY} svgRef={svgRef} zoom={zoom} />
  ) : null;

  // Return element
  return (
    <svg
      className="face"
      height={viewHeight * zoom}
      ref={svgRef}
      viewBox={viewBox.join(' ')}
      width={viewWidth * zoom}
    >
      <Eyeball offsetX={offsetX} offsetY={offsetY} position="left" />
      <Eyeball offsetX={offsetX} offsetY={offsetY} position="right" />
      <Head
        color={dps[dps.length - 1][0]}
        offsetX={offsetX}
        offsetY={offsetY}
        opacity={dps[dps.length - 1][7]}
      />
      {dial}
    </svg>
  );
}
