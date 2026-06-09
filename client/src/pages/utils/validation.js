export function required(value) {
  return value != null && value !== ''
}

export function isEmail(value) {
  return /\S+@\S+\.\S+/.test(value)
}
