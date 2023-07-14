import React from 'react';

export default function AttributesSelection({
  attributes = [
    { shortName: 'Eyebrow', description: 'Description of eyebrow' },
    { shortName: 'Eye', description: 'Description of eye' },
    { shortName: 'Nose', description: 'Description of nose' },
    { shortName: 'Cheek', description: 'Description of cheek' },
    { shortName: 'Mouth', description: 'Description of mouth' },
  ],
  callback = (selectedIndex) => console.log(selectedIndex),
  initialState = null,
}) {
  // Hook
  let [selectedIndex, setSelectedIndex] = React.useState(
    initialState === null ? -1 : initialState
  );

  // Click function
  let click = (index) => () => {
    setSelectedIndex(index);
    callback(index);
  };

  // Build rows
  let rows = attributes.map((attribute, i) =>
    attribute.shortName !== null && attribute.description !== null ? (
      <div
        className={i === selectedIndex ? 'selected' : 'unselected'}
        key={i}
        onClick={click(i)}
      >
        <div className="short-name">{attribute.shortName}</div>
        <div className="description">{attribute.description}</div>
      </div>
    ) : null
  );

  // Return AttributesSelection
  return <div className="attributes-selection">{rows}</div>;
}
