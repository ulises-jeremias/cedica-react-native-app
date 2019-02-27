import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import SoundPlayer from 'react-native-sound-player'
import {
  Col,
  Grid,
  Row,
} from 'react-native-easy-grid'
import {
  StyleSheet,
} from 'react-native'
import {
  Button,
  Content,
  Icon,
  Text,
  View,
} from 'native-base'

import AsyncImage from '../../../components/AsyncImage'
import settingsActions from '../../../actions/settings-actions'
import { getImage, getBreed, getFur, getSound } from '../../../config/Horses'

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
  constructor(props) {
    super(props)

    this.state = {
      selectedOptionIndex: null,
    }
  }

  onPlayPress(elem) {
    const {
      config: {
        soundCode,
      }
    } = this.props

    return () => {
      try {
        try {
          const [path, ext] = getSound(elem, soundCode)
  
          if (!path) {
            return
          }
  
          SoundPlayer.playSoundFile(path, ext)
        } catch (error) {
          console.log(error.message)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  render() {
    const {
      selectedOptionIndex
    } = this.state

    const {
      onSuccess,
      onFailed,
      navigate,
      horses,
      horseIndex,
      option,
    } = this.props

    const options = [
      {
        text: horse => getBreed(horse),
        cmp: horse => getBreed(horses[horseIndex]) === getBreed(horse),
      },
      {
        text: horse => getFur(horse),
        cmp: horse => getFur(horses[horseIndex]) === getFur(horse),
      },
      {
        text: horse => `${getBreed(horse)} - ${getFur(horse)}`,
        cmp: horse => getFur(horses[horseIndex]) === getFur(horse) && getBreed(horses[horseIndex]) === getBreed(horse),
      },
    ]

    const selectedOption = options[option]

    return (
      <Content style={styles.container}>
        <Grid style={{ marginTop: hp('4%') }}>
          <Row>
            <Col>
              <Button style={{marginLeft: wp('2%')}} info onPress={() => navigate('Home')}>
                <Icon name='md-home' />
              </Button>
            </Col>
          </Row>
          <Row style={{ textAlign: 'center', alignSelf: 'center' }}>
            <Col style={styles.main}>
              <AsyncImage
                style={styles.mainImage}
                source={getImage(horses[horseIndex])}
              />
            </Col>
          </Row>
          <Row style={{ marginVertical: hp('4%') }}>
            {horses.map((horse, i) => {
              const cmpCondition = selectedOption.cmp(horse)
              const isSelected = selectedOptionIndex === i
              const containerEventHandler = cmpCondition ?
                onSuccess(selectedOption.text(horse)) :
                onFailed(selectedOption.text(horse))

              return (
                <Col key={`options-${i+1}`} style={{ padding: 5 }}>
                  <View>
                    <Button
                      block
                      bordered={!isSelected}
                      light={!isSelected}
                      danger={isSelected && !cmpCondition}
                      success={isSelected && cmpCondition}
                      onPress={isSelected ? undefined : () => {
                        this.setState(() => ({
                          selectedOptionIndex: i,
                        }))

                        containerEventHandler()
                      }}
                    >
                      <Text
                        style={styles.mainText}
                      >
                        { selectedOption.text(horse) }
                      </Text>
                    </Button>
                    <Button
                      transparent
                      onPress={this.onPlayPress(horse)}
                      style={styles.playSoundButton}
                    >
                      <AsyncImage
                        source={require('../../../../assets/images/UI/audio_click.png')}
                        style={styles.playSound}
                      />
                    </Button>
                  </View>
                </Col>
              )
            })}
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
    height: hp('7%'),
    width: wp('7%'),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(WordImageInteractionModeScreen)