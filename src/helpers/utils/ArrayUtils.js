class ArrayUtils {
  static contains(target, source) {
    const sourceMap = {};
    source.forEach((element) => {
      sourceMap[element.toString()] = true;
    });

    return target.every((targetElement) => sourceMap[targetElement.toString()]);
  }

  static getKeys(target, key) {
    return target.reduce((keys, element) => [...keys, element?.[key]], []);
  }

  static groupify(arrayOfObjects, key) {
    const map = {};

    arrayOfObjects.forEach((object) => {
      if (!object[key]) {
        return;
      }

      const value = String(object[key]);
      if (!map[value]) {
        map[value] = [];
      }
      map[value].push(object);
    });

    return map;
  }

  static mapify(arrayOfObjects, key) {
    const map = {};
    arrayOfObjects.forEach((object) => {
      const value = object[key];
      if (!value) {
        return;
      }
      map[value] = object;
    });
    return map;
  }
}

export default ArrayUtils;
