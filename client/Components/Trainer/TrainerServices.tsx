import { StyleSheet, TextInput, Text, ScrollView, View, Button, Alert, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SelectList } from 'react-native-dropdown-select-list'

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  scrollViewContent: {
    // Ensure that the height is enough to accommodate all your components
    minHeight: '100%', // or a specific height
  },
  carouselContainer: {
    height: 200, // Set the height as needed
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerStyles: {
    width:'70%',
    backgroundColor:'gray',
    color:'white'
  }
});

export default function TrainerServices(props) {
  const {editing, selectedTags} = props;
  const [servicesList, setServicesList] = React.useState([{ activity: '', cost: '', location: '', difficulty: '' }]);
  const activities = selectedTags; // Assuming selectedTags contains the available activity options
  const costOptions = ['10', '20', '30'];
  const difficultyOptions = ['entry', 'intermediate', 'hard'];
  const [isPickerFocused,setIsPickerFocused]=useState()
  const [selected, setSelected] = React.useState("");

  const handleFocus=(focus)=>setIsPickerFocused(focus);

const data = [
    {key:'1', value:'Mobiles', disabled:true},
    {key:'2', value:'Appliances'},
    {key:'3', value:'Cameras'},
    {key:'4', value:'Computers', disabled:true},
    {key:'5', value:'Vegetables'},
    {key:'6', value:'Diary Products'},
    {key:'7', value:'Drinks'},
]



  const handleServiceInputChange = (index, key, value) => {
    // Update the corresponding service in the list based on the input key
    const updatedServices = [...servicesList];
    updatedServices[index][key] = value;
    setServicesList(updatedServices);
  };
  return (
    <View>
      {servicesList.map((service, index) => (
        <View key={index}>
          {editing ? (
            // Render input fields when editing
            <>
              <Text>{`Service${index + 1}:`}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Activity:</Text>
                {/* <Picker
                  selectedValue={service.activity}
                  style={[styles.input, { flex: 1 }]}
                  onValueChange={(itemValue) => handleServiceInputChange(index, 'activity', itemValue)}
                  enabled={editing}
                >
                  <Picker.Item label="Select Activity" value="" />
                  {activities.map((activity, i) => (
                    <Picker.Item key={i} label={activity} value={activity} />
                  ))}
                </Picker> */}
                  <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    maxHeightList={150}
                    placeholder="Select List there heeeeere"
                  />
                 <TouchableOpacity
                  onPress={() => {
                    // Add your logic to handle the press event and open the Picker
                    // For example, you can set a state to determine if the Picker should be shown
                  }}
                  style={{ flex: 1 }}
                >
                  <TextInput
                    style={styles.input}
                    value={service.activity}
                    placeholder="Select Activity"
                    editable={false} // Disable direct editing
                  />
                </TouchableOpacity>
                <Picker
                  selectedValue={service.activity}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue) => handleServiceInputChange(index, 'activity', itemValue)}
                >
                  <Picker.Item label="Select Activity" value="" />
                  {activities.map((activity, i) => (
                    <Picker.Item key={i} label={activity} value={activity} />
                  ))}
                </Picker>
              </View>
              <View style={styles.container}>
                <Text style={[styles.label, { marginRight: 5 }]}>Cost:</Text>
                <Picker
                  selectedValue={service.cost}
                  style={styles.pickerStyles}
                  onValueChange={(itemValue) => handleServiceInputChange(index, 'cost', itemValue)}
                  enabled={editing}
                  mode={'dropdown'}
                  onBlur={()=>handleFocus(false)}
                  onFocus={()=>handleFocus(true)}
                >
                  <Picker.Item label="Select Cost" value="" />
                  {costOptions.map((cost, i) => (
                    <Picker.Item key={i} label={cost} value={cost} />
                  ))}
                </Picker>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Location:</Text>
                <TextInput
                  style={styles.input}
                  value={service.location}
                  placeholder="Enter Location"
                  onChangeText={(text) => handleServiceInputChange(index, 'location', text)}
                  editable={editing}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.label, { marginRight: 5 }]}>Difficulty:</Text>
                <Picker
                  selectedValue={service.difficulty}
                  style={[styles.input, { flex: 1 }]}
                  onValueChange={(itemValue) => handleServiceInputChange(index, 'difficulty', itemValue)}
                  enabled={editing}
                >
                  <Picker.Item label="Select Difficulty" value="" />
                  {difficultyOptions.map((difficulty, i) => (
                    <Picker.Item key={i} label={difficulty} value={difficulty} />
                  ))}
                </Picker>
              </View>
            </>
          ) : (
            // Render Service1 when not editing
            <View>
              <Text>Service1:</Text>
              <Text>{`Activity: ${service.activity}`}</Text>
              <Text>{`Cost: ${service.cost}`}</Text>
              <Text>{`Location: ${service.location}`}</Text>
              <Text>{`Difficulty: ${service.difficulty}`}</Text>
              {/* Add other fields as needed */}
            </View>
          )}
        </View>
      ))}
    </View>
  );

};