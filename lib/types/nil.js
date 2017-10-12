import { nil as create, atom } from 'yarpex'
import { complexType } from './type'

export function encodeComplex () {
  return [atom('nil')]
}

export function decodeComplex () {
  return create(null)
}

const nil = complexType({
  name: 'nil',
  tags: ['nil'],
  encodeComplex,
  decodeComplex,
})

export default nil
