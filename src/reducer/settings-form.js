import formValidation from '../helpers/form-validation'

export default function settingsFormValidation(context, state, action) {
  void action, context

  const isValid = formValidation(state[context])

  return {
    ...state,
    [context]: {
      ...state[context],
      isValid,
    }
  }
}