import { encode as complexEncode } from './complex'

export default function type ({ name, codes, tags, encode, decode, decodeComplex }) {
  return {
    name,
    codes,
    tags,
    encode,
    decode,
    decodeComplex,
  }
}

export function complexType ({ name, tags, encodeComplex, decodeComplex }) {
  return {
    name,
    tags,
    encode: complexEncode(encodeComplex),
    decodeComplex,
  }
}
