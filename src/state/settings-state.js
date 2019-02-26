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
      actualGameLevel: 0,

      viewModeCode: null,
      miniGameCode: null,

      levelCode: null,
      soundCode: null,

      gameModeCodes: [],
    },
    fields: {
      actualGameLevel: 0,
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