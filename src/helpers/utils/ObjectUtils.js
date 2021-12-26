class ObjectUtils {
  static filterObjectFields(target, source) {
    const copiedTarget = {};
    Object.entries(target).forEach(([key, value]) => {
      if (Object.hasOwnProperty.call(source, key)) {
        copiedTarget[key] = value;
      }
    });
    return copiedTarget;
  }

  static hideObjectFields(obj = {}, extractFields = []) {
    const copiedObj = { ...obj };
    extractFields.forEach((field) => {
      if (Object.hasOwnProperty.call(copiedObj, field)) {
        copiedObj[field] = "HIDDEN";
      }
    });
    return copiedObj;
  }
}

export default ObjectUtils;
