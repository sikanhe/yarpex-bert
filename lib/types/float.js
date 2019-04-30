import { float as create } from 'yarpex'
import type from './type'
import codes from '../constants'

export function encode ({ type, value }) {
  let offset = 0
  const buffer = Buffer.alloc(9)

  offset = buffer.writeUInt8(codes.NewFloat, offset)
  offset = buffer.writeDoubleBE(value, offset)

  return buffer
}

export function decode ({ type, buffer, offset }) {
  return {
    value: create(buffer.readDoubleBE(offset)),
    offset: offset + 8,
  }
}

const float = type({
  name: 'float',
  codes: [codes.Float, codes.NewFloat],
  encode,
  decode,
})

export default float
