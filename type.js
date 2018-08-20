import { isCollection, isMap, isVector, isSet, isList } from 'mori'

export const getType = data => {
  if (isCollection(data)) {
    if (isMap(data)) {
      return 'hashMap'
    } else if (isVector(data)) {
      return 'vector'
    } else if (isSet(data)) {
      return 'set'
    } else if (isList(data)) {
      return 'list'
    } else {
      return 'unknown'
    }
  } else {
    if (typeof data === 'string' || data instanceof String) {
      return 'string'
    } else if (typeof data === 'number') {
      return 'number'
    } else if (data instanceof Array) {
      return 'array'
    } else {
      return 'object'
    }
  }
}
