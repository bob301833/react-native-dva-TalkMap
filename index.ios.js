import React from 'react';
import { AppRegistry } from 'react-native';
import dva from 'dva/mobile';
import authModel from './src/models/auth';
import employeeModel from './src/models/employee';
import employeeformModel from './src/models/employeeform';
import Router from './src/router';

const app = dva();

app.model(authModel);
app.model(employeeModel);
app.model(employeeformModel);

app.router(() => <Router />);

AppRegistry.registerComponent('TalkMap', () => app.start());
