import React from 'react';
import axios from 'axios';

import Face from './face';
import Plot from './plot';
import ScaleSlider from './scale-slider';
import Star from './star';

export default function KNNPrediction({
  accuracies = [
    'Accuracy',
    '1.00',
    '0.69',
    '0.46',
    '0.40',
    '0.35',
    '0.31',
    '0.29',
    '0.28',
    '0.25',
    '0.21',
    '0.23',
    '0.23',
    '0.20',
    '0.21',
  ],
  callbackState = (initialState) => console.log(initialState),
  initialState = null,
  maxK = 14,
  opacity = 1,
  points = [
    [8, 2530, 14.1, 16, 13],
    [13, 1550, 30, 6, 18],
    [10, 1500, 26, 8, 17],
    [13, 1640, 22, 6, 18],
    [15, 1720, 28, 9, 18],
    [15, 1560, 25, 7, 14],
    [12, 1500, 23, 7, 16],
    [-12, 210, 3, 1, 0],
    [-1, 325, 5, 3, 0],
    [-2, 300, 4, 2, 0],
    [-4, 331, 3, 4, 1],
    [-4, 320, 3, 2, 0],
  ],
  query = {
    index: 1,
    points: [
      [18, 1380, 35, 6, 4],
      [20, 1290, 29, 8, 3],
      [12, 1090, 27, 9, 3],
      [13, 1054, 35, 6, 3],
      [14, 1107, 38, 8, 3],
      [13, 1246, 32, 7, 4],
      [12, 1110, 35, 8, 3],
      [11, 1070, 27, 8, 3],
      [12, 1080, 28, 7, 5],
      [13, 1370, 28, 6, 0],
    ],
  },
  zoom = 0.5,
  range = { min: [-20, 0, 0, 0, 0], max: [20, 3000, 50, 20, 20] },
  shortNames = ['Eyebrow', 'Eye', 'Nose', 'Cheek', 'Mouth'],
  url = 'https://hammerhead-app-9pl8l.ondigitalocean.app/api/algorithms/knn',
}) {
  // Preprocess the query points
  query.points = query.points.map((point) =>
    point.map((_, i) => {
      if (i === query.index) {
        return range.min[query.index];
      }
      return point[i];
    })
  );

  // Hooks
  let [glyphType, setGlyphType] = React.useState('face');
  let [k, setK] = React.useState(initialState === null ? 2 : initialState.k);
  let [faceIndex, setFaceIndex] = React.useState(
    initialState === null ? -1 : initialState.faceIndex
  );
  let [result, setResult] = React.useState(
    initialState === null ? null : initialState.result
  );

  // Build slider
  let slider = (
    <ScaleSlider
      callback={(value) => {
        setK(+value);
        callbackState({ k: +value, faceIndex: faceIndex, result: result });
      }}
      initialValue={k}
      range={{ min: 0, max: maxK }}
      scales={{
        above: Array(maxK + 1)
          .fill()
          .map((_, i) => `k = ${i}`),
        below: accuracies,
      }}
    />
  );

  // Build faces
  let faces = query.points.map((point, i) => {
    let glyph = null;
    if (glyphType === 'face') {
      glyph = (
        <Face
          callback={() => {}}
          color="auto"
          datas={[
            {
              color: 'black',
              nPoint: point.map(
                (value, j) =>
                  (value - range.min[j]) / (range.max[j] - range.min[j])
              ),
              opacities: [1, 1],
            },
          ]}
          dialRadius={14}
          fromCentroid={false}
          interval={100}
          isPressable={false}
          opacity="auto"
          range={null}
          shortNames={shortNames}
          showDial={false}
          showHighlightRange={false}
          showLegend={true}
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
          datas={[
            {
              color: 'black',
              nPoint: point.map(
                (value, j) =>
                  (value - range.min[j]) / (range.max[j] - range.min[j])
              ),
              opacity: 1,
            },
          ]}
          fromCentroid={false}
          isClickable={false}
          scaleHeight={5}
          shortNames={shortNames}
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
          datas={[
            {
              color: 'black',
              nPoint: point.map(
                (value, j) =>
                  (value - range.min[j]) / (range.max[j] - range.min[j])
              ),
              opacity: 1,
            },
          ]}
          fromCentroid={false}
          interval={100}
          isPressable={false}
          opacity={1}
          shortNames={shortNames}
          showLegend={true}
          strokeWidth={2}
          zoom={zoom}
        />
      );
    }
    return (
      <div
        className={i === faceIndex ? 'face-selected' : 'face-unselected'}
        key={i}
        onClick={() => {
          setFaceIndex(faceIndex === i ? -1 : i);
          callbackState({ k: k, faceIndex: i, result: result });
        }}
      >
        {glyph}
      </div>
    );
  });

  // Build button
  let buttonStyle = {
    color: '#28a745',
    borderColor: '#28a745',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    borderRadius: '0.2rem',
    cursor: 'pointer',
  };
  let click = () => {
    if (k < 1) {
      alert('Pick a k greater than 0');
      setResult(null);
      callbackState({ k: k, faceIndex: faceIndex, result: null });
      return;
    } else if (faceIndex < 0) {
      alert('Select a face');
      setResult(null);
      callbackState({ k: k, faceIndex: faceIndex, result: null });
      return;
    } else {
      let queryPoint = [...query.points[faceIndex]];
      queryPoint[query.index] = null;
      let config = {
        method: 'post',
        url: url,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ k: k, points: points, queryPoint: queryPoint }),
      };
      axios(config).then((res) => {
        setResult(res.data.data);
        callbackState({ k: k, faceIndex: faceIndex, result: res.data.data });
      });
    }
  };
  let button = (
    <div>
      <button onClick={click} style={buttonStyle}>
        Predict with KNN
      </button>
    </div>
  );

  // Build text
  let attributeText = shortNames[query.index];
  let valueText =
    result === null
      ? '? (Click on the "Predict with KNN" to see the prediction result)'
      : result.value;
  let text = (
    <div>
      KNN predicts that the{' '}
      <span style={{ backgroundColor: 'yellow' }}>
        <b>{attributeText}</b>
      </span>{' '}
      of the unknown datapoint selected above is:{' '}
      <span style={{ backgroundColor: 'yellow' }}>
        <b>{valueText}</b>
      </span>
    </div>
  );

  // Build result table
  let neighborsFaces = [];
  if (result !== null) {
    let dists = result.neighbors.map((neighbor) => neighbor.dist);
    let minDist = Math.min.apply(null, dists);
    let maxDist = Math.max.apply(null, dists);
    let opacities = dists.map(
      (dist) => 0.9 * (1 - (dist - minDist) / (maxDist - minDist)) + 0.1
    );
    neighborsFaces = result.neighbors.map((neighbor, i) => {
      return {
        color: 'black',
        nPoint: neighbor.point.map(
          (value, j) => (value - range.min[j]) / (range.max[j] - range.min[j])
        ),
        opacity: 0.3,
        opacities: [0.3, 1],
      };
    });
  }
  let neighbors = null;
  if (glyphType === 'face') {
    neighbors = (
      <Face
        callback={() => {}}
        color="auto"
        datas={neighborsFaces}
        dialRadius={14}
        fromCentroid={false}
        interval={100}
        isPressable={false}
        opacity="auto"
        range={null}
        shortNames={shortNames}
        showDial={false}
        showHighlightRange={false}
        showLegend={true}
        showNumericValue={false}
        showProgressRing={false}
        showSizeCircle={true}
        strokeWidth={2}
        zoom={zoom}
      />
    );
  } else if (glyphType === 'plot') {
    neighbors = (
      <Plot
        callback={() => {}}
        color="#000000"
        datas={neighborsFaces}
        fromCentroid={false}
        isClickable={false}
        scaleHeight={5}
        shortNames={shortNames}
        split={5}
        strokeWidth={1}
        range={range}
        zoom={zoom}
      />
    );
  } else if (glyphType === 'star') {
    neighbors = (
      <Star
        callback={() => {}}
        color="#ffff00"
        datas={neighborsFaces}
        fromCentroid={false}
        interval={100}
        isPressable={false}
        opacity={1}
        shortNames={shortNames}
        showLegend={true}
        strokeWidth={2}
        zoom={zoom}
      />
    );
  }
  let actualFloats =
    faceIndex >= 0
      ? query.points[faceIndex].map(
          (value, i) => (value - range.min[i]) / (range.max[i] - range.min[i])
        )
      : [0.5, 0.5, 0.5, 0.5, 0.5];
  let actualFace = [
    { color: 'black', nPoint: actualFloats, opacities: [1, 1], opacity: 1 },
  ];
  let actual = null;
  if (glyphType === 'face') {
    actual = (
      <Face
        callback={() => {}}
        color="auto"
        datas={actualFace}
        dialRadius={14}
        fromCentroid={false}
        interval={100}
        isPressable={false}
        opacity="auto"
        range={null}
        shortNames={shortNames}
        showDial={false}
        showHighlightRange={false}
        showLegend={true}
        showNumericValue={false}
        showProgressRing={false}
        showSizeCircle={true}
        strokeWidth={2}
        zoom={zoom}
      />
    );
  } else if (glyphType === 'plot') {
    actual = (
      <Plot
        callback={() => {}}
        color="#000000"
        datas={actualFace}
        fromCentroid={false}
        isClickable={false}
        scaleHeight={5}
        shortNames={shortNames}
        split={5}
        strokeWidth={1}
        range={range}
        zoom={zoom}
      />
    );
  } else if (glyphType === 'star') {
    actual = (
      <Star
        callback={() => {}}
        color="#ffff00"
        datas={actualFace}
        fromCentroid={false}
        interval={100}
        isPressable={false}
        opacity={1}
        shortNames={shortNames}
        showLegend={true}
        strokeWidth={2}
        zoom={zoom}
      />
    );
  }
  let resultTable =
    result === null ? (
      <table className="result-table"></table>
    ) : (
      <table className="result-table">
        <thead>
          <tr>
            <th>K nearest neighbor</th>
            <th>Actual data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{neighbors}</td>
            <td>{actual}</td>
          </tr>
        </tbody>
      </table>
    );

  // Return KNNPrediction
  return (
    <div className="knn-prediction">
      <label>Choose a glyph type: </label>
      <select onChange={(e) => setGlyphType(e.target.value)} value={glyphType}>
        <option value="face">Face Glyph</option>
        <option value="star">Star Glyph</option>
        <option value="plot">Parallel Coordinate</option>
      </select>
      <br />
      <br />
      {slider}
      {faces}
      {button}
      {text}
      {resultTable}
    </div>
  );
}
