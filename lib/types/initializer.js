import { forEach } from 'ramda'
import { registerType } from './index'
import map from './map'
import list from './list'
import tuple from './tuple'
import atom from './atom'
import integer from './integer'
import float from './float'
import binary from './binary'
import charlist from './charlist'
import regex from './regex'
import time from './time'
import nil from './nil'

export default function init () {
  const types = [
    map,
    list,
    tuple,
    atom,
    integer,
    charlist,
    float,
    binary,
    regex,
    time,
    nil,
  ]

  forEach(registerType, types)
}
