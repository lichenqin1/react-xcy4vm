import React from 'react';

export default function Dial({
  // Necessary properties
  callback = (dValue) => console.log(dValue),
  faceRef = null,
  // Optional properties
  dialRadius = 14,
  offset = { x: 0, y: 0 },
  zoom = 1,
}) {
  // Hook
  let [dValue, setDValue] = React.useState({
    active: false,
    degree: 180,
    distance: 110,
  });

  // Get coordinates
  let cx = offset.x + 100;
  let cy = offset.y + 120;
  let x1 = cx - dialRadius;
  let x2 = cx + dialRadius;
  let y = cy - dValue.distance;

  // Get triangles
  let triangles = [
    [cx - 4, y - 6, cx + 4, y - 6, cx, y - 11],
    [cx + 6, y - 4, cx + 6, y + 4, cx + 11, y],
    [cx - 4, y + 6, cx + 4, y + 6, cx, y + 11],
    [cx - 6, y - 4, cx - 6, y + 4, cx - 11, y],
  ];

  // Mouse functions
  let mouseDown = () => {
    setDValue((dValue) => ({ ...dValue, active: true }));
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };
  let mouseMove = (e) => {
    let dX = e.clientX - faceRef.current.getBoundingClientRect().x - cx * zoom;
    let dY = e.clientY - faceRef.current.getBoundingClientRect().y - cy * zoom;
    let newDegree = (Math.atan2(dX, -dY) * 180) / Math.PI;
    newDegree += newDegree < 0 ? 360 : 0;
    let newDistance = Math.sqrt(dX * dX + dY * dY) / zoom;
    if (newDistance < 90) {
      newDistance = 90;
    } else if (newDistance > 130) {
      newDistance = 130;
    }
    setDValue((dValue) => ({
      ...dValue,
      degree: newDegree,
      distance: newDistance,
    }));
  };
  let mouseUp = () => {
    setDValue((dValue) => ({ ...dValue, distance: 110 }));
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };

  // Callback effect
  React.useEffect(() => callback(dValue), [dValue]);

  // Return Dial
  return (
    <g className="dial" transform={`rotate(${[dValue.degree, cx, cy]})`}>
      <polygon className="body" points={[cx, cy, x1, y, x2, y]} />
      <g className="head" onMouseDown={mouseDown}>
        <circle cx={cx} cy={y} r={dialRadius} />
        <polygon points={triangles[0]} />
        <polygon points={triangles[1]} />
        <polygon points={triangles[2]} />
        <polygon points={triangles[3]} />
      </g>
    </g>
  );
}
