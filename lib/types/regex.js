import { complexType } from './type'

export function encodeComplex (type, value) {
  return []
}

export function decodeComplex (type, items) {
  return null
}

const regex = complexType({
  name: 'regex',
  tag: ['regex'],
  encodeComplex,
  decodeComplex,
})

export default regex
