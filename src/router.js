import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './routes/LoginForm';
import Map from './routes/Map';
import SplashScreen from './routes/SplashScreen';
import talkList from './routes/talkList';
import talk from './routes/talk';
import { updateUserOnline } from './services/user';

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
          onLeft={() => {
            const user = firebase.auth().currentUser;
            updateUserOnline(user, false);
            firebase.auth().signOut();
          }}
          rightTitle="talkList"
          onRight={() => Actions.talkList()}
          key="Map"
          component={Map}
          title="Map"
          initial
        />
        <Scene
          key="talkList"
          component={talkList}
          title="Talk List"
        />
        <Scene key="talk" component={talk} title="Talk" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
