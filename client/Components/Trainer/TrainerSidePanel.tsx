// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import LandingScreen from '../screens/Landing';
// import SignInScreen from '../screens/SignIn';
// import SignUpScreen from '../screens/SignUp';

// const Stack = createStackNavigator();

// export default function AuthStack() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Welcome" component={LandingScreen} options={{ headerShown: false }} />
//         <Stack.Screen
//           name="Sign In"
//           component={SignInScreen}
//           options={{
//             headerStyle: { backgroundColor: '#36393e' },
//             headerTitleStyle: { color: '#fff' },
//             headerTintColor: '#fff',
//           }}
//         />
//         <Stack.Screen
//           name="Sign Up"
//           component={SignUpScreen}
//           options={{
//             headerStyle: { backgroundColor: '#36393e' },
//             headerTitleStyle: { color: '#fff' },
//             headerTintColor: '#fff',
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
