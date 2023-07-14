import React from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';

import Face from './face';
import Plot from './plot';
import Star from './star';

export default function Mapping({
  // Necessary properties
  attributes = [
    { header: 'alpha', longName: 'Long name of alpha' },
    { header: 'beta', longName: 'Long name of beta' },
    { header: 'gamma', longName: 'Long name of gamma' },
    { header: 'delta', longName: 'Long name of delta' },
    { header: 'epsilon', longName: 'Long name of epsilon' },
  ],
  callback = (headers) => console.log(headers),
  // Optional properties
  color = '#000000',
  callbackState = (state) => console.log(state),
  faceNPoint = { old: [0, 0, 0, 0, 0], new: [0.5, 0.5, 0.5, 0.5, 0.5] },
  features = ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
  initialState = null,
  zoom = 1,
  range = {
    min: [10, 20, 30, 40, 50],
    mean: [60, 70, 80, 90, 100],
    max: [110, 120, 130, 140, 150],
  },
}) {
  // Hooks
  let [glyphType, setGlyphType] = React.useState('face');
  let [nPoint, setNPoint] = React.useState(
    initialState === null ? faceNPoint.old : initialState.nPoint
  );
  let [leftHeaders, setLeftHeaders] = React.useState(
    initialState === null ? features.map(() => null) : initialState.leftHeaders
  );
  let [rightHeaders, setRightHeaders] = React.useState(
    initialState === null
      ? attributes.map((attribute) => attribute.header)
      : initialState.rightHeaders
  );

  // Get map from headers to long names
  let headerToLongName = {};
  for (let attribute of attributes) {
    headerToLongName[attribute.header] = attribute.longName;
  }

  // Drop functions
  let dropLeft = (index) => (e) => {
    let to = index;
    if (e.left && leftHeaders[to] === null) {
      // Print
      console.log('Drop from a left slot to an empty left slot');

      // Get from index
      let from = 0;
      for (let i in leftHeaders) {
        from = leftHeaders[i] === e.left ? i : from;
      }

      // Update nPoint
      let newNPoint = [...nPoint];
      newNPoint[from] = faceNPoint.old[from];
      newNPoint[to] = faceNPoint.new[to];
      setNPoint(newNPoint);

      // Update left headers
      let newLeftHeaders = [...leftHeaders];
      newLeftHeaders[from] = null;
      newLeftHeaders[to] = e.left;
      setLeftHeaders(newLeftHeaders);

      // Callback
      callback(newLeftHeaders);
      callbackState({
        nPoint: newNPoint,
        leftHeaders: newLeftHeaders,
        rightHeaders: rightHeaders,
      });
    } else if (e.left && leftHeaders[to] !== null) {
      // Print
      console.log('Drop from a left slot to an occupied left slot');

      // Get from index
      let from = 0;
      for (let i in leftHeaders) {
        from = leftHeaders[i] === e.left ? i : from;
      }

      // Update left headers
      let newLeftHeaders = [...leftHeaders];
      newLeftHeaders[from] = newLeftHeaders[to];
      newLeftHeaders[to] = e.left;
      setLeftHeaders(newLeftHeaders);

      // Callback
      callback(newLeftHeaders);
      callbackState({
        nPoint: nPoint,
        leftHeaders: newLeftHeaders,
        rightHeaders: rightHeaders,
      });
    } else if (e.right && leftHeaders[to] === null) {
      // Print
      console.log('Drop from a right slot to an empty left slot');

      // Update nPoint
      let newNPoint = [...nPoint];
      newNPoint[to] = faceNPoint.new[to];
      setNPoint(newNPoint);

      // Update left headers
      let newLeftHeaders = [...leftHeaders];
      newLeftHeaders[to] = e.right;
      setLeftHeaders(newLeftHeaders);

      // Update right headers
      let newRightHeaders = rightHeaders.filter((header) => header !== e.right);
      setRightHeaders(newRightHeaders);

      // Callback
      callback(newLeftHeaders);
      callbackState({
        nPoint: newNPoint,
        leftHeaders: newLeftHeaders,
        rightHeaders: newRightHeaders,
      });
    } else if (e.right && leftHeaders[to] !== null) {
      // Print
      console.log('Drop from a right slot to an occupied left slot');

      // Update right headers
      let newRightHeaders = rightHeaders.filter((header) => header !== e.right);
      newRightHeaders.push(leftHeaders[to]);
      setRightHeaders(newRightHeaders);

      // Update left headers
      let newLeftHeaders = [...leftHeaders];
      newLeftHeaders[to] = e.right;
      setLeftHeaders(newLeftHeaders);

      // Callback
      callback(newLeftHeaders);
      callbackState({
        nPoint: nPoint,
        leftHeaders: newLeftHeaders,
        rightHeaders: newRightHeaders,
      });
    }
  };
  let dropRight = (e) => {
    // Print
    console.log('Drop to right');

    // Get from index
    let from = 0;
    for (let i in leftHeaders) {
      from = leftHeaders[i] === e.left ? i : from;
    }

    // Update nPoint
    let newNPoint = [...nPoint];
    newNPoint[from] = faceNPoint.old[from];
    setNPoint(newNPoint);

    // Update left headers
    let newLeftHeaders = [...leftHeaders];
    newLeftHeaders[from] = null;
    setLeftHeaders(newLeftHeaders);

    // Update right headers
    let newRightHeaders = [...rightHeaders];
    newRightHeaders.push(e.left);
    setRightHeaders(newRightHeaders);

    // Callback
    callback(newLeftHeaders);
    callbackState({
      nPoint: newNPoint,
      leftHeaders: newLeftHeaders,
      rightHeaders: newRightHeaders,
    });
  };

  // Build datas
  let datas = [
    {
      color: color,
      nPoint: nPoint,
      opacities: [1, 1],
      opacity: 1,
    },
  ];

  // Build glyph
  let glyph = null;
  if (glyphType === 'face') {
    glyph = (
      <Face
        callback={() => {}}
        color="auto"
        datas={datas}
        dialRadius={7}
        fromCentroid={false}
        interval={100}
        isPressable={false}
        opacity="auto"
        range={null}
        shortNames={null}
        showDial={false}
        showHighlightRange={false}
        showLegend={false}
        showNumericValue={false}
        showProgressRing={false}
        showSizeCircle={false}
        strokeWidth={2}
        zoom={zoom}
      />
    );
  } else if (glyphType === 'plot') {
    glyph = (
      <Plot
        callback={() => {}}
        color="#000000"
        datas={datas}
        fromCentroid={false}
        isClickable={false}
        scaleHeight={5}
        shortNames={features}
        split={5}
        strokeWidth={1}
        range={range}
        zoom={zoom}
      />
    );
  } else if (glyphType === 'star') {
    glyph = (
      <Star
        callback={() => {}}
        color="#ffff00"
        datas={datas}
        fromCentroid={false}
        interval={100}
        isPressable={false}
        opacity={1}
        shortNames={features}
        showLegend={true}
        strokeWidth={2}
        zoom={zoom}
      />
    );
  }

  // Build left mapping
  let leftDraggables = leftHeaders.map((header, i) =>
    header === null ? null : (
      <Draggable className="header" data={header} key={i} type="left">
        {headerToLongName[header]}
      </Draggable>
    )
  );
  let leftRows = features.map((feature, i) => (
    <Droppable
      className="left-row"
      key={i}
      types={['left', 'right']}
      onDrop={dropLeft(i)}
    >
      {feature}
      {leftDraggables[i]}
    </Droppable>
  ));
  let leftMapping = <div className="left-mapping">{leftRows}</div>;

  // Build right mapping
  let rightRows = rightHeaders.map((header, i) => (
    <div className="right-row" key={i}>
      <Draggable className="header" data={header} type="right">
        {headerToLongName[header]}
      </Draggable>
    </div>
  ));
  let rightMapping = (
    <Droppable className="right-mapping" types={['left']} onDrop={dropRight}>
      {rightRows}
    </Droppable>
  );

  // Return Mapping
  return (
    <div className="mapping">
      <label>Choose a glyph type: </label>
      <select onChange={(e) => setGlyphType(e.target.value)} value={glyphType}>
        <option value="face">Face Glyph</option>
        <option value="star">Star Glyph</option>
        <option value="plot">Parallel Coordinate</option>
      </select>
      <div className="centered">{glyph}</div>
      {leftMapping}
      {rightMapping}
    </div>
  );
}
