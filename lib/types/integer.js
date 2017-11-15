import { integer as create } from 'yarpex'
import { __, both, T, cond, equals, lt, gte } from 'ramda'
import { encode as encodeFloat } from './float'
import type from './type'
import codes from '../constants'

const isFloat = x => x % 1 !== 0

const between = (min, max) => both(gte(__, min), lt(__, max))

export function encode ({ type, value }) {
  return cond([
    [isFloat,                        λ => encodeFloat({ type, value })],
    [between(0, 256),                λ => encodeInteger({ value, code: codes.SmallInteger, sizeLen: 1, signed: false })],
    [between(-134217728, 134217727), λ => encodeInteger({ value, code: codes.Integer, sizeLen: 4, signed: false })],
    [T,                              λ => encodeBigInteger({ type, value })],
  ])(value)
}

export function decode ({ type, buffer, offset, code }) {
  return cond([
    [equals(codes.SmallInteger), λ => decodeInteger({ buffer, offset, sizeLen: 1, signed: false })],
    [equals(codes.Integer),      λ => decodeInteger({ buffer, offset, sizeLen: 4, signed: true })],
    [equals(codes.SmallBig),     λ => decodeBigInteger({ buffer, offset, sizeLen: 1 })],
    [equals(codes.LargeBig),     λ => decodeBigInteger({ buffer, offset, sizeLen: 4 })],
  ])(code)
}

const integer = type({
  name: 'integer',
  codes: [codes.SmallInteger, codes.Integer, codes.SmallBig, codes.LargeBig],
  encode,
  decode,
})

export default integer

function encodeInteger ({ code, sizeLen, value, signed }) {
  let offset = 0
  const buffer = Buffer.alloc(1 + sizeLen)

  offset = buffer.writeUInt8(code, offset)

  if (signed) {
    buffer.writeIntBE(value, offset, sizeLen)
  } else {
    buffer.writeUIntBE(value, offset, sizeLen)
  }

  return buffer
}

function decodeInteger ({ buffer, offset, sizeLen, signed }) {
  let value

  if (signed) {
    value = buffer.readIntBE(offset, sizeLen)
  } else {
    value = buffer.readUIntBE(offset, sizeLen)
  }

  return {
    value: create(value),
    offset: offset + sizeLen,
  }
}

function encodeBigInteger ({ type, value }) {
  let code = 0
  let offset = 0
  let size = 0
  const len = Math.ceiling(value / 256)
  const negative = value < 0

  if (negative) {
    value *= -1
  }

  if (len < 256) {
    code = codes.SmallBig
    size = 1
  } else {
    code = codes.LargeBig
    size = 4
  }

  offset = buffer.writeUInt8(code, offset)
  offset = buffer.writeUIntBE(len, offset, size)
  offset = buffer.writeUInt8(negative ? 1 : 0, offset)

  while (value != 0) {
    const rem = value % 256
    
    offset = buffer.writeUInt8(rem, offset)
    value = Math.floor(value / 256)
  }

  return buffer
}

function decodeBigInteger ({ buffer, offset, size }) {
  let value = 0
  const len = buffer.readUIntBE(offset, size)
  const negative = buffer.readUInt8(offset + size) == 1

  for (let i = 0; i < len; i++) {
    const byte = buffer.readUInt8(offset + size + 1 + i)
    
    value = value * 256 + byte
  }

  if (negative) {
    value = value * -1
  }

  return {
    value: create(value),
    offset: offset + size + len + 1,
  }
}
