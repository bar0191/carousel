// eslint-disable-next-line import/extensions
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PerspectiveCamera } from 'three';

function createControls(camera: PerspectiveCamera, canvas: HTMLElement): OrbitControls {
  const controls = new OrbitControls(camera, canvas);

  // provides a feeling of weight when panning
  controls.enableDamping = true;
  controls.minDistance = 2;
  controls.maxDistance = 5;
  controls.enablePan = false;
  controls.enableZoom = false;

  // controls.tick = () => controls.update();

  return controls;
}

export default createControls;
