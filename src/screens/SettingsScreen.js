import React, { Component, Fragment }  from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Col } from 'react-native-easy-grid'
import {
  Body,
  Button,
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

class HeaderTitle extends Component {
  render() {
    const {
      settings: {
        settings: {
          isFetching,
          isValid,
          fields,
        }
      },
      actions: {
        updateStoredConfiguration,
      }
    } = this.props

    return (
      <Grid>
        <Col style={{ marginVertical: 40 }}>
          <Text>
            Configuración
          </Text>
        </Col>
        <Col style={{ width: 80, marginVertical: 30 }}>
          <Button
            rounded
            success
            bordered={isFetching || !isValid}
            disabled={isFetching || !isValid}
            onPress={(isFetching || !isValid) ? undefined : () => updateStoredConfiguration(fields)}
          >
            <Icon success fontSize={12} name='md-save' />
          </Button>
        </Col>
      </Grid>
    )
  }
}

class SettingsScreen extends Component {
  static navigationOptions = {
    headerTitle: connect(mapStateToProps, mapDispatchToProps)(HeaderTitle),
  }

  componentDidMount() {
    const {
      actions: {
        getStoredConfiguration,
      }
    } = this.props

    getStoredConfiguration()
  }

  onCheckBoxPressHandler(name, code) {
    const {
      actions: {
        onSettingsFormFieldChange,
      },
      settings: {
        settings: {
          fields,
        }
      }
    } = this.props

    let codes = Array.from(fields[name])
    
    return () => {
      if (codes.includes(code)) {
        onSettingsFormFieldChange('settings', name, codes.filter(e => e !== code))
        return
      }

      onSettingsFormFieldChange('settings', name, [...codes, code])
    }
  }

  onPickerValueChangeHandler(name) {
    const {
      actions: {
        onSettingsFormFieldChange,
      }
    } = this.props
    
    return value => {
      onSettingsFormFieldChange('settings', name, value)
    }
  }

  onRadioButtonPressHandler(name, code) {
    const {
      actions: {
        onSettingsFormFieldChange,
      }
    } = this.props
    
    return () => {
      onSettingsFormFieldChange('settings', name, code)
    }
  }
  
  render() {
    const {
      settings: {
        miniGameInteractions,
        miniGameInteractionsConditions,
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
            <ListItem
              key={`${viewMode.code}-${i+1}`}
              onPress={this.onRadioButtonPressHandler('viewModeCode', viewMode.code)}
            >
              <Left>
                <Text>
                  {viewMode.text}
                </Text>
              </Left>
              <Right>
                <Radio
                  selected={fields.viewModeCode === viewMode.code}
                  onPress={this.onRadioButtonPressHandler('viewModeCode', viewMode.code)}
                />
              </Right>
            </ListItem>
          ))}

          <ListItem itemDivider>
            <Text />
          </ListItem>

          {Array.from(gameModes || []).map((gameMode, i) => (
            <ListItem
              key={`${gameMode.code}-${i+1}`}
              onPress={this.onCheckBoxPressHandler('gameModeCodes', gameMode.code)}
            >
              <Body>
                <Text>
                  {gameMode.text}
                </Text>
              </Body>
              <CheckBox
                onPress={this.onCheckBoxPressHandler('gameModeCodes', gameMode.code)}
                checked={Array.from(fields.gameModeCodes || []).includes(gameMode.code)}
              />
            </ListItem>
          ))}

          <ListItem itemDivider>
            <Text>
              Minijuego
            </Text>
          </ListItem>

          {Array.from(miniGames || []).map((miniGame, i) => {
            const [,code] = miniGame.code.split('#')

            let disabled = fields.lastWonGameLevel < Number(code)

            return (
              <ListItem
                key={`${miniGame.code}-${i+1}`}
                disabled={disabled}
                style={!disabled ? {} : {
                  opacity: 0.45
                }}
                onPress={disabled ? undefined : this.onRadioButtonPressHandler('actualGameLevel', Number(code) + 1)}
              >
                <Left>
                  <Text>
                    {miniGame.text}
                  </Text>
                </Left>
                <Right>
                  <Radio
                    disabled={disabled}
                    selected={!disabled && fields.actualGameLevel === Number(code) + 1}
                    onPress={disabled ? undefined : this.onRadioButtonPressHandler('actualGameLevel', Number(code) + 1)}
                  />
                </Right>
              </ListItem>
            )
          })}

          <ListItem itemDivider>
            <Text />
          </ListItem>
          
          {Array.from(miniGameInteractions || []).map((miniGameInteraction, i) => {
            let disabled = !miniGameInteractionsConditions[i](fields)
          
            return (
              <ListItem
                key={`${miniGameInteraction.code}-${i+1}`}
                disabled={disabled}
                style={!disabled ? {} : {
                  opacity: 0.45
                }}
                onPress={disabled ? undefined : this.onRadioButtonPressHandler('miniGameInteractionCode', miniGameInteraction.code)}
              >
                <Left>
                  <Text>
                    {miniGameInteraction.text}
                  </Text>
                </Left>
                <Right>
                  <Radio
                    disabled={disabled}
                    selected={!disabled && fields.miniGameInteractionCode === miniGameInteraction.code}
                    onPress={disabled ? undefined : this.onRadioButtonPressHandler('miniGameInteractionCode', miniGameInteraction.code)}
                  />
                </Right>
              </ListItem>
            )
          })}

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
                  onValueChange={this.onPickerValueChangeHandler('levelCode')}
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
                  onValueChange={this.onPickerValueChangeHandler('soundCode')}
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