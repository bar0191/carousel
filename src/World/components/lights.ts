import { DirectionalLight, HemisphereLight } from 'three';

interface LightsObject {
  ambientLight: HemisphereLight;
  mainLight: DirectionalLight;
}

function createLights(): LightsObject {
  const ambientLight = new HemisphereLight(
    'white',
    'darkslategrey',
    5,
  );

  const mainLight = new DirectionalLight('white', 4);
  mainLight.position.set(1, 1, 1);

  return { ambientLight, mainLight };
}

export default createLights;
