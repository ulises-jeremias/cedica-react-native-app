import Options from '../config/Options'

const {
  settings: {  
    miniGames,
    gameModes,
    viewModes,
    levels,
    sounds,
  }
} = Options

export default {
  error: '',
  isValid: false,
  isFetching: false,
  success: '',
  settings: {
    current: {
      viewModeCode: null,
      miniGameCode: null,

      levelCode: null,
      soundCode: null,

      gameModeCodes: [],
    },
    fields: {
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