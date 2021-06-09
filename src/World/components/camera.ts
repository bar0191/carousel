import { PerspectiveCamera } from 'three';

function createCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(50, 1, 1, 10);

  camera.position.set(0, 0, 2);

  return camera;
}

export default createCamera;
