import { isNil } from 'ramda'
import { wrap, unwrap } from 'yarpex'
import codes from './constants'
import { typesByName, typesByCode, typesByTag } from './types'
import init from './types/initializer'

export function encode (value) {
  const wrapped = wrap(value)
  const header = Buffer.from([codes.Start])
  const encoded = encodeValue(wrapped)

  return Buffer.concat([header, encoded])
}

export function decode (data, encoding) {
  const buffer = Buffer.from(data, encoding)
  const start = buffer.readUInt8(0)

  if (start != codes.Start) {
    throw new Error('malformed bert value')
  }

  const { value, offset } = decodeValue({
    buffer,
    offset: 1,
  })

  if (offset != data.length) {
    throw new Error('malformed bert value')
  }

  return unwrap(value)
}

export function encodeValue({ type: valueType, value }) {
  const type = typesByName[valueType.name]

  if (isNil(type)) {
    throw new Error('value cannot be encoded')
  }

  return type.encode({
    type,
    valueType,
    value,
  })
}

export function decodeValue({ buffer, offset }) {
  const code = buffer.readUInt8(offset)
  const type = typesByCode[code]

  if (isNil(type)) {
    throw new Error('unsupported type ' + code)
  }

  return type.decode({
    type,
    buffer,
    code,

    offset: offset + 1,
  })
}

init()

