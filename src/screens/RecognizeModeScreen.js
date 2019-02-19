import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import settingsActions from '../actions/settings-actions'
import ListMode from '../components/Recognize/List'
import GridMode from '../components/Recognize/Grid'

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

class RecognizeModeScreen extends Component {
  static navigationOptions = {
    title: 'Modo Reconocimiento',
  }

  componentDidMount() {
    const {
      actions: {
        getStoredConfiguration,
      }
    } = this.props

    getStoredConfiguration()
  }

  render() {
    const {
      navigation: {
        navigate,
      },
      settings: {
        settings: {
          current,
        },
      },
    } = this.props

    const recognizeModeComponent = {
      null: null,
      'viewModes#0': <ListMode />,
      'viewModes#1': <GridMode />,
    }

    return recognizeModeComponent[current.viewModeCode]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognizeModeScreen)