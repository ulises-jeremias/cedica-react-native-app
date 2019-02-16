import _ from 'underscore'

export default function errorHandler(error) {
  if (_.isString(error))
    return error

  if (error.response && _.isString(error.response)) {
    return error.response
  }

  if (error.response && error.response.data && _.isString(error.response.data)) {
    return error.response.data
  }

  if (error.response && error.response.data && error.response.data.message &&
    _.isString(error.response.data.message)
  ) {
    return error.response.data.message
  }

  return _.isObject(error) ?
    error.toString() :
    'No se puede mostrar información sobre el error actual'
}
