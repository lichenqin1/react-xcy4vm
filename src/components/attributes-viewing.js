import React from 'react';

export default function AttributesViewing({
  // Necessary property
  attributes = [
    { shortName: 'Alpha', description: 'Description of alpha' },
    { shortName: 'Beta', description: 'Description of beta' },
    { shortName: 'Gamma', description: 'Description of gamma' },
    { shortName: 'Delta', description: 'Description of delta' },
    { shortName: 'Epsilon', description: 'Description of epsilon' },
  ],
}) {
  // Build rows
  let rows = attributes.map((attribute, i) => (
    <div className="row" key={i}>
      <div className="short-name">{attribute.shortName}</div>
      <div className="description">{attribute.description}</div>
    </div>
  ));

  // Return AttributesViewing
  return <div className="attributes-viewing">{rows}</div>;
}
