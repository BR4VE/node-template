// Maybe restucture the folder?
// this file could be under helpers/objects?

export default function hideObjectFields(obj = {}, extractFields = []) {
  const copiedObj = { ...obj };
  extractFields.forEach((field) => {
    if (Object.hasOwnProperty.call(copiedObj, field)) {
      copiedObj[field] = "HIDDEN";
    }
  });
  return copiedObj;
}
