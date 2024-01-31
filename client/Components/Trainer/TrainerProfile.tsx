import { General } from './../../assets/css'
import { StyleSheet, TextInput, Text, ScrollView, View, Button, Alert, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Picker } from '@react-native-picker/picker'
import TrainerServices from './TrainerServices'

export default function TrainerProfile () {
  const [editing, setEditing] = useState(false) // Track if the user is in edit mode
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [name, setName] = React.useState('')
  const [selectedTags, setSelectedTags] = React.useState([] as string[])
  const [equipment, setEquipment] = React.useState('')
  const [credentials, setCredentials] = React.useState('')
  const [socials, setSocials] = React.useState('')
  const [reviews, setReviews] = React.useState('Reviews auto populate here')

  const presetTags = ['Aikido', 'Airsoft', 'Archery', 'Badminton', 'Baseball', 'Basketball', 'Biking', 'Bootcamp', 'Bowling', 'Boxing', 'Brazilian jiu-jitsu', 'Canoeing', 'Cross fit', 'Dancing', 'Diving', 'Dogs', 'Fishing', 'Football', 'Free Running', 'Golf', 'Gymnastics', 'Hiking', 'Hockey', 'Hunting', 'Ice Hockey', 'Ice Skating', 'Judo', 'Karate', 'Kayaking', 'Kickboxing', 'Kite surfing', 'Lacrosse', 'Marathon', 'Mixed Martial Arts', 'Muay Thai', 'Other', 'Paintball', 'Parkour', 'Pickleball', 'Ping Pong', 'Pokemon Go', 'Polo', 'Racquetball', 'Rafting', 'Rock Climbing', 'Roller Blading', 'Roller Skating', 'Rowing', 'Rugby', 'Running', 'Sailing', 'Scootering', 'Scuba Diving', 'Skateboarding', 'Skiing', 'Slacklining', 'Sledding', 'Snorkeling', 'Snowboarding', 'Soccer', 'Squash', 'Stand up paddleboard', 'Surfing', 'Swimming', 'Tennis', 'Triathlon', 'Ultimate Frisbee', 'Volleyball', 'Water Polo', 'Weight lifting', 'Windsurfing', 'Wrestling', 'Yoga', 'Zumba']

  const images = [require('./../../assets/pics/profile.png'), require('./../../assets/pics/equipment1.png'), require('./../../assets/pics/equipment2.png')/* Add more images here */]

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
    carouselContainer: {
      height: 200, // Set the height as needed
      marginVertical: 10
    }
  })

  const editTrainerProfile = () => {
    setEditing(!editing) // Toggle edit mode
  }

  const renderCarouselItem = ({ item }: { item: any }) => (
    <Image source={item} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} /> // resizeMode is contain or cover
  )

  const handleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
    // If the tag is already selected, remove it
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag))
    } else {
    // If the tag is not selected, add it
      setSelectedTags([...selectedTags, tag])
    }
  }

  const renderTagItem = ({ item }: { item: string }) => (
    <Button
      title={item}
      onPress={() => { handleTagSelection(item) }}
      color={selectedTags.includes(item) ? 'green' : 'gray'}
    />
  )

  const renderTagsSection = () => {
    if (editing) {
      return (
        <View>
          <Text>Tags:</Text>
          <FlatList
            data={presetTags}
            renderItem={renderTagItem}
            keyExtractor={(item) => item}
            horizontal
          />
        </View>
      )
    } else {
      return (
        <View>
          <Text>Selected Tags:</Text>
          <Text>{selectedTags.join(', ')}</Text>
        </View>
      )
    }
  }

  const handleInputChange = (key: string, value: string) => {
  // Update the corresponding state based on the input key
    switch (key) {
      case 'name':
        setName(value)
        break
      case 'equipment':
        setEquipment(value)
        break
      case 'credentials':
        setCredentials(value)
        break
      case 'socials':
        setSocials(value)
        break
        // Add more cases for other fields if needed
      default:
        break
    }
  }

  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
      <Text>Trainer Profile</Text>
      <Button title={editing ? 'Save' : 'Edit'} onPress={editTrainerProfile} />
      <Carousel
        data={images}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={300}
        // sliderHeight={400} // Adjust the height as needed
        // itemHeight={400}  // Adjust the height as needed
        onSnapToItem={(index) => { setCarouselIndex(index) }}
        containerCustomStyle={styles.carouselContainer}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={carouselIndex}
        containerStyle={{ marginTop: -20 }} // Adjust the position as needed
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots if needed
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.label, { marginRight: 5 }]}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter Name"
          onChangeText={(text) => { handleInputChange('name', text) }}
          editable={editing}
        />
      </View>
      {renderTagsSection()}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.label, { marginRight: 5 }]}>Equipment:</Text>
        <TextInput
          style={styles.input}
          value={equipment}
          placeholder="Enter Equipment"
          onChangeText={(text) => { handleInputChange('equipment', text) }}
          editable={editing}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.label, { marginRight: 5 }]}>Credentials:</Text>
        <TextInput
          style={styles.input}
          value={credentials}
          placeholder="Enter Credentials"
          onChangeText={(text) => { handleInputChange('credentials', text) }}
          editable={editing}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.label, { marginRight: 5 }]}>Socials:</Text>
        <TextInput
          style={styles.input}
          value={socials}
          placeholder="Enter Socials"
          onChangeText={(text) => { handleInputChange('socials', text) }}
          editable={editing}
        />
      </View>
      <TrainerServices {...{ editing, selectedTags }}/>
      <Text>Reviews:</Text>
      <Text>{reviews}</Text>

    </ScrollView>

  )
}
