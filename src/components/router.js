import React from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

import AttributesSelection from './attributes-selection';
import AttributesViewing from './attributes-viewing';
import ClusterComparison from './cluster-comparison';
import KMeansClustering from './k-means-clustering';
import KNNPrediction from './knn-prediction';
import ManualClustering from './manual-clustering';
import Mapping from './mapping';
import PointsViewing from './points-viewing';
import SliderTable from './slider-table';

export default function Router({
  // Necessary property
  components = [
    { element: null, path: '' },
    { element: <AttributesViewing />, path: 'attributes-viewing' },
    { element: <PointsViewing />, path: 'points-viewing' },
    { element: <Mapping />, path: 'mapping' },
    { element: <SliderTable />, path: 'slider-table' },
    { element: <ManualClustering />, path: 'manual-clustering' },
    { element: <KMeansClustering />, path: 'k-means-clustering' },
    { element: <AttributesSelection />, path: 'attributes-selection' },
    { element: <KNNPrediction />, path: 'knn-prediction' },
    { element: <ClusterComparison />, path: 'cluster-comparison' },
  ],
}) {
  // Build links
  let links = components.map((component, i) =>
    component.element === null ? null : (
      <Link key={i} to={component.path}>
        {component.path}
      </Link>
    )
  );

  // Build routes
  let routes = components.map((component, i) => (
    <Route element={component.element} key={i} path={component.path} />
  ));

  // Return Router
  return (
    <div className="router">
      <HashRouter>
        {links}
        <hr />
        <Routes>{routes}</Routes>
      </HashRouter>
    </div>
  );
}