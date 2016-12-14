import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { signIn, getList, saveUserLocation, saveUserMessage } from '../services/employee';

const INITIAL_STATE = {
    data: '',
    message: ''
};

const userModel = {

  namespace: 'user',

  state: {
    ...INITIAL_STATE
  },

subscriptions: {
  setup({ dispatch }) {
  },
},

effects: {
  * saveLocation({ payload }, { call, put }) {
        const { currentUser } = firebase.auth();
        const { err } = yield call(saveUserLocation, currentUser, payload);
  },
  * saveMessage({ payload }, { call, put }) {
        const { currentUser } = firebase.auth();
        const { err } = yield call(saveUserMessage, currentUser, payload);
        if (!err) {
          yield put({ type: 'messageChanged', payload: '' });
        }
  }
},

reducers: {
  getUsersData(state, { payload: data }) {
    return { ...state, data };
  },
  messageChanged(state, { payload: text }) {
    return { ...state, message: text };
  },
},
};

export default userModel;
