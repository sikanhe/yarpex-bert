import { complexType } from './type'

export function encode (type, value) {
  return []
}

export function decode (type, items) {
  return null
}

const regex = complexType({
  name: 'regex',
  tag: ['regex'],
  encode,
  decode,
})

export default regex
