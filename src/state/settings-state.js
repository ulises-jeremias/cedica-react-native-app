export default {
  error: '',
  isValid: false,
  isFetching: false,
  success: '',
  settings: {
    current: {
      actualGameLevel: 1,
      lastWonGameLevel: 0,

      viewModeCode: null,
      miniGameInteractionCode: null,

      levelCode: null,
      soundCode: null,

      gameModeCodes: [],
    },
    fields: {
      actualGameLevel: 1,
      actualGameLevelErrorMsg: '',
      actualGameLevelHasError: false,

      lastWonGameLevel: 0,
      lastWonGameLevelErrorMsg: '',
      lastWonGameLevelHasError: false,

      viewModeCode: null,
      viewModeCodeErrorMsg: '',
      viewModeCodeHasError: false,

      miniGameInteractionCode: null,
      miniGameInteractionCodeErrorMsg: '',
      miniGameInteractionCodeHasError: false,

      levelCode: null,
      levelCodeErrorMsg: '',
      levelCodeHasError: false,

      soundCode: null,
      soundCodeErrorMsg: '',
      soundCodeHasError: false,

      gameModeCodes: [],
      gameModeCodesErrorMsg: '',
      gameModeCodesHasError: false,
    }
  }
}