import React from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';

import Face from './face';
import Plot from './plot';
import Star from './star';

export default function ManualClustering({
  callback = (clusters) => console.log(clusters),
  callbackState = (state) => console.log(state),
  color = '#000000',
  initialState = null,
  points = [
    // [10, 10, 10, 10, 10],
    // [20, 20, 20, 20, 20],
    // [30, 30, 30, 30, 30],
    // [40, 40, 40, 40, 40],
    // [50, 50, 50, 50, 50],
    // [60, 60, 60, 60, 60],
    // [70, 70, 70, 70, 70],
    // [80, 80, 80, 80, 80],
    // [90, 90, 90, 90, 90],
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
  zoom = 0.5,
  // range = {
  //   min: [0, 0, 0, 0, 0],
  //   mean: [50, 50, 50, 50, 50],
  //   max: [100, 100, 100, 100, 100],
  // },
  range = { min: [-20, 0, 0, 0, 0], max: [20, 3000, 50, 20, 20] },
  shortNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
}) {
  // Hook
  let [glyphType, setGlyphType] = React.useState('face');
  let [clusters, setClusters] = React.useState(
    initialState === null
      ? points.map((_, i) => {
          return { indexes: [i], movedTo: -1 };
        })
      : initialState.clusters
  );

  // Interact functions
  let click = (index) => () => {
    let from = clusters[index].movedTo;
    let to = index;
    let newClusters = [...clusters];
    newClusters[from].indexes = newClusters[from].indexes.filter(
      (index) => index !== to
    );
    newClusters[to].indexes = [index];
    newClusters[to].movedTo = -1;
    setClusters(newClusters);
    callback(
      newClusters
        .map((newCluster) => newCluster.indexes.map((index) => points[index]))
        .filter((newCluster) => newCluster.length > 0)
    );
  };
  let drop = (index) => (e) => {
    let from = JSON.parse(e.face).from;
    let to = index;
    if (from === to) {
      return;
    }
    let newClusters = [...clusters];
    newClusters[to].indexes = newClusters[to].indexes.concat(
      newClusters[from].indexes
    );
    newClusters[from].indexes = [];
    newClusters[from].movedTo = to;
    for (let newCluster of newClusters) {
      if (newCluster.movedTo === from) {
        newCluster.movedTo = to;
      }
    }
    setClusters(newClusters);
    callback(
      newClusters
        .map((newCluster) => newCluster.indexes.map((index) => points[index]))
        .filter((newCluster) => newCluster.length > 0)
    );
    callbackState({ clusters: newClusters });
  };

  // Build datas
  let unmovedDatas = points.map((point) => {
    return {
      color: color,
      nPoint: point.map(
        (value, i) => (value - range.min[i]) / (range.max[i] - range.min[i])
      ),
      opacity: 1,
      opacities: [1, 1],
    };
  });
  let movedDatas = unmovedDatas.map((data) => {
    return { ...data, opacity: 0.5, opacities: [0.5, 0.5] };
  });

  // Build glyphs
  let glyphs = clusters.map((cluster, i) => {
    let glyphA = null;
    if (glyphType === 'face') {
      glyphA = (
        <Face
          callback={() => {}}
          color="auto"
          datas={cluster.indexes.map((index) => unmovedDatas[index])}
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
          showSizeCircle={true}
          strokeWidth={2}
          zoom={zoom}
        />
      );
    } else if (glyphType === 'plot') {
      glyphA = (
        <Plot
          callback={() => {}}
          color="#000000"
          datas={cluster.indexes.map((index) => unmovedDatas[index])}
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
      glyphA = (
        <Star
          callback={() => {}}
          color="#ffff00"
          datas={cluster.indexes.map((index) => unmovedDatas[index])}
          fromCentroid={false}
          interval={100}
          isPressable={false}
          opacity={1}
          shortNames={shortNames}
          showLegend={false}
          strokeWidth={2}
          zoom={zoom}
        />
      );
    }
    let glyphB = null;
    if (glyphType === 'face') {
      glyphB = (
        <Face
          callback={() => {}}
          color="auto"
          datas={[movedDatas[i]]}
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
      glyphB = (
        <Plot
          callback={() => {}}
          color="#000000"
          datas={[movedDatas[i]]}
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
      glyphB = (
        <Star
          callback={() => {}}
          color="#ffff00"
          datas={[movedDatas[i]]}
          fromCentroid={false}
          interval={100}
          isPressable={false}
          opacity={1}
          shortNames={shortNames}
          showLegend={false}
          strokeWidth={2}
          zoom={zoom}
        />
      );
    }
    return cluster.indexes.length > 0 ? (
      <Droppable className="unmoved" key={i} onDrop={drop(i)} types={['face']}>
        <Draggable data={JSON.stringify({ from: i })} type="face">
          {glyphA}
        </Draggable>
      </Droppable>
    ) : (
      <div className="moved" key={i} onClick={click(i)}>
        {glyphB}
      </div>
    );
  });

  // Return ManualClustering
  return (
    <div className="manual-clustering">
      <div>
        <label>Choose a glyph type: </label>
        <select
          onChange={(e) => setGlyphType(e.target.value)}
          value={glyphType}
        >
          <option value="face">Face Glyph</option>
          <option value="star">Star Glyph</option>
          <option value="plot">Parallel Coordinate</option>
        </select>
      </div>
      <br />
      {glyphs}
    </div>
  );
}
