import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  signIn,
  getList,
  saveUserEmail,
  saveUserPicture,
  updateUserOnline
} from '../services/user';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
};

const authModel = {

  namespace: 'auth',

  state: {
    ...INITIAL_STATE
  },

subscriptions: {
  setup({ dispatch }) {
    const config = {
      apiKey: 'AIzaSyC8hxN7c7vck6trGm7UeNFSqlyACq1O_BU',
      authDomain: 'talkmap-30895.firebaseapp.com',
      databaseURL: 'https://talkmap-30895.firebaseio.com',
      storageBucket: 'talkmap-30895.appspot.com',
      messagingSenderId: '457470752232'
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const jpgId = Math.floor((Math.random() * 1000) + 1);
        const uri = `https://avatars2.githubusercontent.com/u/${jpgId}`;

        dispatch({ type: 'login_user_successs', payload: user });
        saveUserEmail(user);
        saveUserPicture(user, uri);
        const connectedRef = firebase.database().ref('.info/connected');
        connectedRef.on('value', (snap) => {
          if (snap.val() === true) {
            console.log('connected');
            updateUserOnline(user, true);
          } else {
            updateUserOnline(user, false);
          }
        });

        getList(user.uid, data => {
          dispatch({ type: 'user/getUsersData', payload: data });
        });
        //setTimeout(() => {
          Actions.main();

        //}, 3000);
      } else {
        //setTimeout(() => {
          Actions.auth();
        //}, 3000);
      }
    });
  },
},

effects: {
    * loginUser({ payload }, { call, put }) {
    const { email, password } = payload;

    yield put({ type: 'login_user' });
    const { user, err } = yield call(signIn, email, password);
    if (user) {
      yield put({ type: 'login_user_successs', payload: user });
      Actions.main();
    } else if (err) {
      yield put({ type: 'login_user_fail', payload: err });
    }
  },

},

reducers: {
  emailChanged(state, { payload: text }) {
    return { ...state, email: text };
  },
  passwordChanged(state, { payload: text }) {
    return { ...state, password: text };
  },
  login_user(state) {
    return { ...state, loading: true, error: '' };
  },
  login_user_successs(state, { payload: user }) {
    return { ...state, ...INITIAL_STATE, user };
  },
  login_user_fail(state, { payload: err }) {
    return { ...state, error: err.message, password: '', loading: false };
  },
  getUsersLocation(state, { payload: users }) {
    return { ...state, users };
  },
},
};

export default authModel;
