import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  Grid,
  Col,
} from 'react-native-easy-grid'
import {
  Image,
  StyleSheet,
} from 'react-native'
import {
  Button,
  Content,
  Text,
} from 'native-base'

import settingsActions from '../../../actions/settings-actions'
import { horses, getImage } from '../../../config/Horses'

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
  componentDidMount() {
    const {
      navigate,
      settings: {
        settings: {
          current,
        },
      },
    } = this.props

    if (!current.gameModeCodes.includes('gameModes#1')) {
      navigate('Home')
    }
  }

  render() {
    const {
      settings: {
        settings: {
          current,
        },
      },
    } = this.props

    if (!current.gameModeCodes.includes('gameModes#1')) {
      return null
    }

    const selectedHorses = _.sample(_.shuffle(horses), 4)

    return (
      <Content style={styles.container}>
        <Grid style={{ marginTop: 40 }}>
          {selectedHorses.map((horse, i) => (
            <Col key={`options-${i+1}`} style={{ padding: 5 }}>
              <Button
                onPress={() => {}}
                style={styles.optionButton}
                transparent
              >
                <Image
                  source={getImage(horse)}
                  resizeMode='contain'
                  style={styles.optionImage}
                />
              </Button>
            </Col>
          ))}
        </Grid>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3bc32',
  },
  optionImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 120,
    width: 140,
  },
  optionButton: {
    alignSelf: 'center',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageImageInteractionModeScreen)