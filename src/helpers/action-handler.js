export const requestHandler = module => state => ({
  ...state,
  [module]: {
    ...state[module],
    isFetching: true,
    error: null,
  }
})

export const successHandler = module => (state, { payload: { name, data } }) => ({
  ...state,
  [module]: {
    ...state[module],
    isValid: false,
    isFetching: false,
    error: null,
    [name]: data
  }
})

export const failureHandler = module => (state, { payload }) => ({
  ...state,
  [module]: {
    ...state[module],
    isFetching: false,
    error: payload,
    success: null,
  }
})

export const formRequestHandler = module => state => ({
  ...state,
  [module]: {
    ...state[module],
    isFetching: true,
    error: null,
  }
})

export const formSuccessHandler = module => (state, { payload: { data } }) => ({
  ...state,
  [module]: {
    ...state[module],
    isValid: false,
    isFetching: false,
    success: true,
    error: null,
    fields: {
      ...state[module].fields,
      ...data,
    },
    current: {
      ...state[module].current,
      ...data,
    }
  }
})

export const formFailureHandler = module => (state, { payload }) => ({
  ...state,
  [module]: {
    ...state[module],
    isFetching: false,
    error: payload,
    success: null,
  }
})