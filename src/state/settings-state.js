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

      gameModeCode: [
        gameModes[0].code,
      ],
    },
    fields: {
      viewModeCode: viewModes[0].code,
      miniGameCode: miniGames[0].code,

      levelCode: levels[0].code,
      soundCode: sounds[0].code,

      gameModeCode: [
        gameModes[0].code,
      ],
    }
  }
}