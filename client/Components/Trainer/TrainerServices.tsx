import { StyleSheet, TextInput, Text, ScrollView, View, Button, Alert, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import { SelectList } from 'react-native-dropdown-select-list'

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerStyles: {
    width: '70%',
    backgroundColor: 'gray',
    color: 'white'
  }
})

export default function TrainerServices (props) {
  const { editing, selectedTags } = props
  const [servicesList, setServicesList] = React.useState([{ activity: '', cost: '', location: '', duration: '', difficulty: '', description: '' }])
  const activities = selectedTags // Assuming selectedTags contains the available activity options
  const costOptions = ['10', '20', '30']
  const durationOptions = ['1 Hour', '1.5 Hours', '2 Hours', '2.5 Hours', '3 Hours', '3.5 Hours', '4 Hours', '4.5 Hours', '5 Hours', '5.5 Hours', '6 Hours']
  const difficultyOptions = ['Entry', 'Intermediate', 'Hard']
  const [isPickerFocused, setIsPickerFocused] = useState()
  const [selected, setSelected] = React.useState('')

  const handleFocus = (focus) => { setIsPickerFocused(focus) }

  const handleServiceInputChange = (index, key, value) => {
    // Update the corresponding service in the list based on the input key
    const updatedServices = [...servicesList]
    updatedServices[index][key] = value
    setServicesList(updatedServices)
  }
  const addService = () => {
    // Add a new service to the list
    setServicesList([...servicesList, { activity: '', cost: '', location: '', duration: '', difficulty: '', description: '' }])
  }
  return (
    <View>
      {servicesList.map((service, index) => (
        <View key={index}>
          {editing ? (
            // Render input fields when editing
            <>
            {/* button to add another */}
            <Button title="Add Another Service" onPress={addService} />
            {/* text for which service number */}
              <Text>{`Service${index + 1}:`}</Text>
              {/* Select List for Activity */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Activity:</Text>
                  <SelectList
                    setSelected={(val) => { handleServiceInputChange(index, 'activity', val) }}
                    data={activities.map((activity) => ({ value: activity }))}
                    save="value"
                    maxHeightList={150}
                    placeholder={service.activity ? service.activity : 'Select Tags Before Activity'}
                  />
              </View>
              {/* Select List for Cost */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Cost:</Text>
                <SelectList
                  setSelected={(val) => { handleServiceInputChange(index, 'cost', val) }}
                  data={costOptions.map((cost) => ({ value: cost }))}
                  save="value"
                  maxHeightList={150}
                  placeholder={service.cost ? service.cost : 'Select Cost'}
                />
            </View>
            {/* Select List for Duration */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Duration:</Text>
                <SelectList
                  setSelected={(val) => { handleServiceInputChange(index, 'duration', val) }}
                  data={durationOptions.map((duration) => ({ value: duration }))}
                  save="value"
                  maxHeightList={150}
                  placeholder={service.duration ? service.duration : 'Select Duration'}
                />
            </View>
            {/* Select List for Difficulty */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Difficulty:</Text>
                <SelectList
                  setSelected={(val) => { handleServiceInputChange(index, 'difficulty', val) }}
                  data={difficultyOptions.map((difficulty) => ({ value: difficulty }))}
                  save="value"
                  maxHeightList={150}
                  placeholder={service.difficulty ? service.difficulty : 'Select Difficulty'}
                />
            </View>
              {/* Picker for Activity */}
              {/* <View style={styles.container}>
                <Text style={[styles.label, { marginRight: 5 }]}>Activity:</Text>
                <Picker
                  selectedValue={service.activity}
                  style={styles.pickerStyles}
                  onValueChange={(itemValue) => { handleServiceInputChange(index, 'activity', itemValue) }}
                  enabled={editing}
                >
                  <Picker.Item label="Select Tags Before Activity" value="" />
                  {activities.map((activity, i) => (
                    <Picker.Item key={i} label={activity} value={activity} />
                  ))}
                </Picker>
              </View> */}
              {/* Picker for cost */}
              {/* <View style={styles.container}>
                <Text style={[styles.label, { marginRight: 5 }]}>Cost:</Text>
                <Picker
                  selectedValue={service.cost}
                  style={styles.pickerStyles}
                  onValueChange={(itemValue) => { handleServiceInputChange(index, 'cost', itemValue) }}
                  enabled={editing}
                  mode={'dropdown'}
                  onBlur={() => { handleFocus(false) }}
                  onFocus={() => { handleFocus(true) }}
                >
                  <Picker.Item label="Select Cost" value="" />
                  {costOptions.map((cost, i) => (
                    <Picker.Item key={i} label={cost} value={cost} />
                  ))}
                </Picker>
              </View> */}
              {/* //text input for location */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Location:</Text>
                <TextInput
                  style={styles.input}
                  value={service.location}
                  placeholder="Enter Location"
                  onChangeText={(text) => { handleServiceInputChange(index, 'location', text) }}
                  editable={editing}
                />
              </View>
              {/* Picker for duration */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Duration:</Text>
                <Picker
                  selectedValue={service.duration}
                  style={styles.pickerStyles}
                  onValueChange={(itemValue) => { handleServiceInputChange(index, 'duration', itemValue) }}
                  enabled={editing}
                  mode={'dropdown'}
                  onBlur={() => { handleFocus(false) }}
                  onFocus={() => { handleFocus(true) }}
                >
                  <Picker.Item label="Select Duration" value="" />
                  {durationOptions.map((duration, i) => (
                    <Picker.Item key={i} label={duration} value={duration} />
                  ))}
                </Picker>
              </View> */}
              {/* Picker for difficulty */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Difficulty:</Text>
                <Picker
                  selectedValue={service.difficulty}
                  style={styles.pickerStyles}
                  onValueChange={(itemValue) => { handleServiceInputChange(index, 'difficulty', itemValue) }}
                  enabled={editing}
                  mode={'dropdown'}
                  onBlur={() => { handleFocus(false) }}
                  onFocus={() => { handleFocus(true) }}
                >
                  <Picker.Item label="Select Difficulty" value="" />
                  {difficultyOptions.map((difficulty, i) => (
                    <Picker.Item key={i} label={difficulty} value={difficulty} />
                  ))}
                </Picker>
              </View> */}
             {/* //text input for description */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Description:</Text>
                <TextInput
                  style={styles.input}
                  value={service.description}
                  placeholder="Enter Description"
                  onChangeText={(text) => { handleServiceInputChange(index, 'description', text) }}
                  editable={editing}
                />
              </View>
            </>
          ) : (
            // Render Service1 when not editing
            <View>
              <Text>{`Service ${index + 1}:`}</Text>
              {/* <Text>{`Activity: ${service.activity}`}</Text>
              <Text>{`Cost: ${service.cost}`}</Text>
              <Text>{`Location: ${service.location}`}</Text>
              <Text>{`Duration: ${service.duration}`}</Text>
              <Text>{`Difficulty: ${service.difficulty}`}</Text>
              <Text>{`Description: ${service.description}`}</Text> */}
              <Text>{`${service.activity} (${service.difficulty}) - $${service.cost} per session for ${service.duration} at ${service.location}`} </Text>
              <View style={{ flexDirection: 'row' }}>
                <Button title={'View Details'} onPress={() => Alert.alert(`${service.description}`)} />
                <Button title={'Book Now'} onPress={() => Alert.alert('Will send to calendar')} />
              </View>
              {/* Add other fields as needed */}
            </View>
          )}
        </View>
      ))}
    </View>
  )
};
