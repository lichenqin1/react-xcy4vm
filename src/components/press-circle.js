import React from 'react';

export default function PressCircle({
  // Necessary property
  callback = (value) => console.log(value),
  // Optional properties
  color = '#000000',
  interval = 100,
  offset = { x: 0, y: 0 },
  opacity = 1,
  strokeWidth = 2,
  valueRange = [0, 10],
}) {
  // Hooks
  let [isAdd, setIsAdd] = React.useState(valueRange[0] < valueRange[1]);
  let [timer, setTimer] = React.useState(null);
  let [value, setValue] = React.useState(valueRange[0]);

  // Get value range
  let minValue = Math.min(valueRange[0], valueRange[1]);
  let maxValue = Math.max(valueRange[0], valueRange[1]);

  // Change function
  let change = () => {
    if (isAdd) {
      setValue((value) => (value + 1 > maxValue ? value : value + 1));
    } else {
      setValue((value) => (value - 1 < minValue ? value : value - 1));
    }
  };

  // Press functions
  let pressStart = () => setTimer(setInterval(change, interval));
  let pressStop = () => {
    clearInterval(timer);
    setTimer(null);
    if ((isAdd && value === maxValue) || (!isAdd && value === minValue)) {
      setIsAdd(!isAdd);
    }
  };

  // Callback effect
  React.useEffect(() => callback(value), [value]);

  // Return PressCircle
  return (
    <circle
      className="press-circle"
      cx={offset.x + 100}
      cy={offset.y + 120}
      fill="transparent"
      onMouseDown={pressStart}
      onMouseOut={pressStop}
      onMouseUp={pressStop}
      r={98}
      stroke={color}
      strokeOpacity={opacity}
      strokeWidth={strokeWidth}
    />
  );
}
