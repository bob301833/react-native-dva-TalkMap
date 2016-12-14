import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { InputItem, List, Button, WhiteSpace, WingBlank, ActivityIndicator, Card } from 'antd-mobile';
import { connect } from 'dva';

//latitude: 25.054136,
//longitude: 121.544512,

class Map extends Component {

  componentDidMount() {
     navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        console.log('initialPosition', initialPosition);
        this.props.dispatch({
          type: 'user/saveLocation',
          payload: {
            latitude: initialPosition.coords.latitude,
            longitude: initialPosition.coords.longitude
          }
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
      this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      console.log('lastPosition', lastPosition);

      this.props.dispatch({
          type: 'user/saveLocation',
          payload: {
            latitude: lastPosition.coords.latitude,
            longitude: lastPosition.coords.longitude
          }
      });
    });
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
          showsUserLocation
          followsUserLocation
          zoomEnabled
            style={styles.map}
          >
            {
              Object.keys(data).map((val) => {
              const name = data[val].email.split('@');
              return (
                <MapView.Marker
                  key={data[val].email}
                  coordinate={data[val].location}
                  title={data[val].message}
                  onPress={this.markPress.bind(this)}
                >
                  <View>
                    <Card>
                      <Text>{name[0]} : {data[val].message}</Text>
                    </Card>
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

