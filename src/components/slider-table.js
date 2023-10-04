import React from 'react';

import Face from './face';
import Plot from './plot';
import Star from './star';
import Slider from './slider';

export default function SliderTable({
  leftData = { color: '#000000', nPoint: [0.5, 0.5, 0.5, 0.5, 0.5] },
  longNames = [
    'Long name of alpha',
    'Long name of beta',
    'Long name of gamma',
    'Long name of delta',
    'Long name of epsilon',
  ],
  range = {
    min: [0, 0, 0, 0, 0],
    mean: [50, 50, 50, 50, 50],
    max: [100, 100, 100, 100, 100],
  },
  rightData = { color: '#0000ff', point: [10, 30, 50, 70, 90] },
  shortNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
  tableHeaders = ['Data Attribute', 'Value', 'Slider', 'Visual Feature'],
  zoom = 1,
}) {
  // Hook
  let [glyphType, setGlyphType] = React.useState('face');
  let [leftNPoint, setLeftNPoint] = React.useState(leftData.nPoint);

  // Get features
  let features = [
    'Feature 1',
    'Feature 2',
    'Feature 3',
    'Feature 4',
    'Feature 5',
  ];
  if (glyphType === 'face') {
    features = [
      'Eyebrow Slant',
      'Eye Size',
      'Nose Length',
      'Cheek Size',
      'Mouth Curve',
    ];
  }

  // Get right normalized point
  let rightNPoint = rightData.point.map(
    (value, i) => (value - range.min[i]) / (range.max[i] - range.min[i])
  );

  // Change function
  let change = (index) => (nValue) => {
    let newLeftNPoint = [...leftNPoint];
    newLeftNPoint[index] = nValue;
    setLeftNPoint(newLeftNPoint);
  };

  // Build table head
  let ths = tableHeaders.map((tableHeader, i) => (
    <th key={i}>{tableHeader}</th>
  ));
  let thead = <tr>{ths}</tr>;

  // Build table body
  let leftPoint = leftNPoint.map((nValue, i) =>
    (range.min[i] + (range.max[i] - range.min[i]) * nValue).toFixed(2)
  );
  let sliders = leftNPoint.map((_, i) => (
    <Slider callback={change(i)} key={i} initialValue={leftData.nPoint[i]} />
  ));
  let tbody = leftNPoint.map((_, i) => (
    <tr key={i}>
      <td>{longNames[i]}</td>
      <td>{leftPoint[i]}</td>
      <td>{sliders[i]}</td>
      <td>{features[i]}</td>
    </tr>
  ));

  // Build datas
  let leftDatas = [
    {
      color: leftData.color,
      nPoint: leftNPoint,
      opacities: [1, 1],
      opacity: 1,
    },
  ];
  let rightDatas = [
    {
      color: rightData.color,
      nPoint: rightNPoint,
      opacities: [1, 1],
      opacity: 1,
    },
  ];

  // Build glyph
  let glyph = null;
  if (glyphType === 'face') {
    glyph = (
      <div className="glyph">
        <Face
          callback={() => {}}
          color="auto"
          datas={leftDatas}
          dialRadius={14}
          fromCentroid={false}
          interval={100}
          isPressable={false}
          opacity="auto"
          range={range}
          shortNames={shortNames}
          showDial={true}
          showHighlightRange={true}
          showLegend={true}
          showNumericValue={true}
          showProgressRing={true}
          showSizeCircle={true}
          strokeWidth={2}
          zoom={zoom}
        />
        <Face
          callback={() => {}}
          color="auto"
          datas={rightDatas}
          dialRadius={14}
          fromCentroid={false}
          interval={100}
          isPressable={false}
          opacity="auto"
          range={range}
          shortNames={shortNames}
          showDial={true}
          showHighlightRange={true}
          showLegend={true}
          showNumericValue={true}
          showProgressRing={true}
          showSizeCircle={true}
          strokeWidth={2}
          zoom={zoom}
        />
      </div>
    );
  } else if (glyphType === 'plot') {
    glyph = (
      <div className="glyph">
        <Plot
          callback={() => {}}
          color="#000000"
          datas={leftDatas}
          fromCentroid={false}
          isClickable={false}
          scaleHeight={5}
          shortNames={shortNames}
          split={5}
          strokeWidth={1}
          range={range}
          zoom={zoom}
        />
        <Plot
          callback={() => {}}
          color="#000000"
          datas={rightDatas}
          fromCentroid={false}
          isClickable={false}
          scaleHeight={5}
          shortNames={shortNames}
          split={5}
          strokeWidth={1}
          range={range}
          zoom={zoom}
        />
      </div>
    );
  } else if (glyphType === 'star') {
    glyph = (
      <div className="glyph">
        {' '}
        <Star
          callback={() => {}}
          color="#ffff00"
          datas={leftDatas}
          fromCentroid={false}
          interval={100}
          isPressable={false}
          opacity={1}
          shortNames={shortNames}
          showLegend={true}
          strokeWidth={2}
          zoom={zoom}
        />
        <Star
          callback={() => {}}
          color="#ffff00"
          datas={rightDatas}
          fromCentroid={false}
          interval={100}
          isPressable={false}
          opacity={1}
          shortNames={shortNames}
          showLegend={true}
          strokeWidth={2}
          zoom={zoom}
        />
      </div>
    );
  }
  // Return SliderTable
  return (
    <div className="slider-table">
      <label>Choose a glyph type: </label>
      <select onChange={(e) => setGlyphType(e.target.value)} value={glyphType}>
        <option value="face">Face Glyph</option>
        <option value="star">Star Glyph</option>
        <option value="plot">Parallel Coordinate</option>
      </select>
      <table>
        <thead>{thead}</thead>
        <tbody>{tbody}</tbody>
      </table>
      {glyph}
    </div>
  );
}
