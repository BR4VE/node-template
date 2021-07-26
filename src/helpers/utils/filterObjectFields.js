export default function filterObjectFields(target, source) {
  const copiedTarget = {};
  Object.entries(target).forEach(([key, value]) => {
    if (Object.hasOwnProperty.call(source, key)) {
      copiedTarget[key] = value;
    }
  });
  return copiedTarget;
}
