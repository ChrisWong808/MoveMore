// import React, { useState, useEffect } from 'react';
// import { Buttons, General } from "../../assets/css"
// import axios from 'axios';
// import { LogBox } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, TextInput, Text, View, Button, Alert, Image } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';

// LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
// import TrainerHome from "../Trainer/TrainerHome"
// const Stack = createStackNavigator();

// export default function RootNavigation() {

// function onLogin () {
//   if (username === '123' && password === '123') {
//     setLogin(true);
//     setRole('trainer');
//     Alert.alert('Login successful');
//   } else {
//     setLogin(false);
//     setRole('');
//     Alert.alert('Invalid username or password')
//   }
//   return;
// }
// // const [text, setText] = React.useState('');
// const [username, setUsername] = React.useState('');
// const [password, setPassword] = React.useState('');
// const [login, setLogin] = React.useState(false);
// const [role, setRole] = React.useState('')

// function Login() {
//   return (
//     <View style={General.text}>
//       <Text>Welcome</Text>
//     <TextInput
//       // style={styles.input}
//       onChangeText={(text) => {
//         setUsername(text)
//       }}
//       value={username}
//       placeholder="Enter Username"
//       // keyboardType="text"
//     />
//     <TextInput
//       // style={styles.input}
//       onChangeText={(text) => {
//         setPassword(text)
//       }}
//       value={password}
//       placeholder="Enter Password"
//     />
//     <Button title="Submit"

// onPress={onLogin}
// title="Login"
// color="#841584"
// accessibilityLabel="Learn more about this purple button"
// />
// </View>
//   )
// }

// function handleAuth () {

//   if(login) {
//     return (
//       <Stack.Screen options={{ headerShown: false }} name="TrainerHome" component={TrainerHome}/>
//     )
//   } else {
//     return (
//       <Stack.Screen name="Login" component={Login}/>
//     )
//   }
// }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {handleAuth()}
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
//   // const { user } = useAuthentication();

//   // return user ? <UserStack user={user} /> : <NewUsers />;
// }



// // import * as React from 'react';
// // import { View, Text, Button } from 'react-native';
// // import { NavigationContainer, DrawerActions } from '@react-navigation/native';
// // import {
// //   createDrawerNavigator,
// //   DrawerContentScrollView,
// //   DrawerItemList,
// //   DrawerItem,
// // } from '@react-navigation/drawer';

// // function Feed({ navigation }) {
// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Text>Feed Screen</Text>
// //       <Button
// //         title="Open drawer"
// //         onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
// //       />
// //       <Button
// //         title="Toggle drawer"
// //         onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
// //       />
// //     </View>
// //   );
// // }

// // function Notifications() {
// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Text>Notifications Screen</Text>
// //     </View>
// //   );
// // }

// // function CustomDrawerContent(props) {
// //   return (
// //     <DrawerContentScrollView {...props}>
// //       <DrawerItemList {...props} />
// //       <DrawerItem
// //         label="Close drawer"
// //         onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
// //       />
// //       <DrawerItem
// //         label="Toggle drawer"
// //         onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
// //       />
// //     </DrawerContentScrollView>
// //   );
// // }

// // const Drawer = createDrawerNavigator();

// // function MyDrawer() {
// //   return (
// //     <Drawer.Navigator
// //       drawerContent={(props) => <CustomDrawerContent {...props} />}
// //     >
// //       <Drawer.Screen name="Feed" component={Feed} />
// //       <Drawer.Screen name="Notifications" component={Notifications} />
// //     </Drawer.Navigator>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <NavigationContainer>
// //       <MyDrawer />
// //     </NavigationContainer>
// //   );
// // }


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
import ClientHome from "../Client/ClientHome"

const Stack = createStackNavigator();

