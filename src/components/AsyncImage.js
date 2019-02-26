/* @flow */

import React, { // eslint-disable-line no-unused-vars
  Component
} from 'react'

import {
  Image,
  View
} from 'react-native'
import { Spinner } from 'native-base';

/*
type Style = number | string | Object | Array<?Style>

type Props = {
  spinnerColor?: string,
  style: {
    width: number,
    height: number,
    [key: string]: Style
  },
  source: {
    uri: string
  }
}

type State = {
  loaded: bool
}
*/

export default class AsyncImage extends Component {
  constructor(props) {
    super(props)
    
    this.state = { loaded: false }
  }

  render() {
    const {
      spinnerColor,
      style,
      source
    } = this.props

    return (
      <View
        style={style}>

        <Image
          source={source}
          resizeMode={'contain'}
          style={[
            style,
            {
              position: 'absolute',
              resizeMode: 'contain'
            }
          ]}
          onLoad={this._onLoad} />

        {!this.state.loaded &&
          <Spinner
            color={spinnerColor || '#FFF'}
            style={[
              style,
              {
                position: 'absolute'
              }
            ]} />
        }

      </View>
    )
  }

  _onLoad = () => {
    this.setState(() => ({ loaded: true }))
  }
}