import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
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
} from 'native-base'

import AsyncImage from '../../../components/AsyncImage'
import settingsActions from '../../../actions/settings-actions'
import { crosses, getImage } from '../../../config/Horses'

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

class ImageImageInteractionModeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOptionIndex: null,
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
    } = this.props

    const cmp = horse => {
      return (_.isEqual(horse.mother, horses[horseIndex].mother) &&
              _.isEqual(horse.father, horses[horseIndex].father))
    }

    return (
      <Content style={styles.container}>
        <Grid style={{ marginTop: hp('3%') }}>
          <Row>
            <Col>
              <Button style={{marginLeft: wp('2%')}} info onPress={() => navigate('Home')}>
                <Icon name='md-home' />
              </Button>
            </Col>
          </Row>
          <Row style={{ textAlign: 'center', alignSelf: 'center' }}>
            <Col>
              <AsyncImage
                style={styles.mainImage}
                source={getImage(horses[horseIndex].mother)}
              />
            </Col>
            <Col>
              <AsyncImage
                style={styles.mainImage}
                source={getImage(horses[horseIndex].father)}
              />
            </Col>
          </Row>
          <Row>
            {horses.map((cross, i) => {
              const cmpCondition = cmp(cross)
              const isSelected = selectedOptionIndex === i
              const containerEventHandler = cmpCondition ?
                onSuccess(getImage(cross.horse)) :
                onFailed(getImage(cross.horse))

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
                      source={getImage(cross.horse)}
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
  mainImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: hp('45%'),
    width: hp('50%'),
  },
  optionImage: {
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginLeft: -wp('2%'),
    marginTop: hp('0.7%'),
    height: hp('23%'),
    width: wp('30%'),
  },
  optionButton: {
    alignSelf: 'center',
    marginTop: hp('4%'),
    height: hp('27%'),
    width: wp('22%'),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageImageInteractionModeScreen)