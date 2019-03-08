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
          <Left style={{ textAlign: 'center' }}>
            <Icon name='remove' type='FontAwesome' style={{ color: 'red', fontSize: wp('5%') }} />
          </Left>
          <Text style={{ color: 'white', fontSize: wp('3.5%') }}>
            ¡La opción es incorrecta!
          </Text>
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
    marginTop: hp('5%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    height: hp('40%'),
    width: wp('55%'),
  },
  mainText: {
    fontSize: hp('14%'),
    marginTop: hp('19%'),
    textAlign: 'center',
    color: 'white',
  },
})

export default Failed