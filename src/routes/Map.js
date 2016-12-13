import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
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

  getRegion(region) {
    console.log(region);
    this.props.dispatch({ type: 'user/saveLocation', payload: region });
  }
  render() {
    const { users } = this.props;
    return (
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
          Object.keys(users).map((val) => {
           return (
             <MapView.Marker
              key={users[val].email}
              coordinate={users[val].location}
              title={users[val].email}
             >
              <View>
                <Text>
                  {users[val].email}
                </Text>
              </View>
             </MapView.Marker>
            );
          })
        }
      </MapView>
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
  const { users } = state.user;
  return { users };
};

export default connect(mapStateToProps)(Map);

