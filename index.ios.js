import React from 'react';
import { AppRegistry } from 'react-native';
import dva from 'dva/mobile';
import authModel from './src/models/auth';
import userModel from './src/models/user';
import talkModel from './src/models/talk';
import Router from './src/router';

const app = dva();

app.model(authModel);
app.model(userModel);
app.model(talkModel);

app.router(() => <Router />);

AppRegistry.registerComponent('TalkMap', () => app.start());
