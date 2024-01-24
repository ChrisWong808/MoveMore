// app-wide navigation for all states
import React, { useState, useEffect } from 'react';
import { Buttons, General } from "../../assets/css"
// import { useAuthentication } from '../utils/hooks/useAuthentication';
// import UserStack from './userStack';
// import NewUser from './NewUser';
import axios from 'axios';
// import { getAuth, signOut } from 'firebase/auth';
import { LogBox } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, Button, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

export default function RootNavigation() {
  // const auth = getAuth();
  // signOut(auth);
function onLogin () {
  if (username === '123' && password === '123') {
    setLogin({loggedIn: true, role: 'trainer'})
    Alert.alert('Login successful');
  } else {
    setLogin({loggedIn: false, role: ''});
    Alert.alert('Invalid username or password')
  }
  return;
}
// const [text, setText] = React.useState('');
const [username, setUsername] = React.useState('');
const [password, setPassword] = React.useState('');
const [login, setLogin] = React.useState({loggedIn: false, role: ''});

const handleTextChange = (text:string) => {
  // This function is called whenever the text input changes
  setUsername(text);
};


const navigation = useNavigation();


useEffect(() => {
  if (login['loggedIn']) {
    // Navigate to another screen when inputText is '123'
    navigation.navigate('TrainerHome');
  }
}, [login, navigation]);

  return (
      <View style={General.text}>
        <Text>Welcome</Text>
      <TextInput
        // style={styles.input}
        onChangeText={(text) => {
          setUsername(text)
        }}
        value={username}
        placeholder="Enter Username"
        // keyboardType="text"
      />
      <TextInput
        // style={styles.input}
        onChangeText={(text) => {
          setPassword(text)
        }}
        value={password}
        placeholder="Enter Password"
      />
      <Button title="Submit"

  onPress={onLogin}
  title="Login"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
      </View>

  )
  // const { user } = useAuthentication();

  // return user ? <UserStack user={user} /> : <NewUsers />;
}