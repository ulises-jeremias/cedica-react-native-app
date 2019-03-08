import React, {Component} from 'react'
import {
  Header,
  Left,
  Right,
  Button,
  Text,
  Icon,
} from 'native-base'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {
  StyleSheet,
  ImageBackground,
} from 'react-native'

import AsyncImage from '../AsyncImage'

class Failed extends Component {
  render() {
    const {
      nextHandler,
      selectedOption,
      config: {
        miniGameInteractionCode,
      }
    } = this.props

    return (
      <ImageBackground
        source={require('../../../assets/images/Festejos/failed.png')}
        style={{ width: '100%', height: '100%', backgroundColor: 'green' }}
      >
        <Header transparent>
          <Left>
            <Text style={{ color: 'white' }}>
              ¡La opción es incorrecta!
            </Text>
          </Left>
          <Right>
            <Button block warning onPress={nextHandler}>
              <Icon name='md-arrow-round-forward' />
            </Button>
          </Right>
        </Header>
        {miniGameInteractionCode === 'miniGameInteractions#0' ? (
          <Text
            style={styles.mainText}
          >
            { selectedOption }
          </Text>
        ) : (
          <AsyncImage
            source={selectedOption}
            style={styles.mainImage}
          />
        )}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  mainImage: {
    marginTop: hp('0.25%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    height: hp('52%'),
    width: wp('62%'),
  },
  mainText: {
    marginTop: hp('2%'),
    fontSize: hp('15%'),
    marginTop: hp('15%'),
    textAlign: 'center',
    color: 'white',
  },
})

export default Failed