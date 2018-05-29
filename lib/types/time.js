import { time as create, atom, integer } from 'yarpex'
import { complexType, typeEq } from './type'

export function encodeComplex ({ type, value }) {
  const ms = value.getTime()
  const micro = Math.floor(ms % 1000 * 1000)
  const second = Math.floor(ms % 1000000000 / 1000)
  const mega = Math.floor(ms / 1000000000)

  return [atom('time'), integer(mega), integer(second), integer(micro)]
}

export function decodeComplex ({ type, items }) {
  const mega = items[0].value
  const s = items[1].value
  const mili = items[2].value
  const ms = mega * 10000000000 + s * 1000 + mili / 1000

  return time(new Date(ms))
}

const time = complexType({
  name: 'time',
  tags: ['time'],
  encodeComplex,
  decodeComplex,
})

export default time
