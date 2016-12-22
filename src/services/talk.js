import firebase from 'firebase';
import _ from 'lodash';

const getRoomList = (cb) => {
  const ref = firebase.database().ref('/talk/room');
  const handler = snapshot => {
      cb(snapshot.val());
  };
  ref.on('value', handler);
  return () => {
    ref.off('value', handler);
  };
};

const getTalkList = (roomId, cb) => {
  const ref = firebase.database().ref(`/talk/room/${roomId}/contents`);
  const handler = snapshot => {
      cb(snapshot.val());
  };
  ref.on('value', handler);
  return () => {
    ref.off('value', handler);
  };
};

const checkRoom = (rooms, currentUserUid, uid) => {
  const roomId = _.findKey(rooms, (room) => {
    const match =
      _.includes(room.users, currentUserUid) &&
      _.includes(room.users, uid);
    return match;
  });
  return roomId;
};

const createUserRoom = (currentUserUid, uid) => {
  const users = [currentUserUid, uid];
  return firebase.database().ref('/talk/room')
    .push({
      users,
      time: Date.now()
    })
    .then((roomNew) => ({ roomNew }))
    .catch((err) => ({ err }));
};

const addUserContent = ({ nowRoomId, currentUser, message }) => {
  const { uid, email } = currentUser;
  const username = email.split('@')[0];
  return firebase.database().ref(`/talk/room/${nowRoomId}/contents`)
    .push({ uid, username, message, time: Date.now() })
    .then((room) => ({ room }))
    .catch((err) => ({ err }));
};


export {
  getRoomList,
  getTalkList,
  addUserContent,
  createUserRoom,
  checkRoom
};
