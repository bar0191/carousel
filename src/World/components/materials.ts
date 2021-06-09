import { MeshStandardMaterial, Color } from 'three';

interface Materials {
  material: MeshStandardMaterial
}
function createMaterials(): Materials {
  const material = new MeshStandardMaterial({
    color: new Color().setHSL(Math.random(), 1, 0.75),
    roughness: 0.5,
    metalness: 0,
    flatShading: true,
  });

  return { material };
}

export default createMaterials;
