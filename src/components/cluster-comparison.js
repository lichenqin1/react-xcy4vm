import React from 'react';

import Face from './face';
import Plot from './plot';
import Star from './star';

export default function ClusterComparison({
  // Necessary properties
  clusters = [
    {
      centroid: [20, 30, 40, 50, 60],
      color: '#cd3131',
      points: [
        [10, 20, 30, 40, 50],
        [15, 25, 35, 45, 55],
        [25, 35, 45, 55, 65],
        [30, 40, 50, 60, 70],
      ],
    },
    {
      centroid: [60, 70, 80, 90, 100],
      color: '#0dbc79',
      points: [
        [50, 60, 70, 80, 90],
        [55, 65, 75, 85, 95],
        [65, 75, 85, 95, 105],
        [70, 80, 90, 100, 110],
      ],
    },
    {
      centroid: [100, 110, 120, 130, 140],
      color: '#e5e510',
      points: [
        [90, 100, 110, 120, 130],
        [95, 105, 115, 125, 135],
        [105, 115, 125, 135, 145],
        [110, 120, 130, 140, 150],
      ],
    },
  ],
  range = {
    min: [10, 20, 30, 40, 50],
    mean: [60, 70, 80, 90, 100],
    max: [110, 120, 130, 140, 150],
  },
  shortNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
  // Optional properties
  callbackState = (state) => console.log(state),
  gap = 3,
  interval = 100,
  initialState = null,
  zoom = 1,
}) {
  // Hook
  let [glyphType, setGlyphType] = React.useState('face');
  let [actives1, setActives1] = React.useState(
    initialState === null ? clusters.map(() => false) : initialState.actives1
  );
  let [actives2, setActives2] = React.useState(
    initialState === null ? clusters.map(() => false) : initialState.actives2
  );

  // Get datas of clusters
  let datasOfClusters = clusters.map((cluster, i) =>
    [cluster.centroid].concat(cluster.points).map((point, j) => {
      let color = cluster.color;
      let nPoint = point.map(
        (value, k) => (value - range.min[k]) / (range.max[k] - range.min[k])
      );
      let opacity = j === 0 ? (actives2[i] ? 0.5 : 1) : 0.3;
      let opacities = [opacity, j === 0 ? 0 : 1];
      if (glyphType === 'face') {
        return { color: color, nPoint: nPoint, opacities: opacities };
      } else if (glyphType === 'plot' || glyphType === 'star') {
        return { color: color, nPoint: nPoint, opacity: opacity };
      }
    })
  );

  // Get datas of centroids
  let datasOfCentroids = datasOfClusters
    .map((datasOfCluster) => {
      if (glyphType === 'face') {
        return { ...datasOfCluster[0], opacities: [1, 1] };
      } else if (glyphType === 'plot' || glyphType === 'star') {
        return { ...datasOfCluster[0], opacity: 1 };
      }
    })
    .filter((_, i) => actives2[i]);

  // Change functions
  let changeActives1 = (index) => (isCentroid) => {
    let newActives1 = [...actives1];
    newActives1[index] = isCentroid;
    setActives1(newActives1);
    let newActives2 = [...actives2];
    newActives2[index] = isCentroid ? newActives2[index] : false;
    setActives2(newActives2);
  };
  let changeActives2 = (index) => () => {
    let newActives1 = [...actives1];
    newActives1[index] = true;
    setActives1(newActives1);
    let newActives2 = [...actives2];
    newActives2[index] = !newActives2[index];
    setActives2(newActives2);
  };

  // Build glyphs
  let glyphs = datasOfClusters.map((datasOfCluster, i) => {
    let fromCentroid = initialState === null ? false : initialState.actives1[i];
    if (glyphType === 'face') {
      let rawWidth = 200;
      let rawHeight = 240;
      let viewWidth = rawWidth;
      let viewHeight = rawHeight;
      viewWidth *= 1.5;
      viewHeight += (datasOfCluster.length - 1) * gap;
      viewWidth += 60;
      viewHeight += 60;
      let width = viewWidth * zoom;
      let height = viewHeight * zoom + 35;
      let style = { height: height, width: width };
      let translateX = `translateX(${(zoom * (rawHeight + 60) - 160) / 2}px)`;
      let button = actives1[i] ? (
        <button onClick={changeActives2(i)} style={{ transform: translateX }}>
          {actives2[i] ? 'Take Back Centroid' : 'Overlay Centroid'}
        </button>
      ) : null;
      return (
        <div className="glyph" key={i} style={style}>
          <Face
            callback={changeActives1(i)}
            color="auto"
            datas={datasOfCluster}
            dialRadius={14}
            fromCentroid={fromCentroid}
            interval={interval}
            isPressable={true}
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
          {button}
        </div>
      );
    } else if (glyphType === 'plot') {
      let width = zoom * 260;
      let height = zoom * 180 + 35;
      let style = { height: height, width: width };
      let translateX = `translateX(${(width - 160) / 2}px)`;
      let button = actives1[i] ? (
        <button onClick={changeActives2(i)} style={{ transform: translateX }}>
          {actives2[i] ? 'Take Back Centroid' : 'Overlay Centroid'}
        </button>
      ) : null;
      return (
        <div className="glyph" key={i} style={style}>
          <Plot
            callback={changeActives1(i)}
            color="#000000"
            datas={datasOfCluster}
            fromCentroid={fromCentroid}
            isClickable={true}
            scaleHeight={5}
            shortNames={shortNames}
            split={5}
            strokeWidth={1}
            range={range}
            zoom={zoom}
          />
          {button}
        </div>
      );
    } else if (glyphType === 'star') {
      let width = zoom * 300;
      let height = zoom * 240 + 35;
      let style = { height: height, width: width };
      let translateX = `translateX(${(width - 160) / 2}px)`;
      let button = actives1[i] ? (
        <button onClick={changeActives2(i)} style={{ transform: translateX }}>
          {actives2[i] ? 'Take Back Centroid' : 'Overlay Centroid'}
        </button>
      ) : null;
      return (
        <div className="glyph" key={i} style={style}>
          <Star
            callback={changeActives1(i)}
            color="#ffff00"
            datas={datasOfCluster}
            fromCentroid={fromCentroid}
            interval={interval}
            isPressable={true}
            opacity={1}
            shortNames={shortNames}
            showLegend={true}
            strokeWidth={2}
            zoom={zoom}
          />
          {button}
        </div>
      );
    }
  });

  // Build overlay
  let overlay = null;
  if (datasOfCentroids.length > 0 && glyphType === 'face') {
    overlay = (
      <Face
        callback={() => {}}
        color="auto"
        datas={datasOfCentroids}
        dialRadius={14}
        fromCentroid={false}
        interval={interval}
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
    );
  } else if (datasOfCentroids.length > 0 && glyphType === 'plot') {
    overlay = (
      <Plot
        callback={() => {}}
        color="#000000"
        datas={datasOfCentroids}
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
  } else if (datasOfCentroids.length > 0 && glyphType === 'star') {
    overlay = (
      <Star
        callback={() => {}}
        color="#ffff00"
        datas={datasOfCentroids}
        fromCentroid={false}
        interval={interval}
        isPressable={false}
        opacity={1}
        shortNames={shortNames}
        showLegend={true}
        strokeWidth={2}
        zoom={zoom}
      />
    );
  }

  // Callback effect
  let state = { actives1: actives1, actives2: actives2 };
  React.useEffect(() => callbackState(state), [JSON.stringify(state)]);

  // Return ClusterComparison
  return (
    <div className="cluster-comparison">
      <label>Choose a glyph type: </label>
      <select onChange={(e) => setGlyphType(e.target.value)} value={glyphType}>
        <option value="face">Face Glyph</option>
        <option value="star">Star Glyph</option>
        <option value="plot">Parallel Coordinate</option>
      </select>
      <br />
      <br />
      {glyphs}
      <br />
      {overlay}
    </div>
  );
}
