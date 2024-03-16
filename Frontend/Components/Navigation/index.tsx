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
// import { NavigationContainer } from '@react-navigation/native';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NavigationContainer, useNavigation } from '@react-navigation/native'; // Move useNavigation here
import { DrawerActions } from '@react-navigation/native'; // Remove useNavigation from here
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, ScrollView, View, Button, Alert, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
import TrainerHome from "../Trainer/TrainerHome"
import ClientHome from "../Client/ClientHome"

const Stack = createStackNavigator();

export default function RootNavigation() {
  // const [userAccId, setUserAccId] = useState(0);
  // const [userTrainerId, setUserTrainerId] = useState(0);
  // const [userClientId, setUserClientId] = useState(0);
  // data hold locally
  const [userAccount, setUserAccount] = useState({});
  const [userTrainer, setUserTrainer] = useState({});
  const [userClient, setUserClient] = useState({});
  // login data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState('');
  // create account data
  const [createUsername, setCreateUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [tempRole, setTempRole] = useState('client');
  const [termsConditions, setTermsConditions] = (useState(false));
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const presetTags = ['Aikido', 'Airsoft', 'Archery', 'Badminton', 'Baseball', 'Basketball', 'Biking', 'Bootcamp', 'Bowling', 'Boxing', 'Brazilian jiu-jitsu', 'Canoeing', 'Cross fit', 'Dancing', 'Diving', 'Dogs', 'Fishing', 'Football', 'Free Running', 'Golf', 'Gymnastics', 'Hiking', 'Hockey', 'Hunting', 'Ice Hockey', 'Ice Skating', 'Judo', 'Karate', 'Kayaking', 'Kickboxing', 'Kite surfing', 'Lacrosse', 'Marathon', 'Mixed Martial Arts', 'Muay Thai', 'Other', 'Paintball', 'Parkour', 'Pickleball', 'Ping Pong', 'Pokemon Go', 'Polo', 'Racquetball', 'Rafting', 'Rock Climbing', 'Roller Blading', 'Roller Skating', 'Rowing', 'Rugby', 'Running', 'Sailing', 'Scootering', 'Scuba Diving', 'Skateboarding', 'Skiing', 'Slacklining', 'Sledding', 'Snorkeling', 'Snowboarding', 'Soccer', 'Squash', 'Stand up paddleboard', 'Surfing', 'Swimming', 'Tennis', 'Triathlon', 'Ultimate Frisbee', 'Volleyball', 'Water Polo', 'Weight lifting', 'Windsurfing', 'Wrestling', 'Yoga', 'Zumba']
  // create trainer data
  const [trainerLocation, setTrainerLocation] = useState('SRID=4326;POINT(-73.935242 40.730610)')
  const [trainerTags, setTrainerTags] = useState([] as string[])
  const [equipment, setEquipment] = useState([])
  const [credentials, setCredentials] = useState([])
  const [socials, setSocials] = useState([])
  const [trainerBio, setTrainerBio] = useState('')

  // create client data
  const [clientLocation, setClientLocation] = useState('SRID=4326;POINT(-73.935242 40.730610)')
  const [clientTags, setClientTags] = useState([] as string[])
  const [goals, setGoals] = useState([]);
  const [clientBio, setClientBio] = useState('')

  const styles = StyleSheet.create({
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginVertical: 10,
      paddingHorizontal: 10
    },
    label: {
      marginTop: 10,
      marginBottom: 5
    },
    scrollViewContent: {
      // Ensure that the height is enough to accommodate all your components
      minHeight: '100%' // or a specific height
    },
    tagListContainer: {
      // So you can see all preset tags all at once and not 1 line long scroll
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start', // Align tags to the start (left) of the container
      marginBottom: 10, // Add some marginBottom for spacing
    },
    tagsNoEdit: {
      // works because text
      margin: 5,
      padding: 5,
      fontSize: 12, // Default font size
      borderWidth: 1,
      borderRadius: 5,
    },
    tagsWEdit: {
      // doesn't do anything cause button
      margin: 5,
      padding: 5,
      fontSize: 8, // Smaller font size for editing mode
      borderWidth: 1,
      borderRadius: 5,
      alignSelf: 'flex-start'
    }
  })

  // const navigation = useNavigation();
  // console.log('useNavigation:', useNavigation)

  useEffect(() => {
    // Set isNavigationReady to true when navigation is ready
    setIsNavigationReady(true);
  }, []);



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
      console.log('tempRole: ', tempRole)
    } else {
      setTempRole('client')
      console.log('tempRole: ', tempRole)
    }
  }

  function toggleTerms () {
    setTermsConditions(!termsConditions)
  }
  const handleCreateAcc = (
    // CreateTrainer: () => void,
    // CreateClient: () => void
    CreateTrainer: any, CreateClient: any
  ) => {
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
            console.log('tempRole inside CreateAccount:', tempRole)
            console.log('Create Trainer func inside CreateAccount', CreateTrainer)
            console.log('Create Client func inside CreateAccount', CreateClient)
            axios.post('http://localhost:3000/accounts', createData)
              .then((accountRes) => {
                console.log('Account created successfully:', accountRes.data);
                setUserAccount(accountRes.data);
                setRole(tempRole);
                if (tempRole === 'trainer') {
                  CreateTrainer();
                } else if (tempRole === 'client') {
                  CreateClient();
                }
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
  const handleClientTags = (tag: string) => {
    if (clientTags.includes(tag)) {
    // If the tag is already client, remove it
      setClientTags(clientTags.filter((clientTag) => clientTag !== tag))
    } else {
    // If the tag is not client, add it
      setClientTags([...clientTags, tag])
    }
  }

  function handleCreateClient () {
    const createClientData = {
      account_id: userAccount.account_id,
      location: clientLocation,
      tags: clientTags,
      goals: goals,
      bio: clientBio,
    };
    console.log('client data to send:', createClientData)
    axios.post('http://localhost:3000/clients', createClientData)
      .then((clientRes) => {
        const clientData = clientRes.data;
        console.log('Client data created successfully:', clientData);
        const emptyTrainer = {
          account_id: userAccount.account_id,
          location: trainerLocation,
          tags: trainerTags,
          equipment: equipment,
          credentials: credentials,
          socials: socials,
          bio: trainerBio,
        };
        axios.post('http://localhost:3000/trainers', emptyTrainer)
          .then((trainerRes) => {
            const trainerData = trainerRes.data;
            console.log('Empty trainer data created successfully:', trainerData);
            setUserClient(clientData);
            setUserTrainer(trainerData);
            setLogin(true);
          })
          .catch((trainerErr) => {
            console.error('Error creating empty trainer data:', trainerErr);
          });
      })
      .catch((clientErr) => {
        console.error('Error creating client data:', clientErr);
      });
  }
  const handleTrainerTags = (tag: string) => {
    if (trainerTags.includes(tag)) {
    // If the tag is already trainer, remove it
      setTrainerTags(trainerTags.filter((trainerTag) => trainerTag !== tag))
    } else {
    // If the tag is not trainer, add it
      setTrainerTags([...trainerTags, tag])
    }
  }
  function handleCreateTrainer() {
    const createTrainerData = {
      account_id: userAccount.account_id,
      location: trainerLocation,
      tags: trainerTags,
      equipment: equipment,
      credentials: credentials,
      socials: socials,
      bio: trainerBio,
    };
    console.log('trainer data to send:', createTrainerData)
    axios.post('http://localhost:3000/trainers', createTrainerData)
      .then((trainerRes) => {
        const trainerData = trainerRes.data;
        console.log('Trainer data created successfully:', trainerData);
        const emptyClient = {
          account_id: userAccount.account_id,
          location: clientLocation,
          tags: clientTags,
          goals: goals,
          bio: clientBio,
        };
        axios.post('http://localhost:3000/clients', emptyClient)
          .then((clientRes) => {
            const clientData = clientRes.data;
            console.log('Empty client data created successfully:', clientData);
            setUserClient(clientData);
            setUserTrainer(trainerData);
            setLogin(true);
          })
          .catch((clientErr) => {
            console.error('Error creating empty client data:', clientErr);
          });
      })
      .catch((trainerErr) => {
        console.error('Error creating trainer data:', trainerErr);
      });
  }
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
          <>
          <Stack.Screen name="Login">
            {({ navigation }) => (
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
                <Button
                onPress={() => navigation.navigate('CreateAccount')}
                title="Sign Up Now"
                color="#841584"
              />
              </View>
            )}
          </Stack.Screen>
          <Stack.Screen name="CreateAccount">
          {({ navigation }) => (
            <View style={General.text}>
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
              onPress={() => {
                console.log('tempRole on button press:', tempRole);
                handleCreateAcc(
                  () => navigation.navigate('CreateTrainer'),
                  () => navigation.navigate('CreateClient')
                );
              }}
              title="Handle Create Account"
              color="#841584"
            />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name="CreateTrainer">
          {() => (
            // <View style={General.text}>
                  <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
              <Text>Create Your Trainer Profile</Text>
              <Text>Select Services Provided</Text>
              <View style={styles.tagListContainer}>
                {presetTags.map((tag, index) => (
                  <Button
                    key={index}
                    title={tag}
                    onPress={() => { handleTrainerTags(tag) }}
                    color={trainerTags.includes(tag) ? 'green' : 'gray'}
                    titleStyle={styles.tagsWEdit}
                  />
                ))}
              </View>
              <TextInput
                onChangeText={(text) => setEquipment(text.split(','))}
                value={equipment.join(',')}
                placeholder="Enter Equipment"
              />
              <TextInput
                onChangeText={(text) => setCredentials(text.split(','))}
                value={credentials.join(',')}
                placeholder="Enter Credentials"
              />
              <TextInput
                onChangeText={(text) => setSocials(text.split(','))}
                value={socials.join(',')}
                placeholder="Enter Socials"
              />
              <TextInput
                onChangeText={(text) => setTrainerBio(text)}
                value={trainerBio}
                placeholder="Enter Bio"
              />
              <Button
                onPress={handleCreateTrainer}
                title="Create Trainer"
                color="#841584"
              />
             {/* </View> */}
            </ScrollView>
          )}
        </Stack.Screen>

        <Stack.Screen name="CreateClient">
          {() => (
            // <View style={General.text}>
            <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
              <Text>Create Your Client Profile</Text>
              <Text> Select Your Interests </Text>
              <View style={styles.tagListContainer}>
                {presetTags.map((tag, index) => (
                  <Button
                    key={index}
                    title={tag}
                    onPress={() => { handleClientTags(tag) }}
                    color={clientTags.includes(tag) ? 'green' : 'gray'}
                    titleStyle={styles.tagsWEdit}
                  />
                ))}
              </View>
              <TextInput
                onChangeText={(text) => setGoals(text.split(','))}
                value={goals.join(',')}
                placeholder="Enter Goals"
              />
              <TextInput
                onChangeText={(text) => setClientBio(text)}
                value={clientBio}
                placeholder="Enter Bio"
              />
              <Button
                onPress={handleCreateClient}
                title="Create Client"
                color="#841584"
              />
            {/* </View> */}
            </ScrollView>
          )}
        </Stack.Screen>
        </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
