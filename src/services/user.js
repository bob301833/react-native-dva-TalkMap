import firebase from 'firebase';

//const { currentUser } = firebase.auth();
//const currentUserUid = currentUser.uid;

const updateUserOnline = (currentUser, online) => {
  return firebase.database().ref(`/users/${currentUser.uid}/online`)
    .set(online);
};

const saveUserEmail = (currentUser) => {
  return firebase.database().ref(`/users/${currentUser.uid}/email`)
    .set(currentUser.email);
};

const saveUserPicture = (currentUser, uri) => {
  return firebase.database().ref(`/users/${currentUser.uid}/picture`)
    .set(uri);
};

const saveUserLocation = ({ currentUserUid, latitude, longitude }) => {
  return firebase.database().ref(`/users/${currentUserUid}/location`)
    .set({ latitude, longitude })
    .then((suc) => ({ suc }))
    .catch((err) => ({ err }));
};

const saveUserMessage = ({ currentUserUid, message }) => {
  return firebase.database().ref(`/users/${currentUserUid}/message`)
    .set(message)
    .then((suc) => ({ suc }))
    .catch((err) => ({ err }));
};


const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => ({ user }))
    .catch(() => firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => ({ user }))
      .catch(err => ({ err }))
    );
};

const getList = (currentUserUid, cb) => {
  const ref = firebase.database().ref('/users');
  const handler = snapshot => {
      cb(snapshot.val());
  };
  ref.on('value', handler);
  return () => {
    ref.off('value', handler);
  };
};

export {
  signIn,
  getList,
  saveUserEmail,
  saveUserPicture,
  saveUserLocation,
  saveUserMessage,
  updateUserOnline
};
