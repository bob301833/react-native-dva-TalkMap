import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { InputItem, Flex, Button, WhiteSpace, WingBlank, ActivityIndicator, Card } from 'antd-mobile';
import { connect } from 'dva';

//latitude: 25.054136,
//longitude: 121.544512,

class Map extends Component {
//const EmployeeList = () => {
  state = {
    region: {
        latitude: 25.054136,
        longitude: 121.544512,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421
    },
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onSubmit() {
    this.props.dispatch({
      type: 'user/saveMessage',
      payload: this.props.message
    });
  }

  getRegion(region) {
    this.props.dispatch({ type: 'user/saveLocation', payload: region });
  }
  markPress(e) {
    console.log(e);
  }


  render() {
    const { data, message, dispatch } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 12 }}>
          <View style={styles.container}>
          <MapView
          onRegionChangeComplete={this.getRegion.bind(this)}
          showsUserLocation
          followsUserLocation
          zoomEnabled
            style={styles.map}
            region={this.state.region}
            onRegionChange={this.onRegionChange.bind(this)}
          >
            {
              Object.keys(data).map((val) => {
              return (
                <MapView.Marker
                  key={data[val].email}
                  coordinate={data[val].location}
                  title={data[val].message}
                  onPress={this.markPress.bind(this)}
                >
                  <View>
                    <Text>
                      {data[val].email}
                    </Text>
                  </View>
                </MapView.Marker>
                );
              })
            }
          </MapView>
          </View>
        </View>
        <Card style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 8 }}>
              <InputItem
              controlled
                autoCorrect={false}
                onChange={(text) => dispatch({
                  type: 'user/messageChanged',
                  payload: text,
                })}
                value={message}
                placeholder="message"
              />
              </View>
              <View style={{ flex: 2, justifyContent: 'center' }}>
              <Button
                onClick={this.onSubmit.bind(this)}
                size="small"
                type="ghost"
              >
                submit
              </Button>
              </View>
            </View>
        </Card>
      </View>
    );
  }
}


const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

};

const mapStateToProps = (state) => {
  const { data, message } = state.user;
  return { data, message };
};

export default connect(mapStateToProps)(Map);

