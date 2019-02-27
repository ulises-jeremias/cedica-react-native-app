import React, {Component} from 'react'
import {
  Header,
  Right,
  Button,
  Icon,
  Text,
} from 'native-base'
import {
  ImageBackground,
} from 'react-native'

class Failed extends Component {
  render() {
    const {
      nextHandler,
    } = this.props

    return (
      <ImageBackground
        source={require('../../../assets/images/Festejos/failed.jpg')}
        style={{ width: '100%', height: '100%', backgroundColor: '#5E7890' }}
      >
        <Header transparent>
          <Right>
            <Button block warning onPress={nextHandler}>
              <Text>
                ¡Intenta otra vez!
              </Text>
              <Icon name='md-arrow-round-forward' />
            </Button>
          </Right>
        </Header>
      </ImageBackground>
    )
  }
}

export default Failed