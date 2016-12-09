import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

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
    markers: [{
      latlng: {
        latitude: 25.054136,
        longitude: 121.544512
      },
      title: '卡比獸',
      discription: '我超強'
    }]
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
      >
       {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.latlng}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
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

export default Map;
