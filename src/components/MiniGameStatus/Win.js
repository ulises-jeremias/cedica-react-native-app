import React, {Component} from 'react'
import {
  Content,
  Button,
  Icon,
} from 'native-base'
import {
  Grid,
  Row,
  Col,
} from 'react-native-easy-grid'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import Cup from '../Success/Cup'

class Win extends Component {
  render() {
    const {
      handleBackClick,
      handleWin,
    } = this.props

    return (
      <Content style={{ backgroundColor: 'black' }}>
        <Grid>
          <Col>
            <Cup
              style={{
                marginTop: hp('6%'),
                width: wp('60%'),
                height: hp('60%'),
                resizeMode: 'contain',
                alignSelf: 'center',
              }} 
            />
          </Col>
          <Col>
            <Row>
              <Col style={{ paddingVertical: hp('17%') }}>
                <Button style={{ alignSelf: 'center' }} warning onPress={handleBackClick}>
                  <Icon name='md-home' />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col style={{ paddingVertical: hp('7%') }}>
                <Button style={{ alignSelf: 'center' }} warning onPress={handleWin}>
                  <Icon name='md-arrow-round-forward' />
                </Button>
              </Col>
            </Row>
          </Col>
        </Grid>
      </Content>
    )
  }
}

export default Win