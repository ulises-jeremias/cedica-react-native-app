import React, { Component } from 'react'
import { Image } from 'react-native'

import { cup } from '../../config/Success'

class Success extends Component {
  render() {
    return <Image {...this.props} source={cup} />
  }
}

export default Success