import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  StyleSheet,
} from 'react-native'

import {
  Tabs,
  Tab,
} from 'native-base'

import settingsActions from '../actions/settings-actions'
import ListMode from '../components/Recognize/List'
import GridMode from '../components/Recognize/Grid'
import Crosses from '../components/Recognize/Crosses'

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

    return (
      <Tabs>
        {
          current.gameModeCodes.includes('gameModes#0') && (
            <Tab
              heading='Razas y Pelajes'
              tabStyle={styles.tab}
              activeTabStyle={styles.activeTab}
            >
              {recognizeModeComponent[current.viewModeCode]}
            </Tab>
          )
        }
        {
          current.gameModeCodes.includes('gameModes#1') && (
            <Tab
              heading='Cruzas'
              tabStyle={styles.tab}
              activeTabStyle={styles.activeTab}
            >
              <Crosses />
            </Tab>
          )
        }
      </Tabs>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#cd960c',
  },
  activeTab: {
    backgroundColor: '#f39c32',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecognizeModeScreen)