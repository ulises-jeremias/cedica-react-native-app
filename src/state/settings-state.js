export default {
  error: '',
  isValid: false,
  isFetching: false,
  success: '',
  settings: {
    current: {
      gamesWon: 0,

      actualGameLevel: 1,

      viewModeCode: null,
      miniGameCode: null,

      levelCode: null,
      soundCode: null,

      gameModeCodes: [],
    },
    fields: {
      gamesWon: 0,
      gamesWonErrorMsg: '',
      gamesWonHasError: false,

      actualGameLevel: 1,
      actualGameLevelErrorMsg: '',
      actualGameLevelHasError: false,

      viewModeCode: null,
      viewModeCodeErrorMsg: '',
      viewModeCodeHasError: false,

      miniGameCode: null,
      miniGameCodeErrorMsg: '',
      miniGameCodeHasError: false,

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