import * as React from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationContainer, DrawerActions } from '@react-navigation/native'
import TrainerProfile from './TrainerProfile'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'
import PlanningCalendar from '../PlanningCalendar'
import ClientHome from '../Client/ClientHome'

function TrainerHomeContent (navigation) {
  return (
        <View>
        <Text>Trainer Home</Text>
        <Text>Calendar Goes Here</Text>
        <PlanningCalendar></PlanningCalendar>
      </View>
  )
}

function CustomDrawerContent (props) {
    // console.log('SetRole 3', props.setRole)
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <DrawerItem
        label="Switch Role"
        onPress={() => props.setRole('client')}
      />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator()

function MyDrawer ({role, setRole}) {
  // console.log('setRole 2', setRole)
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} role={role} setRole={setRole} />}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={TrainerHomeContent} />
      <Drawer.Screen name="Trainer Profile" component={TrainerProfile} />
    </Drawer.Navigator>
  )
}

export default function TrainerHome ({route}) {
  // console.log("prop:", prop)
  // let role = prop['role']
  // let setRole = prop['setRole']
  // console.log("role:", role, "setRole:", setRole)
  const { role, setRole } = route.params;

  // console.log("role:", role, "setRole1:", setRole);

  return (
      <MyDrawer role={role}
      setRole={setRole}
      />
  )
}
