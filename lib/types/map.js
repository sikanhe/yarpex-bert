import { unwrap, map as create } from 'yarpex'
import { prop, map as rmap, pipe, either, when, fromPairs, toPairs, reduce } from 'ramda'
import type from './type'
import codes from '../constants'
import { decodeValue, encodeValue } from '../serialization'

export function encode ({ type, value }) {
  let offset = 0
  const header = Buffer.alloc(5)

  offset = header.writeUInt8(codes.Map, offset)
  offset = header.writeUInt32BE(value.length, offset)

  const items = reduce((acc, [k, v]) => {
    const key = encodeValue(k)
    const value = encodeValue(v)

    return acc.concat([key, value])
  }, [], value)

  return Buffer.concat([header, ...items])
}

export function decode ({ type, buffer, offset }) {
  const pairs = []
  const len = buffer.readUInt32BE(offset)

  offset += 4

  for (let i = 0; i < len; i++) {
    const { value: k, offset: keyOffset } = decodeValue({ buffer, offset })
    const { value: v, offset: valueOffset } = decodeValue({ buffer, offset: keyOffset })

    pairs.push([k, v])

    offset = valueOffset
  }

  return {
    offset,
    value: create(pairs),
  }
}

export function decodeComplex ({ value }) {
  return create(rmap(prop('value'), value[0].value))
}

const map = type({
  name: 'map',
  codes: [codes.Map],
  tags: ['dict'],
  encode,
  decode,
  decodeComplex,
})

export default map
