import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RootNavigation  from './Components/Navigation'
import TrainerHome from './Components/Trainer/TrainerHome';
import TrainerProfile from './Components/Trainer/TrainerProfile';
import { General } from "./assets/css"

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={General.mainContainer}>
        <RootNavigation/>
  </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });