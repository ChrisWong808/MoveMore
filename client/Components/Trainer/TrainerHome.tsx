import { General } from "./../../assets/css"
import { StyleSheet, TextInput, Text, View, Button, Alert, Image } from 'react-native';

export default function TrainerHome(navigation) {


  return (
      <View style={General.mainContainer}>
        <Text>Trainer Home</Text>
        <Text>Calendar Goes Here</Text>
        <View style={{ width: 250 }}>
        <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      </View>
      </View>

  )
}