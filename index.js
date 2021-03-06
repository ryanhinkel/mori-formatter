const {
  isCollection,
  isMap,
  isVector,
  isList,
  isSet,
  get,
  map,
  mapIndexed,
  intoArray,
  isEmpty,
} = require('mori')

const { getType } = require('./type')
const {
  headerStyles,
  bodyStyles,
  rowStyle,
  numberStyle,
  stringStyle,
  emptyStyle,
} = require('./styles')

const renderHeader = data => {
  const type = getType(data)
  const attrs = { style: headerStyles[type] }

  return {
    hashMap: ['div', attrs, '{hashmap...}'],
    vector: ['div', attrs, '[vector...]'],
    set: ['div', attrs, '#{set...}'],
    list: ['div', attrs, '(list...)'],
  }[type]
}

const renderBody = data => {
  const type = getType(data)
  const attrs = { style: bodyStyles[type] }

  if (isEmpty(data)) {
    return ['div', { style: bodyStyles[type] + emptyStyle }, 'empty']
  }

  if (type === 'hashMap') {
    const children = intoArray(map(kv => renderRow(get(kv, 0), get(kv, 1)), data))
    return ['div', attrs, ...children]
  } else if (type === 'vector') {
    const children = intoArray(mapIndexed((i, val) => renderRow(i, val), data))
    return ['span', attrs, ...children]
  } else if (type === 'set') {
    const children = intoArray(map(val => renderRow(val), data))
    return ['span', attrs, ...children]
  } else if (type === 'list') {
    const children = intoArray(map(val => renderRow(val), data))
    return ['span', attrs, ...children]
  }
}

const renderData = data => {
  if (typeof data === 'number') {
    return ['span', { style: numberStyle }, `${data}`]
  } else if (typeof data === 'string') {
    return ['span', { style: stringStyle }, `'${data}'`]
  } else {
    return ['object', { object: data }]
  }
}

const renderRow = (key, value) => {
  const row = ['div', { style: rowStyle }, renderData(key)]
  if (value !== undefined) {
    row.push(' ')
    row.push(renderData(value))
  }
  return row
}

const formatter = {
  header: data => {
    return isCollection(data) ? renderHeader(data) : null
  },

  hasBody: data => {
    return isMap(data) || isVector(data) || isSet(data) || isList(data)
  },

  body: renderBody,
}

module.exports = () => {
  if (window) {
  window.devtoolsFormatters = [formatter]
    console.log('Custom Formatters enabled')
  } else {
    console.warn("Custom formatters not available in this environment")
  }
}
