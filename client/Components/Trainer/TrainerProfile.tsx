import { General } from './../../assets/css'
import { StyleSheet, TextInput, Text, ScrollView, View, Button, Alert, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Picker } from '@react-native-picker/picker'
import TrainerServices from './TrainerServices'
import StarRating from 'react-native-star-rating'

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

  const sampleRatingAndReviews = [{ username: 'user 1', time: '1/2/2023 at 1:00pm', service: 'tennis', rating: 5, comment: 'very good' }, { username: 'user 2', time: '1/2/2024 at 2:00pm', service: 'basketball', rating: 4, comment: ' good' }, { username: 'user 3', time: '8/5/2023 at 3:00pm', service: 'bowling', rating: 3, comment: 'was alright' }]



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
    },
    tagListContainer: {
      // So you can see all preset tags all at once and not 1 line long scroll
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start', // Align tags to the start (left) of the container
      marginBottom: 10, // Add some marginBottom for spacing
    },
    tagsNoEdit: {
      // works because text
      margin: 5,
      padding: 5,
      fontSize: 12, // Default font size
      borderWidth: 1,
      borderRadius: 5,
    },
    tagsWEdit: {
      // doesn't do anything cause button
      margin: 5,
      padding: 5,
      fontSize: 8, // Smaller font size for editing mode
      borderWidth: 1,
      borderRadius: 5,
      alignSelf: 'flex-start'
    },
    averageRatingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    averageRatingText: {
      marginRight: 10,
    },
    individualRatingsContainer: {},
    individualRatingItem: {
      marginBottom: 10, // Adjust this value to control the space between individual rating items
      flexDirection: 'column', // Ensure the children are stacked vertically
      alignItems: 'flex-start', // Align children to the start (left) of the container
    },
    individualRatingText: {
      fontWeight: 'bold',
      marginBottom: 5,
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
          {/* <FlatList
            data={presetTags}
            renderItem={renderTagItem}
            keyExtractor={(item) => item}
            horizontal
          /> */}
          <View style={styles.tagListContainer}>
          {presetTags.map((tag, index) => (
            <Button
              key={index}
              title={tag}
              onPress={() => { handleTagSelection(tag) }}
              color={selectedTags.includes(tag) ? 'green' : 'gray'}
              titleStyle={styles.tagsWEdit}
            />
          //   <View key={index}>
          //   <Button
          //     key={index}
          //     title={tag}
          //     onPress={() => { handleTagSelection(tag) }}
          //     color={selectedTags.includes(tag) ? 'green' : 'gray'}
          //   />
          //   <Text style={styles.tagsWEdit}>{tag}</Text>
          // </View>
          ))}
        </View>
        </View>
      )
    } else {
      return (
        <View>
          <Text>Selected Tags:</Text>
          <Text style={styles.tagsNoEdit}>{selectedTags.join(', ')}</Text>
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

  const calcAvgRating = () => {
    if (sampleRatingAndReviews.length === 0) {
      return 0;
    }
    const totalRating = sampleRatingAndReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / sampleRatingAndReviews.length;
  };

  const avgRating = calcAvgRating()

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
      {/* <Text>Reviews:</Text>
      <Text>{reviews}</Text> */}

      {/* Display Average Rating */}
      <View style={styles.averageRatingContainer}>
        <Text style={styles.averageRatingText}>{`Average Rating: ${avgRating.toFixed(1)}/5`}</Text>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={avgRating}
          fullStarColor={'gold'}
          halfStarColor={'gold'}
          starSize={25}
        />
        <Text>{`(${sampleRatingAndReviews.length} Ratings)`}</Text>
      </View>

      {/* Display Individual Ratings and Reviews */}
      <View style={styles.individualRatingsContainer}>
        {sampleRatingAndReviews.map((review, index) => (
          <View key={index} style={styles.individualRatingItem}>
            <Text style={styles.individualRatingText}>{`${review.username} - Rating: ${review.rating}/5`}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={review.rating}
              fullStarColor={'gold'}
              halfStarColor={'gold'}
              starSize={20}
            />
            <Text>{`Service: ${review.service}`}</Text>
            <Text>{`Time: ${review.time}`}</Text>
            <Text>{`Comment: ${review.comment}`}</Text>
          </View>
        ))}
      </View>
    </ScrollView>

  )
}
