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
      viewModeCode: viewModes[0].code,
      miniGameCode: miniGames[0].code,

      levelCode: levels[0].code,
      soundCode: sounds[0].code,

      gameModeCodes: [
        gameModes[0].code,
      ],
    },
    fields: {
      viewModeCode: viewModes[0].code,
      viewModeCodeErrorMsg: '',
      viewModeCodeHasError: false,

      miniGameCode: miniGames[0].code,
      miniGameCodeErrorMsg: '',
      miniGameCodeHasError: false,

      levelCode: levels[0].code,
      levelCodeErrorMsg: '',
      levelCodeHasError: false,

      soundCode: sounds[0].code,
      soundCodeErrorMsg: '',
      soundCodeHasError: false,

      gameModeCodes: [
        gameModes[0].code,
      ],
      gameModeCodesErrorMsg: '',
      gameModeCodesHasError: false,
    }
  }
}