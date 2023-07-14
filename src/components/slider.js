import React from 'react';

export default function Slider({
  callback = (nValue) => console.log(nValue),
  initialValue = 0.5,
}) {
  // Hook
  let [nValue, setNValue] = React.useState(initialValue);

  // Change function
  let change = (e) => {
    setNValue(e.target.value / 100);
    callback(e.target.value / 100);
  };

  // Return Slider
  return (
    <div className="slider">
      <input onChange={change} type="range" value={nValue * 100} />
      <div>{nValue}</div>
    </div>
  );
}
