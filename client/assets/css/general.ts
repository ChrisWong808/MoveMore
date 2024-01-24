'use strict';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  SectionList,
  Button,
  SafeAreaView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     backgroundColor: '#5865f2',
//     flex: 1,
//     justifyContent: 'flex-start',
//   },
//   item: {
//     padding: 10,
//     justifyContent: 'center',
//     fontSize: 14,
//     height: 50,
//     borderBottomWidth: 1,
//     borderColor: '#17181e',
//     color: '#fff',
//   },
//   page: {
//     backgroundColor: '#36393e',
//     height,
//   },
//   header: {
//     color: '#fff',
//     fontSize: 36,
//     paddingLeft: 30,
//     padding: 10,
//     width,
//     backgroundColor: '#5865f2',
//     borderBottomWidth: .5,
//     borderColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     color: '#fff',
//   },
// });
const General = StyleSheet.create({
   mainContainer: {
    display: 'flex',
    backgroundColor: '#5865f2',
    flex: 1,
    justifyContent: 'flex-start',
    //  width: 15,
    //  height: 25
   },


   test: {
    display: 'flex',
    backgroundColor: '#5865f2',
    flex: 1,
    justifyContent: 'flex-start',
   }
 });


module.exports = General;



/* import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text style={styles.title}>React Native</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App; */