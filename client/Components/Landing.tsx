// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import bee from '../assets/bee.png';

// interface LandingProps {
//   navigation: any; // You might want to replace 'any' with the correct type for your navigation prop
// }

// const width = Dimensions.get('window').width;

// const Landing: React.FC<LandingProps> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.topContainer}>
//         <Text style={styles.name}>RIFF</Text>
//         <View style={styles.beeContainer}>
//           <Image source={bee} style={styles.beeImg} />
//         </View>
//       </View>
//       <View style={styles.bottomContainer}>
//         <Text style={styles.welcome}>Welcome to Riff</Text>
//         <Text style={styles.tagline}>Join people who use Riff to talk</Text>
//         <Text style={styles.tagline}>with communities and friends.</Text>
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')}>
//           <Text style={styles.buttonText}>Register</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#36393e',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   topContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   bottomContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: 30,
//     flexDirection: 'column',
//   },
//   name: {
//     fontSize: 48,
//     color: '#fff',
//   },
//   button: {
//     backgroundColor: '#7289da',
//     padding: 12,
//     borderRadius: 8,
//     marginVertical: 10,
//     width: width * 0.8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   beeContainer: {
//     position: 'absolute',
//     top: 60,
//     left: 20,
//   },
//   beeImg: {
//     width: 60,
//     height: 60,
//   },
//   welcome: {
//     fontSize: 20,
//     color: 'white',
//     padding: 10,
//   },
//   tagline: {
//     color: '#7F7F7F',
//     paddingTop: 10, // Corrected to paddingTop
//   },
// });

// export default Landing;
