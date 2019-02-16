import {
  settings
} from '../config/Options'

const {
  miniGameOptions
} = settings

export default {
  error: '',
  isValid: false,
  isFetching: false,
  success: '',
  settings: {
    current: {
      
    },
    fields: {
      miniGameCode: miniGameOptions[0].code
    }
  }
}