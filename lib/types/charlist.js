import { charlist as create } from 'yarpex'
import { equals, T, cond } from 'ramda'
import { encodeBinary, decodeBinary } from './binary'
import codes from '../constants'
import type, { typeEq } from './type'

export function encode ({ type, value }) {
  return encodeBinary({ value, code: codes.String, sizeLen: 2, encoding: 'utf-8' })
}

export function decode ({ type, buffer, offset, code }) {
  return decodeBinary({ create, buffer, offset, sizeLen: 2, encoding: 'utf-8' })
}

const charlist = type({
  name: 'charlist',
  codes: [codes.String],
  encode,
  decode,
})

export default charlist

