import React from 'react';
import axios from 'axios';

import ClusterComparison from './cluster-comparison';

export default function KMeansClustering({
  // Necessary properties
  points = [
    [10, 20, 30, 40, 50],
    [15, 25, 35, 45, 55],
    [25, 35, 45, 55, 65],
    [30, 40, 50, 60, 70],
    [50, 60, 70, 80, 90],
    [55, 65, 75, 85, 95],
    [65, 75, 85, 95, 105],
    [70, 80, 90, 100, 110],
    [90, 100, 110, 120, 130],
    [95, 105, 115, 125, 135],
    [105, 115, 125, 135, 145],
    [110, 120, 130, 140, 150],
  ],
  range = {
    min: [10, 20, 30, 40, 50],
    mean: [60, 70, 80, 90, 100],
    max: [110, 120, 130, 140, 150],
  },
  shortNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
  // Optional properties
  callbackState = (state) => console.log(state),
  colors = ['#000000', '#cd3131', '#0dbc79', '#e5e510', '#2472c8', '#bc3fbc'],
  glyphType = 'face',
  initialState = null,
  interval = 100,
  kValues = [2, 3, 4, 5, 6],
  url = 'https://hammerhead-app-9pl8l.ondigitalocean.app/api/algorithms/kmeans',
  zoom = 1,
}) {
  // Hooks
  let [kIndex, setKIndex] = React.useState(
    initialState === null ? -1 : initialState.kIndex
  );
  let [clusters, setClusters] = React.useState(
    initialState === null ? [] : initialState.clusters
  );

  // Request function
  let request = (index) => () => {
    axios.post(url, { k: kValues[index], points: points }).then((res) => {
      setKIndex(index);
      let newClusters = res.data.data.clusters.map((cluster, i) => ({
        ...cluster,
        color: colors[i],
      }));
      setClusters(newClusters);
    });
  };

  // Build buttons
  let buttons = kValues.map((kValue, i) => (
    <button
      className={i === kIndex ? 'selected' : 'unselected'}
      key={i}
      onClick={request(i)}
    >
      {`k = ${kValue}`}
    </button>
  ));

  // Build cluster comparison
  let clusterComparison = (
    <ClusterComparison
      callbackState={() => {}}
      clusters={clusters}
      range={range}
      initialState={null}
      shortNames={shortNames}
      glyphType={glyphType}
      interval={interval}
      zoom={zoom}
    />
  );

  // Callback effect
  let state = { kIndex: kIndex, clusters: clusters };
  React.useEffect(() => callbackState(state), [JSON.stringify(state)]);

  // Return KMeansClustering
  return (
    <div className="k-means-clustering">
      {buttons}
      {clusterComparison}
    </div>
  );
}
