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

class Lose extends Component {
  render() {
    const {
      handleRefresh,
      handleBackClick,
    } = this.props

    return (
      <Content style={{ backgroundColor: 'black' }}>
        <Grid>
          <Row>
            <Col style={{ paddingVertical: hp('18%') }}>
              <Button style={{ alignSelf: 'center' }} large warning onPress={handleBackClick}>
                <Icon name='md-home' />
              </Button>
            </Col>
            <Col style={{ paddingVertical: hp('18%') }}>
              <Button style={{ alignSelf: 'center' }} large warning onPress={handleRefresh}>
                <Icon name='md-repeat' />
              </Button>
            </Col>
          </Row>
        </Grid>
      </Content>
    )
  }
}

export default Lose