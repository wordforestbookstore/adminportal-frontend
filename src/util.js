const hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

export {
  hasOwn
};