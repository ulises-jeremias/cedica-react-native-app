import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import SoundPlayer from 'react-native-sound-player'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
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
      selectedOptionIndex,
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
        text: getBreed(horses[horseIndex]),
        cmp: horse => getBreed(horses[horseIndex]) === getBreed(horse),
      },
      {
        text: getFur(horses[horseIndex]),
        cmp: horse => getFur(horses[horseIndex]) === getFur(horse),
      },
      {
        text: `${getBreed(horses[horseIndex])} - ${getFur(horses[horseIndex])}`,
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
            <View style={[styles.main]}>
              <Text style={styles.mainText}>
                { selectedOption.text }
              </Text>
              <Button
                transparent
                onPress={this.onPlayPress(horses[horseIndex])}
                style={styles.playSoundButton}
              >
                <AsyncImage
                  source={require('../../../../assets/images/UI/audio_click.png')}
                  style={styles.playSound}
                />
              </Button>
            </View>
          </Row>
          <Row>
            {horses.map((horse, i) => {
              const cmpCondition = selectedOption.cmp(horse)
              const isSelected = selectedOptionIndex === i
              const containerEventHandler = cmpCondition ?
                onSuccess(getImage(horse)) :
                onFailed(getImage(horse))

              return (
                <Col key={`options-${i+1}`} style={{ padding: 5 }}>
                  <Button
                    style={styles.optionButton}
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
                    <AsyncImage
                      source={getImage(horse)}
                      style={styles.optionImage}
                    />
                  </Button>
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
    paddingTop: hp('7%'),
    height: hp('45%'),
  },
  mainText: {
    fontSize: hp('8%'),
    alignSelf: 'center',
    color: 'white',
  },
  optionImage: {
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginLeft: -wp('2%'),
    marginTop: hp('0.5%'),
    height: hp('23%'),
    width: wp('30%'),
  },
  optionButton: {
    alignSelf: 'center',
    marginTop: hp('4%'),
    height: hp('27%'),
    width: wp('23%'),
  },
  playSoundButton: {
    marginTop: hp('2%'),
    alignSelf: 'center',
  },
  playSound: {
    alignSelf: 'center',
    height: hp('10%'),
    width: wp('10%'),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(WordImageInteractionModeScreen)