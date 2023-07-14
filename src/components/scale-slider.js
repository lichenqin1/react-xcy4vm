import React from 'react';

export default function ScaleSlider({
  callback = (value) => console.log(value),
  initialValue = 0,
  range = { min: -2, max: 2 },
  scales = {
    above: ['-2', '-1', '0', '1', '2'],
    below: ['-2', '-1', '0', '1', '2'],
  },
}) {
  // Hooks
  let [highlights, setHighlights] = React.useState(
    new Array(range.max - range.min + 1)
      .fill(0)
      .map((_, i) => i === initialValue - range.min)
  );
  let [value, setValue] = React.useState(initialValue);

  // Style parameters
  let selectedStyle = {
    backgroundColor: 'yellow',
    display: 'inline-block',
    textAlign: 'center',
    width: `calc(100% / ${range.max - range.min + 1})`,
  };
  let unselectedStyle = {
    display: 'inline-block',
    textAlign: 'center',
    width: `calc(100% / ${range.max - range.min + 1})`,
  };
  let sliderStyle = {
    width: `calc(100% - 100% / ${range.max - range.min + 1})`,
  };

  // Change function
  let change = (e) => {
    setHighlights(highlights.map((_, i) => i === e.target.value - range.min));
    setValue(e.target.value);
    callback(e.target.value);
  };

  // Build scales
  let scaleAbove = scales.above.map((scale, i) => (
    <div key={i} style={highlights[i] ? selectedStyle : unselectedStyle}>
      {scale}
    </div>
  ));
  let scaleBelow = scales.below.map((scale, i) => (
    <div key={i} style={highlights[i] ? selectedStyle : unselectedStyle}>
      {scale}
    </div>
  ));

  // Build slider
  let slider = (
    <input
      max={range.max}
      min={range.min}
      onChange={change}
      style={sliderStyle}
      type={'range'}
      value={value}
    />
  );

  // Return ScaleSlider
  return (
    <div>
      {scaleAbove}
      <center>{slider}</center>
      {scaleBelow}
    </div>
  );
}
