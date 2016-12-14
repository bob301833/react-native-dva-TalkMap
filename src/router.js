import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './routes/LoginForm';
import Map from './routes/Map';
import SplashScreen from './routes/SplashScreen';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="init">
        <Scene key="SplashScreen" component={SplashScreen} />
      </Scene>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
      <Scene key="main">
        <Scene
          leftTitle="Logout"
          onLeft={() => firebase.auth().signOut()}
          key="Map"
          component={Map}
          title="Map"
          initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
