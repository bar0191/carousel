import './styles/main.scss';
import Carousel from './Carousel/Carousel';
import World from './World/World';

function animate(world): void {
  world.render();
  requestAnimationFrame(animate);
}

// create the main function
async function main() {
  // Get a reference to the container element
  const container: HTMLElement = document.querySelector('.carousel');
  const canvas: HTMLElement = document.querySelector('#scene-container');

  if (container) {
    const carousel = new Carousel(container);

    await carousel.init();

    const world = new World(canvas, container);

    await world.init();

    animate(world);
  }
}

main().catch((err) => {
  console.error(err);
});
