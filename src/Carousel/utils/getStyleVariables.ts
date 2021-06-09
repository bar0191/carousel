import viewportConvert from './viewportConvert';

// eslint-disable-next-line
function getStyleVariables(declaration: CSSRule): any {
  const allVar = declaration.style.cssText.split(';');

  // eslint-disable-next-line
  const result: any = {};

  allVar.forEach((v: string) => {
    const valueSet = v.split(':');

    if (valueSet[0]) {
      const key = valueSet[0].trim();
      const value = valueSet[1].trim();
      let converted;

      if (value.includes('px')) {
        converted = parseFloat(value);
      } else if (value.includes('vw')) {
        converted = viewportConvert(0, parseFloat(value), 0, 0);
      } else if (value.includes('vh')) {
        converted = viewportConvert(0, 0, parseFloat(value), 0);
      } else if (value.includes('rem')) {
        converted = viewportConvert(0, 0, 0, parseFloat(value));
      }

      result[key] = converted;
    }
  });

  return result;
}

export default getStyleVariables;
