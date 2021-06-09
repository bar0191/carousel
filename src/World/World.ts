import * as THREE from 'three';
import createRenderer from './systems/renderer';
import createScene from './components/scene';
import createGeometries from './components/geometries';
import createCamera from './components/camera';

class World {
  #renderer;

  #slidesOne: NodeList;

  #slidesTwo: NodeList;

  #slidesThree: NodeList;

  #slidesFour: NodeList;

  #scenes;

  // 1. Create an instance of the World app
  constructor(container: HTMLElement, element: HTMLElement) {
    this.#renderer = createRenderer();
    container.append(this.#renderer.domElement);

    const listContainer: HTMLElement = element.querySelector('.carousel__items');
    this.#slidesOne = listContainer.querySelectorAll("[data-nav-type='slide-1']");
    this.#slidesTwo = listContainer.querySelectorAll("[data-nav-type='slide-2']");
    this.#slidesThree = listContainer.querySelectorAll("[data-nav-type='slide-3']");
    this.#slidesFour = listContainer.querySelectorAll("[data-nav-type='slide-4']");
  }

  async init() {
    const { box, sphere, dodecahedron, cylinder } = createGeometries();

    this.#slidesOne.forEach((slide) => {
      const scene = createScene();
      const camera = createCamera();

      scene.userData.element = slide;
      scene.userData.camera = camera;
    });
  }

  // 2. Render the scene
  render() {
    // draw a single frame
    // this.#renderer.render(this.#scene, this.#camera);
  }

  start() {
    // this.#loop.start();
  }

  stop() {
    // this.#loop.stop();
  }
}

export default World;
