import React, { Component } from 'react'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import {
  Image,
} from 'react-native'

import {
  cupImages
} from '../../config/Success'

class Success extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cupImages,
    }
  }

  componentDidMount() {
    const {
      cupImages,
    } = this.state

    this.setInterval(() => {
      this.setState(() => ({
        cupImages: cupImages.slice(0),
      }))
    }, 100)
  }

  render() {
    const {
      cupImages,
    } = this.state

    if (cupImages.length <= 0) {
      return null
    }

    return <Image source={cupImages[0]} />
  }
}

reactMixin(Success.prototype, TimerMixin)

export default Success