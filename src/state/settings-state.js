import Options from '../config/Options'

const {
  settings: {  
    miniGameOptions
  }
} = Options

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