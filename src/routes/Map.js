import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import { InputItem, Button, Card } from 'antd-mobile';
import { connect } from 'dva';
import _ from 'lodash';

class Map extends Component {

  componentDidMount() {
      const currentUserUid = this.props.currentUser.uid;
     navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        this.props.dispatch({
          type: 'user/saveLocation',
          payload: {
            currentUserUid,
            latitude: initialPosition.coords.latitude,
            longitude: initialPosition.coords.longitude
          }
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
      this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.props.dispatch({
          type: 'user/saveLocation',
          payload: {
            currentUserUid,
            latitude: lastPosition.coords.latitude,
            longitude: lastPosition.coords.longitude
          }
      });
    });
  }

  onSubmit() {
    const currentUserUid = this.props.currentUser.uid;
    const { dispatch, message } = this.props;

    dispatch({
      type: 'user/saveMessage',
      payload: { currentUserUid, message }
    });
  }

  sendMessage(user, uid) {
    const currentUserUid = this.props.currentUser.uid;

    this.props.dispatch({
      type: 'talk/addUserToRoom',
      payload: { currentUserUid, uid }
    });
  }

  renderSendButton(user, uid) {
    const { currentUser } = this.props;

    if (currentUser.uid !== uid) {
      return (
      <Button
          size="small"
          type="ghost"
          onClick={() => this.sendMessage(user, uid)}
      >
          send message
        </Button>
      );
    }
  }

  renderMark(user, uid) {
    const username = user.email.split('@');
     return (
     <View>
          <Text>
            Name: {username[0]}
          </Text>
          <Text>
            Message: {user.message}
          </Text>
          { (user.online && <Text>OnLine</Text>) || <Text>OffLine</Text>}
          {this.renderSendButton(user, uid)}
    </View>
    );
  }

  render() {
    const { data, message, dispatch, region } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 12 }}>
          <View style={styles.container}>
          <MapView
            showsUserLocation
            region={region}
            zoomEnabled
            style={styles.map}
          >
            {
              _.map(data, (user, uid) => {
              return (
                <MapView.Marker
                  key={uid}
                  coordinate={user.location}
                >
                  <Image
                  style={{ width: 30, height: 30 }}
                  source={{ uri: user.picture }}
                  />
                <MapView.Callout style={{ width: 200 }}>
                  {this.renderMark(user, uid)}
                </MapView.Callout>

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
  const { data, message, region } = state.user;
  const currentUser = state.auth.user;
  return { data, message, region, currentUser };
};

export default connect(mapStateToProps)(Map);

