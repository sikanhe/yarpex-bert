import { forEach } from 'ramda'

export const typesByCode = {}
export const typesByName = {}
export const typesByTag = {}

export function registerType (type) {
  typesByName[type.name] = type

  if (type.codes) {
    forEach(x => typesByCode[x] = type, type.codes)
  }

  if (type.tags) {
    forEach(x => typesByTag[x] = type, type.tags)
  }
}
