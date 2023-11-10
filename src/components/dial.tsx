import React from 'react';

import * as FaceConstants from '../constants/face-constants';

export default function Dial({
  callback = (on, r, theta) => console.log(on, r, theta),
  offsetX = 0,
  offsetY = 0,
  svgRef = null,
  zoom = 1,
}: {
  callback?: (on: boolean, r: number, theta: number) => void;
  offsetX?: number;
  offsetY?: number;
  svgRef?: React.MutableRefObject<SVGSVGElement>;
  zoom?: number;
}): React.JSX.Element {
  // Constants
  const initialTheta = FaceConstants.DIAL_INITIAL_THETA;
  const r1 = FaceConstants.DIAL_R1;
  const r3 = FaceConstants.DIAL_R3;
  const r5 = FaceConstants.DIAL_R5;
  const radius = FaceConstants.DIAL_RADIUS;
  const svgHeight = FaceConstants.SVG_HEIGHT;
  const svgWidth = FaceConstants.SVG_WIDTH;
  const th = FaceConstants.DIAL_TH;
  const tr = FaceConstants.DIAL_TR;
  const tw = FaceConstants.DIAL_TW;

  // States
  const [on, setOn] = React.useState(false);
  const [r, setR] = React.useState(r3);
  const [theta, setTheta] = React.useState(initialTheta);

  // Calculate coordinates
  const cx = svgWidth / 2 + offsetX;
  const cy = svgHeight / 2 + offsetY;
  const x1 = cx - radius;
  const x2 = cx + radius;
  const y = cy - r;
  const body = [cx, cy, x1, y, x2, y];
  const rotate = [theta, cx, cy];
  const triangles = [
    [cx - tw / 2, y - tr, cx + tw / 2, y - tr, cx, y - tr - th],
    [cx + tr, y - tw / 2, cx + tr, y + tw / 2, cx + tr + th, y],
    [cx - tw / 2, y + tr, cx + tw / 2, y + tr, cx, y + tr + th],
    [cx - tr, y - tw / 2, cx - tr, y + tw / 2, cx - tr - th, y],
  ];

  // Mouse handler
  function handleMouseDown(): void {
    setOn(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
  function handleMouseMove(ev: MouseEvent): void {
    const rect = svgRef.current.getBoundingClientRect();
    const dX = ev.clientX - rect.x - cx * zoom;
    const dY = ev.clientY - rect.y - cy * zoom;
    const newR = Math.min(Math.max(Math.sqrt(dX * dX + dY * dY), r1), r5);
    const newTheta = (Math.atan2(-dX, dY) * 180) / Math.PI + 180;
    setR(newR);
    setTheta(newTheta);
  }
  function handleMouseUp(): void {
    setR(r3);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  // Callback effect
  React.useEffect(() => callback(on, r, theta), [callback, on, r, theta]);

  // Return element
  return (
    <g className="dial" transform={`rotate(${rotate.join(' ')})`}>
      <polygon className="body" points={body.join(' ')} />
      <g className="head" onMouseDown={handleMouseDown}>
        <circle cx={cx} cy={y} r={radius} />
        <polygon points={triangles[0].join(' ')} />
        <polygon points={triangles[1].join(' ')} />
        <polygon points={triangles[2].join(' ')} />
        <polygon points={triangles[3].join(' ')} />
      </g>
    </g>
  );
}
