import React, { Component } from 'react'
import { Image } from 'react-native'

import { confetti } from '../../config/Success'

class Success extends Component {
  render() {
    return <Image {...this.props} source={confetti} />
  }
}

export default Success