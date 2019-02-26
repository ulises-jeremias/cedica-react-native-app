import React, {Component} from 'react'
import {
  Container,
  Header,
  Right,
  Button,
  Icon,
} from 'native-base'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import Confetti from '../Success/Confetti'

class Success extends Component {
  render() {
    const {
      nextHandler,
    } = this.props

    return (
      <Container style={{ backgroundColor: 'black' }}>
        <Header transparent>
          <Right>
            <Button block warning onPress={nextHandler}>
              <Icon name='md-arrow-round-forward' />
            </Button>
          </Right>
        </Header>
        <Confetti
          style={{
            height: hp('100%'),
            width: wp('100%'),
            resizeMode: 'cover',
            alignSelf: 'center',
          }} 
        />
      </Container>
    )
  }
}

export default Success