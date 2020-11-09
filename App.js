import {firebase} from '@react-native-firebase/database';
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

let config = {
  appId: '1:568844351585:android:a616f5d10e9ef2fab1d220',
  apiKey: 'AIzaSyA-BIC-UJcDfpQzQiHUGEL5dmDfymzGkeQ',
  authDomain:
    '568844351585-2q6680qlej2rtfqec8cbtdu6i2nliub1.apps.googleusercontent.com',
  databaseURL: 'https://todoappreactnativefirebase.firebaseio.com/',
  projectId: 'todoappreactnativefirebase',
  storageBucket: 'todoappreactnativefirebase.appspot.com',
  messagingSenderId: '',
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(config);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listname: [],
      name: '',
      isTextEditable: true,
      updatedName: '',
      selectedItem: {},
      //    updateName:""
    };
  }
  componentDidMount() {
    // firebase.database().ref('users/' + userId).set({});
    const a = firebase
      .database()
      .ref()
      .on('value', (snapshot) => {
        let ary = [];
        const getValue = snapshot.val();

        for (let key in getValue) {
          let pushValue = {
            name: getValue[key].name,
            key,
          };
          ary.push(pushValue);
        }

        this.setState({
          listname: ary,
        });
      });
    console.log({a});
  }

  writeuserdata(name) {
    const {selectedItem, listname} = this.state;
    console.log({selectedItem, listname});
    let haveKey = listname.find((el) => el.key === selectedItem.key);
    console.log({haveKey});
    if(this.state.name===''){
      alert("Please Enter Something")
    }else{
      if (haveKey == undefined) {
        firebase.database().ref().push({
          name,
        }).then(() => {
          this.setState({
            name:''
          })
          console.log('Data update.');
        })
        .catch((error) => {
          console.log('failed: ' + error.message);
        });
      } else {
        firebase
          .database()
          .ref()
          .child(selectedItem.key)
          .update({name: name})
          .then(() => {
            this.setState({
              name:"",
              selectedItem:{}
            })
            console.log('Data update.');
          })
          .catch((error) => {
            console.log('Update failed: ' + error.message);
          });
      }
    }


  }

  deleteTask = (key, name) => {
    console.log('deleteTask', name);
    this.setState((prevState) => {
      let listname = prevState.listname.slice();

      listname.splice(name, 1);
      console.log('listname', listname);

      return {listname: listname};
    });
    console.log('A');
    var r = firebase.database();
    console.log('r', r);
    var ref = r.ref();
    console.log(ref);
    ref
      .child(key)
      .remove()
      .then(() => {
        console.log('Remove succeeded.');
      })
      .catch((error) => {
        console.log('Remove failed: ' + error.message);
      });
  };
  componentWillUnmount() {
    this.ary;
  }
  updateTask = (item, key, name) => {
    this.setState({
      name: item.name,
      selectedItem: item,
    });
    // console.log(item)
    // if(name === this.state.updatedName ){
    //   alert("hello")
    // } else {

    //   firebase.database().ref().child(item.key).update({name : this.state.updatedName})
    //   .then(()=>{
    //     console.log("Data update.")
    //   }).catch((error)=>{
    //     console.log("Update failed: " + error.message)
    //   } )
    // }
  };

  render() {
    const {listname, selectedItem} = this.state;
    console.log('!!!', listname, selectedItem);
    return (
      <ImageBackground
        source={require('./1e0f3ec50785a826e650690aaf567846.jpg')}
        style={styles.image}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
          <View style={styles.container}>
            <View style={styles.box2}>
              <View style={{width: '95%'}}>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="black"
                  placeholder="Enter name"
                  onChangeText={(name) => this.setState({name: name})}
                  value={this.state.name}
                  editable={this.state.isTextEditable}
                />
              </View>

              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'black',
                    width: 41,
                    height: 51,
                    borderColor: 'blue',
                    borderWidth: 1,
                  }}
                  onPress={() => this.writeuserdata(this.state.name)}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.box}>
              <FlatList
                style={styles.list}
                data={this.state.listname}
                renderItem={({item, index}) => (
                  <View>
                    <View style={styles.listItemCont}>
                      <View style={styles.listItem}>
                        <Text>{item.name}</Text>
                      </View>

                      <TouchableOpacity
                        style={{
                          backgroundColor: 'black',
                          width: 58,
                          height: 49,
                          borderColor: 'blue',
                          borderWidth: 1,
                        }}
                        onPress={() => this.updateTask(item, item.key, index)}>
                        <Text
                          style={{
                            color: '#ffffff',
                            marginVertical: 15,
                            fontSize: 10,
                            marginHorizontal: 10,
                          }}>
                          Update
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          backgroundColor: 'black',
                          width: 58,
                          height: 49,
                          borderColor: 'blue',
                          borderWidth: 1,
                        }}
                        onPress={() => this.deleteTask(item.key, index)}>
                        <Text
                          style={{
                            color: '#ffffff',
                            marginVertical: 15,
                            fontSize: 12,
                            marginHorizontal: 10,
                          }}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.hr} />
                  </View>
                )}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  //container View
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  //X---------X--------X
  //box2 View
  box2: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  textInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'blue',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 24,
    marginHorizontal: 13,
    marginVertical: 8,
  },
  //X---------X--------X
  //box View
  box: {
    height: 578,
  },
  list: {
    width: '100%',
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
    width: '70%',
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: 'white',
    color: 'black',
    marginVertical: 10,
    height: 50,
  },
  listItemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default App;
