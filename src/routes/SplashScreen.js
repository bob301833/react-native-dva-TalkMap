import React from 'react';
import { Text, View } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>
        Talk Map
      </Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  textStyle: {
    fontSize: 30,
  }
};

export default SplashScreen;
