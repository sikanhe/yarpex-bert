import { nil as create, atom } from 'yarpex'
import { complexType } from './type'

export function encode () {
  return [atom('nil')]
}

export function decodeComplex () {
  return create(null)
}

const nil = complexType({
  name: 'nil',
  tags: ['nil'],
  encode,
  decodeComplex,
})

export default nil
