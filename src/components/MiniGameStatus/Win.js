import React, {Component} from 'react'
import {
  Content,
  Button,
  Header,
  Icon,
  Left,
  Right,
} from 'native-base'
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
      <Content style={{ backgroundColor: '#5E7890' }}>
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
      </Content>
    )
  }
}

export default Win