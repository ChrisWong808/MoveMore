// // for logged - in users
// import React, { useState, useEffect } from 'react';
// import Constants from 'expo-constants';
// import axios from 'axios';
// import { NavigationContainer, RouteProp } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import { View, Text, StatusBar, TouchableOpacity, Button, Pressable } from 'react-native';

// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { UserId } from '../utils/hooks/context';

// import HomeScreen from '../screens/Home';
// import MainPage from '../screens/MainPage';
// import FriendScreen from '../screens/Friends';
// import AccountScreen from '../screens/Account';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// interface TempScreenProps {
//   route: RouteProp<any, 'Profile'>;
// }

// function TempScreen({ route }: TempScreenProps) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>PROFILE!</Text>
//     </View>
//   );
// }

// interface UserStackProps {
//   user: any; // Replace 'any' with the correct type for your user object
// }

// export default function UserStack({ user }: UserStackProps) {
//   const auth = getAuth();

//   const [userId, setUserId] = useState<number | undefined>();
//   const [userName, setUserName] = useState<string | undefined>();

//   useEffect(() => {
//     if (user) {
//       setTimeout(() => {
//         axios.get(`http://${Constants.manifest?.extra?.apiUrl}/users/${user.uid}`)
//           .then((response) => {
//             setUserId(response.data.id);
//             setUserName(response.data.username);
//             axios.put(`http://${Constants.manifest?.extra?.apiUrl}/users/${response.data.id}`, {
//               online: true
//             });
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }, 300);
//     }
//   }, []);

//   const [drawerStatus, setDrawerStatus] = useState(true);

//   if (!userId) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#36393e', color: '#36393e' }}>
//         <Pressable style={{ color: '#36393e' }} onPress={() => signOut(auth)}>
//           <Text style={{ fontSize: 24, color: '#36393e' }}>
//             Log Out
//           </Text>
//         </Pressable>
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <UserId.Provider value={userId}>
//         <Tab.Navigator screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Main') {
//               iconName = focused
//                 ? 'home'
//                 : 'home-outline';
//             } else if (route.name === 'Friends') {
//               iconName = focused ? 'people' : 'people-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'information-circle' : 'information-circle-outline';
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#fff',
//           tabBarInactiveTintColor: '#fff',
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarStyle: { backgroundColor: '#36393e' }
//         })}>
//           <Tab.Screen name="Main">
//             {(props) => <MainPage {...props} setDrawerStatus={setDrawerStatus} />}
//           </Tab.Screen>
//           <Tab.Screen name="Friends" component={FriendScreen} />
//           <Tab.Screen name="Profile">
//             {(props) => <AccountScreen {...props} userName={userName} />}
//           </Tab.Screen>
//         </Tab.Navigator>
//       </UserId.Provider>
//     </NavigationContainer>
//   );
// }
