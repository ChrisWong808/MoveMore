import { General } from "./../../assets/css"
import { StyleSheet, TextInput, Text, View, Button, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function TrainerHome() {

  const navigation = useNavigation();

  return (
      <View style={General.mainContainer}>
        <Text>Trainer Home</Text>
        <Text>Calendar Goes Here</Text>
        <View style={{ width: 250 }}>
        <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
        <Text>Update check 2</Text>
        <Button title="Temp to Profile should be inside Drawer" onPress={() => navigation.navigate('TrainerProfile')} />
      </View>
      </View>

  )
}