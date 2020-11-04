/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { firebase } from '@react-native-firebase/database';
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
} from 'react-native';

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

class App extends React.Component {

  writeuserdata(name){
    firebase.database().ref('Entry/').set({
      name,
    }).then((data) => {
      console.log('data', data)
    }).catch((error) => {
      console.log('error', error)
    })
  }

  render(){
    return (
      <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
        <TextInput
        placeholder = "Enter name"
        onChangeText = {(name) => this.setState({name})}
        />

        <View style = {{marginTop:40,width:100}}>
          <Button
          title = "Save"
          onPress = {() => this.writeuserdata(this.state.name)}
          />
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({

});

export default App;
