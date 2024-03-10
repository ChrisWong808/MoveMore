import { General } from './../../assets/css'
import { StyleSheet, TextInput, Text, View, ScrollView, Button, Alert, Image } from 'react-native'
import ClientProfile from './ClientProfile'
import { NavigationContainer, DrawerActions } from '@react-navigation/native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'
import { Picker } from '@react-native-picker/picker'
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import StarRating from 'react-native-star-rating'

import TrainerSidePanel from '../SidePanel/'
import TrainerList from './TrainerList'
import TrainerCard from './TrainerCard'

function ClientHomeContent () {
  const [distanceFilter, setDistanceFilter] = useState(0);
  const [activityFilter, setActivityFilter] = useState('');
  const [costFilter, setCostFilter] = useState(0);

  const images = [require('./../../assets/pics/profile.png'), require('./../../assets/pics/equipment1.png'), require('./../../assets/pics/equipment2.png')/* Add more images here */]

  const sampleTrainerCards = [
    {
      UID: 1,
      CardPic: images[0],
      CardName: 'trainer 1',
      CardRate: 4,
      CardNumReviews: 12,
      // CardTags: ['basketball $40', 'tennis $50', 'soccer'],
      CardServices: ['basketball', 40, 'tennis', 50, 'soccer', 30],
      // ['basketball (advanced) - $40 per session for 1 hour at Manana Park', 'tennis (intermediate) - $50 per session for 1 hour at Ala Moana Park', 'soccer (entry) - $30 per session for 1 hour at Ala Moana Park '],
      DistanceAway: 5
    },
    {
      UID: 2,
      CardPic: images[1],
      CardName: 'trainer 2',
      CardRate: 3.5,
      CardNumReviews: 8,
      // CardTags: ['hiking', 'surfing', 'running'],
      CardServices: ['hiking', 10, 'surfing', 80, 'running', 10],
      // ['hiking (entry) - $10 per session for 1 hour at Makapuu Light house', 'surfing (intermediate) - $80 per session for 1 hour at Ala Moana Park', 'running (entry) - $10 per session for 1 hour at Ala Moana Park '],
      DistanceAway: 15
    },
    {
      UID: 3,
      CardPic: images[0],
      CardName: 'trainer 3',
      CardRate: 5,
      CardNumReviews: 6,
      // CardTags: ['football', 'racketball', 'volleyball'],
      CardServices: ['football', 30, 'racketball', 40, 'volleyball', 50],
      // ['football (intermediate) - $30 per session for 1 hour at Manana Park', 'racketball (intermediate) - $40 per session for 1 hour at Ala Moana Park', 'volleyball (entry) - $50 per session for 1 hour at Ala Moana Park '],
      DistanceAway: 50
    },
    {
      UID: 4,
      CardPic: images[2],
      CardName: 'trainer 4',
      CardRate: 4,
      CardNumReviews: 10,
      // CardTags: ['Stand up Paddleboard', 'MMA', 'dancing'],
      CardServices: ['Stand up Paddleboard', 50, 'MMA', 80, 'dancing', 100],
      // ['Stand up Paddleboard (entry) - $50 per session for 1 hour at Manana Park', 'MMA (intermediate) - $80 per session for 1 hour at Ala Moana Park', 'dancing (advanced) - $100 per session for 1 hour at Ala Moana Park '],
      DistanceAway: 75
    }
  ]

  const [filteredTrainerCards, setFilteredTrainerCards] = useState(sampleTrainerCards);


  const styles = StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardContainer: {
      margin: 10,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      alignItems: 'center',
      width: 160,
      // Not letting me do percents
      // width: 48%
    },
    cardImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    ratingContainer: {
      flexDirection: 'row', // Display items in a row
      alignItems: 'center', // Align items vertically in the center
      marginBottom: 5,
    },
  })
  function moveToTrainerProfile () {
    'idk cause this is in side panel, same with toggle to client hi'
  }
  function moveToInbox () {
  }

  const handleFilterPress = () => {
    // Implement your filtering logic here based on the state variables
    const filteredCards = sampleTrainerCards.filter((trainer) => {
      return (
        (distanceFilter === 0 || trainer.DistanceAway <= distanceFilter) &&
        (activityFilter === '' || trainer.CardServices.includes(activityFilter)) &&
        (costFilter === 0 || trainer.CardServices.some((item, index) => index % 2 === 1 && item <= costFilter))
      );
    });

    // Set the filtered cards in the state
    setFilteredTrainerCards(filteredCards);
    // console.log('filteredCards:', filteredCards)
  };


  const TrainerCard = ({ trainer }) => {
    const { CardPic, CardName, CardRate, CardNumReviews, CardTags, CardServices } = trainer;
    return (
      <View style={styles.cardContainer}>
        <Image source={CardPic} style={styles.cardImage} />
        <Text>{CardName}</Text>
        <View style={styles.ratingContainer}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={CardRate}
            fullStarColor={'gold'}
            halfStarColor={'gold'}
            starSize={25}
          />
          <Text>({CardNumReviews})</Text>
        </View>
        <Text>
        {/* Iterate over CardServices array and format activity and cost */}
        {CardServices.map((item, index) => {
          // Check if the current item is an activity
          if (index % 2 === 0) {
            const activity = item;
            const cost = CardServices[index + 1];
            return (
              <Text key={index}>{`${activity} $${cost}`}, </Text>
            );
          }
          return null;
        })}
      </Text>
    </View>
    );
  };

  return (
      <View style={General.mainContainer}>
        <Text>Client Home</Text>
        {/* Add UI elements for filter input */}
      <Text>Distance Away:</Text>
      <Slider
        value={distanceFilter}
        onValueChange={(value) => setDistanceFilter(value)}
        minimumValue={0}
        maximumValue={100}
        step={1}
      />
      <Text>{`Distance: ${distanceFilter} miles`}</Text>

      <Text>Activity:</Text>
      <Picker
        selectedValue={activityFilter}
        onValueChange={(value) => setActivityFilter(value)}
      >
        {/* Add activity options based on your data */}
        <Picker.Item label="Select Activity" value="" />
        <Picker.Item label="basketball" value="basketball" />
        {/* Add more activity options */}
      </Picker>

      <Text>Cost:</Text>
      <Slider
        value={costFilter}
        onValueChange={(value) => setCostFilter(value)}
        minimumValue={0}
        maximumValue={100}
        step={1}
      />
      <Text>{`$${costFilter}`}</Text>

      {/* Add filter button */}
      <Button title="Filter" onPress={handleFilterPress} />

        <ScrollView>
      {filteredTrainerCards.map((trainer, index) => (
      // {sampleTrainerCards.map((trainer, index) => (
        // <TrainerCard key={index} trainer={trainer} />
        // Check if the current index is even and prev dups trainer 1,2,2,3,3 cause was making 2 cards with each iteration
        index % 2 === 0 && (
        // View Container to see 2 side by side
          <View key={index} style={styles.rowContainer}>
            <TrainerCard trainer={trainer} />
            {/* Check if there's another trainer to display */}
            {index + 1 < filteredTrainerCards.length && (
              <TrainerCard trainer={filteredTrainerCards[index + 1]} />
            )}
          </View>
        )
      ))}
    </ScrollView>
      </View>

  )
}

function CustomDrawerContent (props) {
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
        onPress={() => props.setRole('trainer')}
      />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator()

function MyDrawer ({role, setRole}) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} role={role} setRole={setRole}/>}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={ClientHomeContent} />
      <Drawer.Screen name="Client Profile" component={ClientProfile} />
    </Drawer.Navigator>
  )
}

export default function ClientHome ({route}) {
  const { role, setRole } = route.params;
  // console.log("role:", role, "setRole:", setRole)

  return (

      <MyDrawer role={role}
      setRole={setRole}
      />
  )
}