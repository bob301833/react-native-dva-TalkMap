import firebase from 'firebase';

//const { currentUser } = firebase.auth();
//const currentUserUid = currentUser.uid;

const saveUserEmail = (currentUser) => {
  return firebase.database().ref(`/users/${currentUser.uid}/email`)
    .set(currentUser.email);
};

const saveUserLocation = (currentUser, location) => {
  return firebase.database().ref(`/users/${currentUser.uid}/location`)
    .set(location)
    .then((suc) => ({ suc }))
    .catch((err) => ({ err }));
};

const saveUserMessage = (currentUser, message) => {
  return firebase.database().ref(`/users/${currentUser.uid}/message`)
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
  saveUserLocation,
  saveUserMessage
};