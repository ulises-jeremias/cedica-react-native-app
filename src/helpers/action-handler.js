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
  form: {
    ...state.form,
    [module]: {
      ...state.form[module],
      isFetching: true,
      error: null,
    }
  }
})

export const formSuccessHandler = module => (state) => ({
  ...state,
  form: {
    ...state.form,
    [module]: {
      ...state.form[module],
      isValid: false,
      isFetching: false,
      success: true,
      error: null,
    }
  }
})

export const formFailureHandler = module => (state, { payload }) => ({
  ...state,
  form: {
    ...state.form,
    [module]: {
      ...state.form[module],
      isFetching: false,
      error: payload,
      success: null,
    }
  }
})