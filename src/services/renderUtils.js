export default function createMyElement(attributes) {
  const inputElem = document.createElement("input");
  for (let key in attributes) {
    if (Object.prototype.hasOwnProperty.call(
        attributes,
        key
      )
    ) {
      inputElem.setAttribute(key, attributes[key]);
    }
  }
  return inputElem;
}