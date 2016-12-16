import { saveUserLocation, saveUserMessage } from '../services/user';

const INITIAL_STATE = {
    data: '',
    message: '',
    region: {
      latitude: 25.054136,
      longitude: 121.544512,
      latitudeDelta: 0.005331069173575287,
      longitudeDelta: 0.004023313891423186
    }
};

const userModel = {

  namespace: 'user',

  state: {
    ...INITIAL_STATE
  },

subscriptions: {
},

effects: {
  * saveLocation({ payload }, { call, put }) {
        yield put({
          type: 'regionChanged',
          payload
        });
        //const { currentUser } = firebase.auth();
        yield call(saveUserLocation, payload);
  },
  * saveMessage({ payload }, { call, put }) {
        const { err } = yield call(saveUserMessage, payload);
        if (!err) {
          yield put({ type: 'messageChanged', payload: '' });
        }
  }
},

reducers: {
  regionChanged(state, { payload }) {
    const { latitude, longitude } = payload;
    return { ...state, region: { ...state.region, latitude, longitude } };
  },
  getUsersData(state, { payload: data }) {
    return { ...state, data };
  },
  messageChanged(state, { payload: text }) {
    return { ...state, message: text };
  },
},
};

export default userModel;
