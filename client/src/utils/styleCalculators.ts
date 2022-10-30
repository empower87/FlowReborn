export const calculateButtonSize = (_height: number, _width: number, _offset: number): number[] => {
  let height = 0
  let width = 0
  if (_height <= _width) {
    height = _height - _offset
    width = _height - _offset
  } else {
    height = _width - _offset
    width = _width - _offset
  }
  return [height, width]
}

export const fourDigitNumberHandler = (digits: number): string => {
  if (digits >= 1000000) {
    const tenths = digits / 1000000
    const decimalTenths = Math.round(tenths * 10) / 10
    return `${decimalTenths}m`
  } else if (digits >= 1000) {
    const tenths = Math.floor(digits / 1000)
    return `${tenths}k`
  } else {
    return `${digits}`
  }
}
