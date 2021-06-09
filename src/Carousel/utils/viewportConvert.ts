import { round } from './index';

function viewportConvert(
  px = 0,
  vw = 0,
  vh = 0,
  rem = 0,
): number | Array<number> {
  if (px !== 0) {
    if (vw) return round(((100 * px) / window.innerWidth));
    if (rem) return px * 0.06;
    return round(((100 * px) / window.innerHeight));
  }

  if (vw !== 0 && vh !== 0) {
    const whArray: Array<number> = [];
    whArray[0] = round(Math.ceil(((window.innerWidth * vw) / 100)));
    whArray[1] = round(Math.ceil(((window.innerHeight * vh) / 100)));
    return whArray;
  }

  if (vw !== 0) {
    return round(Math.ceil(((window.innerWidth * vw) / 100)));
  }

  if (vh !== 0) {
    return round(Math.ceil(((window.innerHeight * vh) / 100)));
  }

  if (rem !== 0) {
    return round(rem * parseFloat(getComputedStyle(document.documentElement).fontSize));
  }

  return -1;
}

export default viewportConvert;
