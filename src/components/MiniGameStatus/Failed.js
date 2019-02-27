import React, {Component} from 'react'
import {
  Container,
  Header,
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
      <Container style={{ backgroundColor: 'red' }}>
        <Header transparent>
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
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  mainImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: hp('50%'),
    width: wp('55%'),
  },
  mainText: {
    fontSize: hp('15%'),
    marginTop: hp('15%'),
    textAlign: 'center',
    color: 'white',
  },
})

export default Failed