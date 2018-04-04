import { time as create, atom } from 'yarpex'
import { complexType, typeEq } from './type'

export function encodeComplex ({ type, value }) {
  const ms = value.getTime()
  const mega = Math.floor(ms / 1000000000)
  const s = Math.floor(ms % 10000000000 / 1000)
  const mili = Math.floor((ms - s * 1000) * 1000)

  return [atom('time'), integer(mega), integer(s), integer(mili)]
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
