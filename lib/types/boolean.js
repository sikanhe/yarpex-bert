import { boolean as create, atom } from 'yarpex'
import { complexType } from './type'

export function encodeComplex ({ value }) {
  return [value ? atom('true') : atom('false')]
}

export function decodeComplex ({ tag }) {
  return boolean(tag === 'true')
}

const boolean = complexType({
  name: 'boolean',
  tags: ['true', 'false'],
  encodeComplex,
  decodeComplex,
})

export default boolean
