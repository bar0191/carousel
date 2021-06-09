/*
* Experimental Infinite Carousel
* Author: Brandon Reid
* * * * * * * * * * * * * * * * *
* the idea of this carousel is to translate it across a 3D plane, along the X axis
* it will duplicate the initial slides, and append them to each side of the original set
* this will provide the illusion of infinite scrolling, once the user reaches the duplicate
* version of the origin, onTranslateEnd we will jump back to the original origin
* */
import anime from 'animejs/lib/anime.es.js';
import normalizeWheel from 'normalize-wheel';
import getStyleVariables from './utils/getStyleVariables';

class Carousel {
  container: Element;

  list: Element | null;

  pos: number;

  index: number;

  threshold: number;

  dir: number; // -1, 0, 1

  slides: Array<Element>;

  sequence: number;

  speed: number;

  // eslint-disable-next-line
  cssVariables: any;

  prevX: number;

  prevY: number;

  distance: number;

  // eslint-disable-next-line
  timer: any;

  constructor(container: HTMLElement) {
    this.pos = 0;
    this.index = 0;
    this.threshold = 350;
    this.dir = 0;
    this.sequence = 0;
    this.distance = document.documentElement.clientWidth / 2;
    this.prevX = document.documentElement.clientWidth;
    this.prevY = document.documentElement.clientHeight;
    this.onResize = this.onResize.bind(this);
    this.updateCssVariables = this.updateCssVariables.bind(this);
    this.translateSlides = this.translateSlides.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.container = container;
    this.list = container.querySelector('.carousel__items');
  }

  initCssVariables(): void {
    const declaration: CSSRule = document.styleSheets[0].cssRules[0];
    this.cssVariables = getStyleVariables(declaration);

    this.updateCssVariables();
  }

  updateCssVariables(): void {
    Object.keys(this.cssVariables).forEach((k) => {
      document.documentElement.style
        .setProperty(k, `${this.cssVariables[k]}px`);
    });
  }

  translateSlides(): void {
    let pos = (this.distance * 4) * -1;

    this.slides.forEach((item, index) => {
      if (index === 0) {
        item.setAttribute('style', `transform: translateX(${pos}px);`);
      } else {
        pos += this.distance;
        item.setAttribute('style', `transform: translateX(${pos}px);`);
      }
    });
  }

  onResize(): void {
    const width = document.documentElement.clientWidth;
    const diff = (this.prevX - width) / 3;
    const panelSize = this.cssVariables['--home-panel-size-x'] - diff;
    this.prevX = width;
    this.distance = width / 2;
    this.cssVariables = {
      ...this.cssVariables,
      '--home-panel-size-x': panelSize,
      '--home-panel-size-x-half': panelSize / 2,
      '--home-panel-size-y': panelSize,
      '--home-panel-size-y-half': panelSize / 2,
    };

    Object.keys(this.cssVariables).forEach((k) => {
      document.documentElement.style
        .setProperty(k, `${this.cssVariables[k]}px`);
    });

    let pos = (this.distance * 4) * -1;

    this.slides.forEach((item, index) => {
      if (index !== 0) pos += this.distance;
      item.setAttribute('style', `transform: translateX(${pos}px);`);
    });
  }

  onMouseWheel(event: Event): void {
    const pos = (this.distance * 4) * -1;
    const normalized = normalizeWheel(event);
    const direction = Math.sign(normalized.pixelY);

    if (this.timer) clearTimeout(this.timer);

    if (this.pos === 0 && direction === -1) {
      this.list?.setAttribute('style', `transform: translateX(${pos}px);`);
      this.dir = direction;
      this.pos = pos + normalized.pixelY * -1;
      this.sequence += Math.abs(normalized.pixelY);
    } else if (this.dir !== direction) {
      this.dir = direction;
      this.sequence = 0;
      this.pos += normalized.pixelY * -1;
      this.sequence += Math.abs(normalized.pixelY);
    } else {
      this.dir = direction;
      this.pos += normalized.pixelY * -1;
      this.sequence += Math.abs(normalized.pixelY);
    }

    anime({
      targets: this.list,
      translateX: this.pos,
      duration: 200,
      easing: 'linear',
    });

    this.timer = setTimeout(() => {
      console.log(this);
      let duration = 200;
      const diff = this.distance - this.sequence;

      if (this.sequence >= this.threshold) {
        if (this.dir === -1) {
          this.pos += diff;
        } else {
          this.pos += (diff * -1);
        }
      } else if (this.dir === -1) {
        this.pos += (this.sequence * -1);
        duration = 400;
      } else {
        this.pos += this.sequence;
        duration = 400;
      }

      anime({
        targets: this.list,
        translateX: this.pos,
        duration,
        easing: 'linear',
        complete: () => {
          if (this.pos === pos) {
            this.pos = 0;
            this.list?.setAttribute('style', 'transform: translateX(0px);');
          }
          this.sequence = 0;
          console.log('animate complete');
        },
      });
    }, 200);

    console.log(normalized.pixelX, normalized.pixelY);
  }

  initListeners(): void {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousewheel', this.onMouseWheel);
  }

  // eslint-disable-next-line
  async init(): Promise<any> {
    this.list?.setAttribute('style', 'transform: translateX(0px);');
    const initialSlides: NodeListOf<Element> | undefined = this.list?.querySelectorAll('.carousel__item');

    let fullSet: Array<Element> = [];
    let tempSet: Array<Element> = [];

    initialSlides?.forEach((s) => tempSet.push(s.cloneNode(true)));
    fullSet = [...tempSet, ...initialSlides];
    this.list?.prepend(...tempSet);

    tempSet = [];
    initialSlides?.forEach((s) => tempSet.push(s.cloneNode(true)));
    fullSet = [...fullSet, ...tempSet];
    this.list?.append(...tempSet);

    this.slides = fullSet;

    this.initCssVariables();
    this.translateSlides();
    this.initListeners();
  }

  render(): void {
    console.log('render');
  }
}

export default Carousel;