export default function RootNavigation() {
  const [userAccId, setUserAccId] = useState(0);
  const [userTrainerId, setUserTrainerId] = useState(0);
  const [userClientId, setUserClientId] = useState(0);
  const [userAccount, setUserAccount] = useState({});
  const [userTrainer, setUserTrainer] = useState({});
  const [userClient, setUserClient] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState('');
  const [createUsername, setCreateUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [tempRole, setTempRole] = useState('client');
  const [termsConditions, setTermsConditions] = (useState(false));

  function onLogin () {
    // if (username === '123' && password === '123') {
    //   setLogin(true);
    //   setRole('trainer');
    //   Alert.alert('Login successful as Trainer');
    // } else if (username === '321' && password === '321') {
    //   setLogin(true);
    //   setRole('client');
    //   Alert.alert('Login successful as Client');
    // }
    // else {
    //   setLogin(false);
    //   setRole('');
    //   Alert.alert('Invalid username or password')
    // }
    // return;
    const userData = {
      username: username,
      password: password,
    };
    axios.post('http://localhost:3000/accounts/login', userData)
      .then((res) => {
        const accountData = res.data;
        setRole(accountData.role);
        setUserAccount(accountData)
        console.log('userAccountData:', accountData)
        // setUserAccId(accountData.account_id);

        axios.get(`http://localhost:3000/trainers/${accountData.account_id}`)
          .then((trainerRes) => {
            // setUserTrainerId(trainerRes.data.trainer_id);
            setUserTrainer(trainerRes.data);
            console.log('userTrainerData:', trainerRes.data)
          })
          .catch((trainerErr) => {
            console.error('Error fetching trainer data:', trainerErr);
          });

        axios.get(`http://localhost:3000/clients/${accountData.account_id}`)
          .then((clientRes) => {
            setUserClient(clientRes.data);
            // setUserClientId(clientRes.data.client_id);
            console.log('userClientData:', clientRes.data)
            setLogin(true);
          })
          .catch((clientErr) => {
            console.error('Error fetching client data:', clientErr);
          });
      })
      .catch((err) => {
        Alert.alert('Invalid username or password')
        console.log('Error: ', err);
      });
  }


  function forgotPass () {
    //axios request to username and send an email to email for temp password
    Alert.alert('Well that sucks!')
  }

  function toggleTempRole () {
    if (tempRole === 'client') {
      setTempRole('trainer')
    } else {
      setTempRole('client')
    }
  }

  function toggleTerms () {
    setTermsConditions(!termsConditions)
  }
  const handleCreateAcc = () => {
    if (createPassword !== confirmPassword) {
      Alert.alert('Passwords do not match');
    } else if (!termsConditions) {
      Alert.alert('Agreeing to Terms and Conditions is required for app use');
    } else {
      // idk how but later somehow email verification and/or phone number
      // Check username existence on the server
      axios.get(`http://localhost:3000/accounts/check-username/${createUsername}`)
        .then((res) => {
          if (res.data.exists) {
            Alert.alert('Username is already taken!');
          } else {
            // Proceed with account creation
            const createData = {
              username: createUsername,
              password: createPassword,
              role: tempRole,
              first_name: firstName,
              last_name: lastName,
              phone_number: phoneNumber,
              email: createEmail,
            };

            axios.post('http://localhost:3000/accounts', createData)
              .then((accountRes) => {
                setUserAccount(accountRes.data);
                console.log('Account created successfully:', accountRes.data);
                // Additional actions or navigation can be performed here
              })
              .catch((accountErr) => {
                console.error('Error creating account data:', accountErr);
              });
          }
        })
        .catch((err) => {
          console.log('Error checking username existence:', err);
        });
    }
  };


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {login ? (
          role === 'trainer' ? (
            <Stack.Screen options={{ headerShown: false }} name="TrainerHome" component={TrainerHome} initialParams={{role: role, setRole: setRole}}/>
          ) : (
            <Stack.Screen options={{ headerShown: false }} name="ClientHome" component={ClientHome} initialParams={{role: role, setRole: setRole}}/>
          )
          // <Stack.Screen options={{ headerShown: false }} name="TrainerHome" component={TrainerHome} />
        ) : (
          <Stack.Screen name="Login">
            {() => (
              <View style={General.text}>
                <Text>Welcome</Text>
                <Text>Login</Text>
                <TextInput
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                  placeholder="Enter Username"
                />
                <TextInput
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  placeholder="Enter Password"
                />
                <Button
                  onPress={forgotPass}
                  title="Forgot Password"
                  color="#841584"
                />
                <Button
                  onPress={onLogin}
                  title="Login"
                  color="#841584"
                />
                <View>
                  <Text></Text>
                </View>
                <View>
                  <Text>Create Account</Text>
                  <TextInput
                  onChangeText={(text) => setCreateUsername(text)}
                  value={createUsername}
                  placeholder="Enter Username"
                  />
                  <TextInput
                  onChangeText={(text) => setCreatePassword(text)}
                  value={createPassword}
                  placeholder="Enter Password"
                  />
                  <TextInput
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  />
                  <TextInput
                  onChangeText={(text) => setFirstName(text)}
                  value={firstName}
                  placeholder="Enter First Name"
                  />
                  <TextInput
                  onChangeText={(text) => setLastName(text)}
                  value={lastName}
                  placeholder="Enter Last Name"
                  />
                  <TextInput
                  onChangeText={(text) => setCreateEmail(text)}
                  value={createEmail}
                  placeholder="Enter Email"
                  />
                  <TextInput
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={phoneNumber}
                  placeholder="Enter Phone Number"
                  />
                </View>
                <Text>Are you a Client or a Trainer?</Text>
                <Button
                  onPress={toggleTempRole}
                  title={tempRole}
                  color="#841584"
                />
                <Text>Agree to our Terms and Conditions</Text>
                <Button
                  onPress={toggleTerms}
                  title={termsConditions ? 'True' : 'False'}
                  color="#841584"
                />
                <Button
                  onPress={handleCreateAcc}
                  title='Create Account'
                  color="#841584"
                />
              </View>

            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
