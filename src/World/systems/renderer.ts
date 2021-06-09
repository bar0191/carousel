import { WebGLRenderer } from 'three';

function createRenderer(): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });

  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;

  renderer.setClearColor(0xffffff, 1);

  renderer.setPixelRatio(window.devicePixelRatio);

  return renderer;
}

export default createRenderer;
