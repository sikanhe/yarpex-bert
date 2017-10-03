import { atom as create } from 'yarpex'
import { equals, T, cond } from 'ramda'
import { encodeBinary, decodeBinary } from './binary'
import codes from '../constants'
import type from './type'

export function encode ({ value }) {
  if (value.length <= 255) {
    return encodeBinary({ value, code: codes.Utf8SmallAtom, sizeLen: 1, encoding: 'utf-8' })
  }

  return encodeBinary({ value, code: codes.Utf8Atom, sizeLen: 2, encoding: 'utf-8' })
}

export function decode ({ buffer, offset, code }) {
  return cond([
    [equals(codes.SmallAtom),     () => decodeBinary({ create, buffer, offset, sizeLen: 0, encoding: 'latin1' })],
    [equals(codes.Atom),          () => decodeBinary({ create, buffer, offset, sizeLen: 2, encoding: 'latin1' })],
    [equals(codes.Utf8SmallAtom), () => decodeBinary({ create, buffer, offset, sizeLen: 1, encoding: 'utf-8' })],
    [equals(codes.Utf8Atom),      () => decodeBinary({ create, buffer, offset, sizeLen: 2, encoding: 'utf-8' })],
    [T,                           () => { throw new Error('invalid atom type when decoding') }],
  ])(code)
}

const atom = type({
  name: 'atom',
  codes: [codes.Utf8SmallAtom, codes.Utf8Atom, codes.SmallAtom, codes.Atom],
  encode,
  decode,
})

export default atom

