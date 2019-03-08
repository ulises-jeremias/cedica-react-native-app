import React, {Component} from 'react'
import {
  Header,
  Right,
  Button,
  Icon,
  Text,
  Left,
} from 'native-base'
import {
  ImageBackground,
} from 'react-native'

class Lose extends Component {
  render() {
    const {
      nextHandler,
      handleBackClick,
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
            <Button block warning onPress={nextHandler}>
              <Text>
                ¡Juega otra vez!
              </Text>
              <Icon name='md-arrow-round-forward' />
            </Button>
          </Right>
        </Header>
      </ImageBackground>
    )
  }
}

export default Lose