import { integer as create } from 'yarpex'
import { __, both, T, cond, equals, lte, gte } from 'ramda'
import { encode as encodeFloat } from './float'
import type from './type'
import codes from '../constants'

const isFloat = x => x % 1 !== 0

const between = (min, max) => both(gte(__, min), lte(__, max))

export function encode ({ type, value }) {
  return cond([
    [isFloat,                          λ => encodeFloat({ type, value })],
    [between(0, 255),                  λ => encodeInteger({ value, code: codes.SmallInteger, sizeLen: 1, signed: false })],
    [between(-2147483648, 2147483647), λ => encodeInteger({ value, code: codes.Integer, sizeLen: 4, signed: true })],
    [T,                                λ => encodeBigInteger({ type, value })],
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
  let offset = 0
  let bignum = Math.abs(value)
  const negative = value < 0

  const buffer = Buffer.alloc(9)
  offset = buffer.writeUInt8(codes.SmallBig, offset)
  offset = buffer.writeUInt8(6, offset)
  offset = buffer.writeUInt8(negative ? 1 : 0, offset)
  offset = buffer.writeUIntLE(bignum, offset, 6)

  return buffer
}

function decodeBigInteger ({ buffer, offset, sizeLen }) {
  let value = 0
  const len = buffer.readUIntBE(offset, sizeLen)
  const negative = buffer.readUInt8(offset + sizeLen) == 1

  for (let i = len - 1; i >= 0; i--) {
    const byte = buffer.readUInt8(offset + sizeLen + 1 + i)
    
    value = value * 256 + byte
  }

  if (negative) {
    value = value * -1
  }

  return {
    value: create(value),
    offset: offset + sizeLen + len + 1,
  }
}
