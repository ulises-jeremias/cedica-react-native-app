export function actionRequest(type, payload) {
  return {
    type,
    payload,
  }
}

export function actionFailure(type, error) {
  return {
    type,
    payload: error,
  }
}

export function actionSuccess(type, name, data) {
  if (!name) {
    return {
      type,
    }
  }

  return {
    type,
    payload: {
      name,
      data,
    },
  }
}
