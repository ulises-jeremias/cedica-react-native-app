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

class RecognizeMode extends Component {
  static navigationOptions = {
    title: 'Modo Reconocimiento',
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

    if (current.viewModeCode === 'viewModes#0') {
      return <ListMode />
    } else {
      return <GridMode />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognizeMode)