import React from 'react';

export default function Dial({
  // Necessary properties
  callback = (dValue) => console.log(dValue),
  refOffset = { x: 8, y: 8 },
  // Optional properties
  dialRadius = 7,
  offset = { x: 0, y: 0 },
  zoom = 1,
}) {
  // Hook
  let [dValue, setDValue] = React.useState({
    active: false,
    degree: 180,
    distance: 98,
  });

  // Get coordinates
  let cx = offset.x + 100;
  let cy = offset.y + 120;
  let x1 = cx - dialRadius;
  let x2 = cx + dialRadius;
  let y = cy - dValue.distance;

  // Mouse functions
  let mouseDown = () => {
    setDValue((dValue) => ({ ...dValue, active: true }));
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };
  let mouseMove = (e) => {
    let dX = e.clientX - refOffset.x - cx * zoom;
    let dY = e.clientY - refOffset.y - cy * zoom;
    let newDegree = (Math.atan2(dX, -dY) * 180) / Math.PI;
    newDegree += newDegree < 0 ? 360 : 0;
    let newDistance = Math.sqrt(dX * dX + dY * dY) / zoom;
    if (newDistance < 86) {
      newDistance = 86;
    } else if (newDistance > 110) {
      newDistance = 110;
    }
    setDValue((dValue) => ({
      ...dValue,
      degree: newDegree,
      distance: newDistance,
    }));
  };
  let mouseUp = () => {
    setDValue((dValue) => ({ ...dValue, distance: 98 }));
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };

  // Callback effect
  React.useEffect(() => callback(dValue), [dValue]);

  // Return Dial
  return (
    <g className="dial" transform={`rotate(${[dValue.degree, cx, cy]})`}>
      <polygon points={[cx, cy, x1, y, x2, y]} />
      <circle cx={cx} cy={y} r={dialRadius} onMouseDown={mouseDown} />
    </g>
  );
}
