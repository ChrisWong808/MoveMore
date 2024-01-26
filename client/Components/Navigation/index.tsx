import React, { useState, useEffect } from 'react';
import { Buttons, General } from "../../assets/css"
import axios from 'axios';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, Button, Alert, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
import TrainerHome from "../Trainer/TrainerHome"
const Stack = createStackNavigator();

export default function RootNavigation() {
function onLogin () {
  if (username === '123' && password === '123') {
    setLogin(true);
    setRole('trainer');
    Alert.alert('Login successful');
  } else {
    setLogin(false);
    setRole('');
    Alert.alert('Invalid username or password')
  }
  return;
}
// const [text, setText] = React.useState('');
const [username, setUsername] = React.useState('');
const [password, setPassword] = React.useState('');
const [login, setLogin] = React.useState(false);
const [role, setRole] = React.useState('')


const handleTextChange = (text:string) => {
  // This function is called whenever the text input changes
  setUsername(text);
};

function Login() {
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
}

function handleAuth () {

  if(login) {
    return (
      <Stack.Screen options={{ headerShown: false }} name="TrainerHome" component={TrainerHome}/>
    )
  } else {
    return (
      <Stack.Screen name="Login" component={Login}/>
    )
  }
}

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {handleAuth()}
      </Stack.Navigator>
    </NavigationContainer>
  )
  // const { user } = useAuthentication();

  // return user ? <UserStack user={user} /> : <NewUsers />;
}



// import * as React from 'react';
// import { View, Text, Button } from 'react-native';
// import { NavigationContainer, DrawerActions } from '@react-navigation/native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';

// function Feed({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//       <Button
//         title="Open drawer"
//         onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//       />
//       <Button
//         title="Toggle drawer"
//         onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//       />
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications Screen</Text>
//     </View>
//   );
// }

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Close drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
//       />
//     </DrawerContentScrollView>
//   );
// }

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="Feed" component={Feed} />
//       <Drawer.Screen name="Notifications" component={Notifications} />
//     </Drawer.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }
