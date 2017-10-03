import { list as create } from 'yarpex'
import { reduce, isNil } from 'ramda'
import type from './type'
import codes from '../constants'
import { encodeValue, decodeValue } from '../serialization'

export function encodeList ({ code, value, sizeLen, tail }) {
  let offset
  const header = Buffer.alloc(1 + sizeLen)

  offset = header.writeUInt8(code, offset)
  offset = header.writeUIntBE(value.length, offset, sizeLen)

  const items = reduce((acc, item) => {
    const value = encodeValue(item)

    return acc.concat([value])
  }, [], value)

  if (isNil(tail)) {
    return Buffer.concat([header, ...items])
  } else {
    return Buffer.concat([header, ...items, Buffer.from(tail)])
  }
}

export function decodeList ({ create, type, buffer, startOffset, sizeLen, hasTail }) {
  let offset = startOffset
  const items = []
  const len = buffer.readUIntBE(offset, sizeLen)

  offset += sizeLen

  for (let i = 0; i < len; i++) {
    const { value: k, offset: nextOffset } = decodeValue({ buffer, offset })

    items.push(k)

    offset = nextOffset
  }

  if (hasTail) {
    const { offset: nextOffset } = decodeValue({ buffer, offset })
    
    offset = nextOffset
  }

  return {
    offset,

    value: create(items),
  }
}

export function encode ({ value }) {
  return encodeList({
    code: codes.List,
    value,
    sizeLen: 4,
    tail: [codes.Nil],
  })
}

export function decode ({ code, buffer, offset }) {
  if (code === codes.Nil) {
    return {
      offset,
      value: [],
    }
  }

  return decodeList({
    create,
    type,
    buffer,
    offset,
    sizeLen: 4,
    hasTail: true,
  })
}

const list = type({
  name: 'list',
  codes: [codes.List, codes.Nil],
  encode,
  decode,
})

export default list

