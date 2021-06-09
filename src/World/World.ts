import { Mesh, Scene } from 'three';

import createRenderer from './systems/renderer';
import Resizer from './systems/Resizer';

import createScene from './components/scene';
import createGeometries from './components/geometries';
import createCamera from './components/camera';
import createMaterials from './components/materials';
import createLights from './components/lights';

class World {
  #container: HTMLElement;

  #renderer;

  #slides: NodeListOf<HTMLElement> | null | undefined;

  #scenes: Array<Scene> = [];

  // 1. Create an instance of the World app
  constructor(container: HTMLElement, element: HTMLElement) {
    this.#container = container;
    this.#renderer = createRenderer();
    const listContainer: HTMLElement | null = element.querySelector('.carousel__items');
    this.#slides = listContainer?.querySelectorAll('.carousel__item');

    container.append(this.#renderer.domElement);
  }

  async init(): Promise<void> {
    const {
      box,
      sphere,
      dodecahedron,
      cylinder,
    } = createGeometries();

    this.#slides?.forEach((slide) => {
      const scene = createScene();
      const camera = createCamera();
      const { material } = createMaterials();
      const { ambientLight, mainLight } = createLights();
      let mesh;
      const { navType } = slide.dataset;

      switch (navType) {
        case 'slide-1':
          mesh = new Mesh(box, material);
          break;
        case 'slide-2':
          mesh = new Mesh(sphere, material);
          break;
        case 'slide-3':
          mesh = new Mesh(dodecahedron, material);
          break;
        case 'slide-4':
          mesh = new Mesh(cylinder, material);
          break;
        default:
          // silence
      }

      scene.userData.element = slide;
      scene.userData.camera = camera;
      scene.add(ambientLight, mainLight, mesh);

      this.#scenes.push(scene);
    });

    const resizer = new Resizer(this.#container, this.#scenes, this.#renderer);
  }

  // 2. Render the scene
  render(): void {
    console.log('render');
    this.#renderer.setClearColor(0xffffff);
    this.#renderer.setScissorTest(false);
    this.#renderer.clear();

    this.#renderer.setClearColor(0xe0e0e0);
    this.#renderer.setScissorTest(true);

    this.#scenes?.forEach((scene) => {
      // so something moves
      // eslint-disable-next-line no-param-reassign
      scene.children[0].rotation.y = Date.now() * 0.001;

      // get the element that is a place holder for where we want to
      // draw the scene
      const { element } = scene.userData;

      // get its position relative to the page's viewport
      const rect = element.getBoundingClientRect();

      // check if it's offscreen. If so skip it
      if (rect.bottom < 0 || rect.top > this.#renderer.domElement.clientHeight
        || rect.right < 0 || rect.left > this.#renderer.domElement.clientWidth) {
        return; // it's off screen
      }

      // set the viewport
      const width = rect.right - rect.left;
      const height = rect.bottom - rect.top;
      const { left } = rect;
      const bottom = this.#renderer.domElement.clientHeight - rect.bottom;

      this.#renderer.setViewport(left, bottom, width, height);
      this.#renderer.setScissor(left, bottom, width, height);

      const { camera } = scene.userData;

      // camera.aspect = width / height; // not changing in this example
      // camera.updateProjectionMatrix();

      // scene.userData.controls.update();

      this.#renderer.render(scene, camera);
    });
  }

  start(): void {
    // this.#loop.start();
    // this.render();
    // window.requestAnimationFrame(this.start);
  }

  stop(): void {
    // this.#loop.stop();
  }
}

export default World;
