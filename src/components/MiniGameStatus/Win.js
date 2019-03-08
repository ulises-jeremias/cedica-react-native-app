import React, {Component} from 'react'
import {
  Button,
  Header,
  Icon,
  Left,
  Right,
} from 'native-base'
import {
  ImageBackground,
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import Cup from '../Success/Cup'

class Win extends Component {
  render() {
    const {
      handleBackClick,
      handleWin,
    } = this.props

    return (
      <ImageBackground
        source={require('../../../assets/images/Festejos/lose.png')}
        style={{ width: '100%', height: '100%', backgroundColor: '#5E7890' }}
      >
        <Header transparent>
          <Left>
            <Button info onPress={handleBackClick}>
              <Icon name='md-home' />
            </Button>
          </Left>
          <Right>
            <Button warning onPress={handleWin}>
              <Icon name='md-arrow-round-forward' />
            </Button>
          </Right>
        </Header>
        <Cup
          style={{
            width: wp('80%'),
            height: hp('80%'),
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </ImageBackground>
    )
  }
}

export default Win