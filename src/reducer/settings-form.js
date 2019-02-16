import _ from 'underscore'
import formValidation from '../helpers/form-validation'

export default function licensesFormValidation(context, state, action) {
  const {
    form,
  } = state

  void action, form, context, _

  const isValid = formValidation(form[context])

  return {
    ...state,
    form: {
      ...state.form,
      [context]: {
        ...state.form[context],
        isValid,
      }
    }
  }
}