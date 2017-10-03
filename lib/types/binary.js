import { binary as create } from 'yarpex'
import { either, is } from 'ramda'
import type from './type'
import codes from '../constants'

export function encode ({ type, value }) {
  return encodeBinary({
    value,

    code: codes.Binary,
    sizeLen: 4,
    encoding: 'utf-8',
  })
}

export function decode ({ type, buffer, offset, code }) {
  return decodeBinary({
    create,
    buffer,
    offset,
    type,
  
    sizeLen: 4,
    encoding: 'utf-8',
  })
}

export function encodeBinary ({ code, sizeLen, value, encoding }) {
  let offset = 0
  const byteLen = Buffer.byteLength(value, encoding)
  const buffer = Buffer.alloc(1 + sizeLen + byteLen)

  offset = buffer.writeUInt8(code, offset)
  offset = buffer.writeUIntBE(byteLen, offset, sizeLen)
  offset = buffer.write(value, offset, byteLen, encoding)

  return buffer
}

export function decodeBinary ({ create, buffer, offset, sizeLen, type, encoding }) {
  const len = buffer.readUIntBE(offset, sizeLen)
  const end = offset + sizeLen + len
  const value = buffer.toString(encoding, offset + sizeLen, end)

  return {
    value: create(value),
    offset: end,
  }
}

const binary = type({
  name: 'binary',
  codes: [codes.Binary],
  encode,
  decode,
})

export default binary
