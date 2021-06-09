import {
  BoxGeometry,
  SphereGeometry,
  DodecahedronGeometry,
  CylinderGeometry,
} from 'three';

interface LightsObject {
  box: BoxGeometry;
  sphere: SphereGeometry;
  dodecahedron: DodecahedronGeometry;
  cylinder: CylinderGeometry;
}

function createGeometries(): LightsObject {
  const box = new BoxGeometry(1, 1, 1);

  const sphere = new SphereGeometry(0.5, 12, 8);

  const dodecahedron = new DodecahedronGeometry(0.5);

  const cylinder = new CylinderGeometry(0.5, 0.5, 1, 12);

  return {
    box,
    sphere,
    dodecahedron,
    cylinder,
  };
}

export default createGeometries;
