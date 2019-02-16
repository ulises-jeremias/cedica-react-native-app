import React, { Component, Fragment }  from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Body,
  CheckBox,
  Content,
  Form,
  Icon,
  Left,
  ListItem,
  Picker,
  Radio,
  Right,
  Text,
} from 'native-base'

import settingsActions from '../actions/settings-actions'
import options from '../config/Options'

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

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Configuración',
  }

  componentDidMount() {

  }

  render() {
    const {
      settings: {
        miniGames,
        gameModes,
        viewModes,
        levels,
        sounds,
      }
    } = options

    const {
      settings: {
        settings: {
          fields,
        }
      }
    } = this.props

    return (
      <Fragment>
        <Content>
          <ListItem itemDivider>
            <Text>Modo de Reconocimiento</Text>
          </ListItem> 
          
          {Array.from(viewModes || []).map((viewMode, i) => (
            <ListItem key={`${viewMode.code}-${i+1}`}>
              <Left>
                <Text>
                  {viewMode.text}
                </Text>
              </Left>
              <Right>
                <Radio selected={fields.viewModeCode === viewMode.code} />
              </Right>
            </ListItem>
          ))}

          <ListItem itemDivider>
            <Text />
          </ListItem>

          {Array.from(gameModes || []).map((gameMode, i) => (
            <ListItem key={`${gameMode.code}-${i+1}`}>
              <Body>
                <Text>
                  {gameMode.text}
                </Text>
              </Body>
              <CheckBox
                checked={Array.from(fields.gameModeCodes || []).includes(gameMode.code)}
              />
            </ListItem>
          ))}

          <ListItem itemDivider>
            <Text>
              Minijuego
            </Text>
          </ListItem>
          
          {Array.from(miniGames || []).map((miniGame, i) => (
            <ListItem key={`${miniGame.code}-${i+1}`}>
              <Left>
                <Text>
                  {miniGame.text}
                </Text>
              </Left>
              <Right>
                <Radio selected={fields.miniGameCode === miniGame.code} />
              </Right>
            </ListItem>
          ))}

          <ListItem itemDivider>
            <Text>
              Nivel de Dificultad
            </Text>
          </ListItem>
          <ListItem>
            <Content>
              <Form>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='arrow-down' />}
                  style={{ width: undefined }}
                  selectedValue={fields.levelCode}
                >
                  {Array.from(levels || []).map((level, i) => (
                    <Picker.Item
                      key={`${level.code}-${i+1}`}
                      label={level.text}
                      value={level.code}
                    />
                  ))}
                </Picker>
              </Form>
            </Content>
          </ListItem>
          <ListItem itemDivider>
            <Text>
              Sonido
            </Text>
          </ListItem>
          <ListItem>
            <Content>
              <Form>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='arrow-down' />}
                  style={{ width: undefined }}
                  selectedValue={fields.soundCode}
                >
                  {Array.from(sounds || []).map((sound, i) => (
                    <Picker.Item
                      key={`${sound.code}-${i+1}`}
                      label={sound.text}
                      value={sound.code}
                    />
                  ))}
                </Picker>
              </Form>
            </Content>
          </ListItem>
        </Content>
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)