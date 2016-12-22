import { addUserContent, createUserRoom, getRoomList, checkRoom } from '../services/talk';
import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = {
  message: '',
  room: '',
  nowRoomId: '',
  contents: ''
};

const talkModel = {

  namespace: 'talk',

  state: {
    ...INITIAL_STATE
  },

subscriptions: {
  setup({ dispatch }) {
    getRoomList(room => {
      dispatch({ type: 'getRoomData', payload: room });
    });
  },
},

effects: {
  * addUserToRoom({ payload }, { call, put, select }) {
    const room = yield select(state => state.talk.room);
    const { currentUserUid, uid } = payload;
    const roomId = yield call(checkRoom, room, currentUserUid, uid);
    if (!roomId) {
      const { roomNew, err } = yield call(createUserRoom, currentUserUid, uid);
      if (!err) {
        yield put({
          type: 'updateNowRoomId',
          payload: roomNew.key
        });
      }
    } else {
      yield put({
        type: 'updateNowRoomId',
        payload: roomId
      });
    }
    Actions.talk();
  },
  * goToRoom({ payload }, { put }) {
      const { roomId } = payload;
      yield put({
            type: 'updateNowRoomId',
            payload: roomId
      });
      Actions.talk();
  },
  * addMessage({ payload }, { call, put }) {
    yield call(addUserContent, payload);
    yield put({
      type: 'messageChanged',
      payload: '',
    });
  },
},

reducers: {
    messageChanged(state, { payload: text }) {
      return { ...state, message: text };
    },
    getRoomData(state, { payload: room }) {
      return { ...state, room };
    },
    getTalkData(state, { payload: contents }) {
      return { ...state, contents };
    },
    updateNowRoomId(state, { payload }) {
    return { ...state, nowRoomId: payload };
  }
  },
};

export default talkModel;
