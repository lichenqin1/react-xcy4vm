export interface Point {
  x: number;
  y: number;
}

export function basisCurve(points: Point[]): string {
  let path = '';
  for (let i = 0; i < points.length; i++) {
    const p1 = points[(i + 1) % points.length];
    const p2 = points[(i + 2) % points.length];
    const p3 = points[(i + 3) % points.length];
    const x1 = (2 * p1.x + p2.x) / 3;
    const y1 = (2 * p1.y + p2.y) / 3;
    const x2 = (p1.x + 2 * p2.x) / 3;
    const y2 = (p1.y + 2 * p2.y) / 3;
    const x3 = (p1.x + 4 * p2.x + p3.x) / 6;
    const y3 = (p1.y + 4 * p2.y + p3.y) / 6;
    path += ` C ${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`;
    path = (i == points.length - 1 ? `M ${x3} ${y3}` : '') + path;
  }
  return path;
}

export function cardinalCurve(points: Point[], tension: number = 0): string {
  const k = (1 - Math.min(Math.max(tension, 0), 1)) / 6;
  let path = '';
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const p3 = points[(i + 2) % points.length];
    const p4 = points[(i + 3) % points.length];
    const x1 = p2.x + k * (p3.x - p1.x);
    const y1 = p2.y + k * (p3.y - p1.y);
    const x2 = p3.x + k * (p2.x - p4.x);
    const y2 = p3.y + k * (p2.y - p4.y);
    const x3 = p3.x;
    const y3 = p3.y;
    path += ` C ${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`;
    path = (i == points.length - 1 ? `M ${x3} ${y3}` : '') + path;
  }
  return path;
}
