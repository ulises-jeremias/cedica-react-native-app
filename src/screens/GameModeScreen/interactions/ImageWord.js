import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
// import { Audio } from 'expo'
import {
  Col,
  Grid,
  Row,
} from 'react-native-easy-grid'
import {
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import {
  Button,
  Content,
  Text,
  View,
} from 'native-base'

import settingsActions from '../../../actions/settings-actions'
import { horses, getImage, getBreed, getFur, getSound } from '../../../config/Horses'

function mapStateToProps(state) {
  const {
    settings
  } = state

  return {
    settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...settingsActions,
    }, dispatch),
  }
}

class WordImageInteractionModeScreen extends Component {
  onPlayPress(elem) {
    const {
      config: {
        soundCode,
      }
    } = this.props

    return () => {
      try {
        (async () => {
          // const soundObject = new Audio.Sound()
          const soundObject = {
            loadAsync: () => {},
            playAsync: () => {}
          }
          
          await soundObject.loadAsync(getSound(elem, soundCode))
          await soundObject.playAsync()
        })()
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  render() {
    const {
      onSuccess,
      onFailed,
      config: {
        levelCode,
      }
    } = this.props

    const samples = levelCode === 'levels#0' ? 2 : 4

    const selectedHorses = _.sample(horses, samples)
    const horseIndex = Math.floor(Math.random() * (samples - 1))

    const option = Math.floor(Math.random() * 3)

    const options = [
      {
        text: horse => getBreed(horse),
        cmp: horse => getBreed(selectedHorses[horseIndex]) === getBreed(horse),
      },
      {
        text: horse => getFur(horse),
        cmp: horse => getFur(selectedHorses[horseIndex]) === getFur(horse),
      },
      {
        text: horse => `${getBreed(horse)} - ${getFur(horse)}`,
        cmp: horse => getFur(selectedHorses[horseIndex]) === getFur(horse) && getBreed(selectedHorses[horseIndex]) === getBreed(horse),
      },
    ]

    const selectedOption = options[option]

    return (
      <Content style={styles.container}>
        <Grid style={{ marginTop: hp('4%') }}>
          <Row style={{ textAlign: 'center', alignSelf: 'center' }}>
            <Col style={styles.main}>
              <Image
                style={styles.mainImage}
                source={getImage(selectedHorses[horseIndex])}
              />
            </Col>
          </Row>
          <Row style={{ marginVertical: hp('4%') }}>
            {selectedHorses.map((horse, i) => (
              <Col key={`options-${i+1}`} style={{ padding: 5 }}>
                <View>
                  <Text
                    style={styles.mainText}
                    onPress={selectedOption.cmp(horse) ? onSuccess : onFailed}
                  >
                    { selectedOption.text(horse) }
                  </Text>
                  <Button
                    transparent
                    onPress={this.onPlayPress(horse)}
                    style={styles.playSoundButton}
                  >
                    <Image
                      source={require('../../../../assets/images/UI/audio_click.png')}
                      style={styles.playSound}
                    />
                  </Button>
                </View>
              </Col>
            ))}
          </Row>
        </Grid>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3bc32',
  },
  main: {
    resizeMode: 'contain',
    alignSelf: 'center',
    textAlign: 'center',
  },
  mainImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: hp('45%'),
    width: wp('55%'),
  },
  mainText: {
    fontSize: hp('5%'),
    textAlign: 'center',
    color: 'white',
  },
  optionButton: {
    alignSelf: 'center',
    marginTop: hp('6%'),
  },
  playSoundButton: {
    alignSelf: 'center',
  },
  playSound: {
    height: hp('6%'),
    width: wp('6%'),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(WordImageInteractionModeScreen)