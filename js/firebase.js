const firebaseConfig = {
  apiKey: "AIzaSyB0RXBuUUIcrP7eZA_7OeQGOO-vN_ax0tQ",
  authDomain: "travelmore-2827d.firebaseapp.com",
  databaseURL: "https://travelmore-2827d-default-rtdb.firebaseio.com",
  projectId: "travelmore-2827d",
  storageBucket: "travelmore-2827d.appspot.com",
  messagingSenderId: "147347224048",
  appId: "1:147347224048:web:6d88d9adc331f787349935",
  measurementId: "G-FCC0G0NMZ4",
};

firebase.initializeApp(firebaseConfig);

function randomID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateFirebaseItem(ID, value) {
  return {
    userid: ID,
    data: value,
  };
}

function addElementInFirebase(REF, data) {
  firebase
    .database()
    .ref(REF + "/" + randomID())
    .set(data);
}

function getArrayFromFirebase(REF) {
  let tempArray = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        tempArray.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return tempArray;
}

function removeElementFromFirebase(REF, id = "", option = false) {
  if (option) {
    firebase.database().ref(`${REF}/${id}`).remove();
  } else {
    firebase.database().ref(`${REF}/`).remove();
  }
}

function changeOnDateOnFirebaseByID(REF, ID, data) {
  firebase
    .database()
    .ref(REF + "/" + ID)
    .set(data);
}
