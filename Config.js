import {firebase} from '@react-native-firebase/app';
let config = {
  appId: '1:568844351585:android:a616f5d10e9ef2fab1d220',
  apiKey: 'AIzaSyA-BIC-UJcDfpQzQiHUGEL5dmDfymzGkeQ',
  authDomain:'568844351585-2q6680qlej2rtfqec8cbtdu6i2nliub1.apps.googleusercontent.com',
  databaseURL: 'https://todoappreactnativefirebase.firebaseio.com/',
  projectId: 'todoappreactnativefirebase',
  storageBucket: 'todoappreactnativefirebase.appspot.com',
  messagingSenderId: ''
}
let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(config);
}
export const db = app.database();
