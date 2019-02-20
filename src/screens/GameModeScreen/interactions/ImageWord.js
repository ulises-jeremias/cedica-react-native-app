import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import { Audio } from 'expo'
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
          const soundObject = new Audio.Sound()
          
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

    const selectedHorses = _.sample(_.shuffle(horses), samples)
    const horseIndex = Math.floor(Math.random() * (samples - 1))

    const option = Math.floor(Math.random() * 3)

    const options = [
      {
        text: getBreed(selectedHorses[horseIndex]),
        cmp: horse => getBreed(selectedHorses[horseIndex]) === getBreed(horse),
      },
      {
        text: getFur(selectedHorses[horseIndex]),
        cmp: horse => getFur(selectedHorses[horseIndex]) === getFur(horse),
      },
      {
        text: `${getBreed(selectedHorses[horseIndex])} - ${getFur(selectedHorses[horseIndex])}`,
        cmp: horse => getFur(selectedHorses[horseIndex]) === getFur(horse) && getBreed(selectedHorses[horseIndex]) === getBreed(horse),
      },
    ]

    const selectedOption = options[option]

    return (
      <Content style={styles.container}>
        <Grid style={{ marginTop: 20 }}>
          <Row style={{ textAlign: 'center', alignSelf: 'center' }}>
            <Col style={styles.main}>
              <Image
                style={styles.mainImage}
                source={getImage(selectedHorses[horseIndex])}
              />
            </Col>
          </Row>
          <Row>
            {selectedHorses.map((horse, i) => (
              <Col key={`options-${i+1}`} style={{ padding: 5 }}>
                <Row>
                  <Text
                    style={styles.mainText}
                    onPress={selectedOption.cmp(horse) ? onSuccess : onFailed}
                  >
                    { selectedOption.text }
                  </Text>
                </Row>
                <Row>
                  <Button
                    transparent
                    onPress={this.onPlayPress(horse)}
                  >
                    <Image
                      source={require('../../../../assets/images/UI/audio_click.png')}
                      style={styles.playSound}
                    />
                  </Button>
                </Row>
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
    height: 200,
    width: 340,
  },
  mainText: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'white',
  },
  optionImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 120,
    width: 140,
  },
  optionButton: {
    alignSelf: 'center',
    marginTop: 40,
  },
  playSound: {
    height: 50,
    width: 50,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(WordImageInteractionModeScreen)