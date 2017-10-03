import { tuple as create } from 'yarpex'
import { T, cond, equals } from 'ramda'
import { encodeList, decodeList } from './list'
import codes from '../constants'
import { decode as decodeComplex } from './complex'
import type from './type'

export function encode ({ type, value }) {
  if (value.length < 256) {
    return encodeList({
      value,
      code: codes.SmallTuple,
      sizeLen: 1,
    })
  } else {
    return encodeList({
      value,
      code: codes.LargeTuple,
      sizeLen: 4,
    })
  }
}

export function decode ({ type, buffer, offset, code }) {
  const { offset: nextOffset, value } = decodeCore({ create, type, buffer, offset, code })

  if (value.value[0].type.name === 'atom' && value.value[0].value === 'bert') {
    return {
      offset: nextOffset,
      value: decodeComplex(value.value),
    }
  }

  return {
    offset: nextOffset,
    value,
  }
}

export function decodeCore ({ create, type, buffer, offset, code }) {
  return cond([
    [equals(codes.SmallTuple), λ => decodeList({ create, buffer, offset, type, sizeLen: 1, hasTail: false})],
    [equals(codes.LargeTuple), λ => decodeList({ create, buffer, offset, type, sizeLen: 4, hasTail: false})],
    [T,                        λ => { throw new Error('invalid atom type when decoding') }]
  ])(code)
}

const tuple = type({
  name: 'tuple',
  codes: [codes.SmallTuple, codes.LargeTuple],
  encode,
  decode,
})

export default tuple
