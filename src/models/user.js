import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { signIn, getList, saveUserLocation } from '../services/employee';

const INITIAL_STATE = {
    users: ''
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
        const { user, err } = yield call(saveUserLocation, currentUser, payload);
       // console.log(user);
       // yield put({ type: 'UpdateUsersLocation', payload: user });
  },
},

reducers: {
  getUsersLocation(state, { payload: users }) {
    return { ...state, users };
  },
},
};

export default userModel;
