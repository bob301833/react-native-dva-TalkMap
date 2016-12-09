import firebase from 'firebase';

//const { currentUser } = firebase.auth();
//const currentUserUid = currentUser.uid;

const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => ({ user }))
    .catch(() => firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => ({ user }))
      .catch(err => ({ err }))
    );
};

const getList = (currentUserUid, cb) => {
  const ref = firebase.database().ref(`/users/${currentUserUid}/employees`);
  const handler = snapshot => {
      cb(snapshot.val());
  };
  ref.on('value', handler);
  return () => {
    ref.off('value', handler);
  };
};

const saveEmployeesData = ({ name, phone, shift, currentUserUid, uid }) => {
  return firebase.database().ref(`/users/${currentUserUid}/employees/${uid}`)
    .set({ name, phone, shift })
    .then((user) => ({ user }))
    .catch((err) => ({ err }));
};

const createEmployeesData = ({ name, phone, shift = 'Monday', currentUserUid }) => {
  return firebase.database().ref(`/users/${currentUserUid}/employees`)
    .push({ name, phone, shift })
    .then((user) => ({ user }))
    .catch((err) => ({ err }));
};

const deleteEmployeesData = ({ currentUserUid, uid }) => {
  return firebase.database().ref(`/users/${currentUserUid}/employees/${uid}`)
    .remove()
    .then((user) => ({ user }))
    .catch(err => ({ err }));
};

export {
  signIn,
  getList,
  saveEmployeesData,
  createEmployeesData,
  deleteEmployeesData
};
