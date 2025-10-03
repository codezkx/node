const isArray = Array.isArray

const realArray = (values) => {
  if (!isArray(values)) {
    return false
  }
  return values.length > 0
}

export default {
    realArray
}