import React from 'react';

export default function PointsViewing({
  // Necessary properties
  longNames = [
    'Long name of alpha',
    'Long name of beta',
    'Long name of gamma',
    'Long name of delta',
    'Long name of epsilon',
  ],
  points = [
    {
      point: [0, 20, 40, 60, 80],
      imageSRC: 'https://github.com/identicons/blackhawkzzh.png',
    },
    {
      point: [10, 30, 50, 70, 90],
      imageSRC: 'https://github.com/identicons/lichenqin1.png',
    },
  ],
}) {
  // Build table rows
  let trs = [];
  for (let i = 0; i < longNames.length + 1; i++) {
    let tds = [];
    for (let j = 0; j < points.length + 1; j++) {
      let td = <td key={j}></td>;
      if (i < 1 && j >= 1) {
        let img = <img alt="" src={points[j - 1].imageSRC} />;
        td = <td key={j}>{img}</td>;
      } else if (i >= 1 && j < 1) {
        td = <td key={j}>{longNames[i - 1]}</td>;
      } else if (i >= 1 && j >= 1) {
        td = <td key={j}>{points[j - 1].point[i - 1]}</td>;
      }
      tds.push(td);
    }
    trs.push(<tr key={i}>{tds}</tr>);
  }

  // Return PointsViewing
  return (
    <table className="points-viewing">
      <tbody>{trs}</tbody>
    </table>
  );
}
