import { General } from "./../../assets/css"
import { StyleSheet, TextInput, Text, ScrollView, View, Button, Alert, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function TrainerProfile() {

const [editing, setEditing] = useState(false); // Track if the user is in edit mode
const [name, setName] = React.useState('Name');
const [tags, setTags] = React.useState('Tags');
const [selectedTags, setSelectedTags] = React.useState([] as string[]);
const [equipment, setEquipment] = React.useState('Equipment');
const [credentials, setCredentials] = React.useState('Credentials');
const [socials, setSocials] = React.useState('socials');
const [services, setServices] = React.useState('Services');
const [serviceDescription, setServiceDescription] = React.useState('ServiceDescription');
const [reviews, setReviews] = React.useState('Reviews');

const presetTags = ['Basketball', 'Tennis', 'Soccer', 'Volleyball'];

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

const editTrainerProfile = () => {
  setEditing(!editing); // Toggle edit mode
};

const handleTagSelection = (tag: string) => {
  if (selectedTags.includes(tag)) {
    // If the tag is already selected, remove it
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  } else {
    // If the tag is not selected, add it
    setSelectedTags([...selectedTags, tag]);
  }
};

const renderTagItem = ({ item }: { item: string }) => (
  <Button
    title={item}
    onPress={() => handleTagSelection(item)}
    color={selectedTags.includes(item) ? 'green' : 'gray'}
  />
);

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
    );
  } else {
    return (
      <View>
        <Text>Selected Tags:</Text>
        <FlatList
          data={selectedTags}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item) => item}
          horizontal
        />
      </View>
    );
  }
};

const handleInputChange = (key: string, value: string) => {
  // Update the corresponding state based on the input key
  switch (key) {
    case 'name':
      setName(value);
      break;
    case 'tags':
      setTags(value);
      break;
    case 'equipment':
      setEquipment(value);
      break;
    case 'credentials':
        setCredentials(value);
        break;
    case 'socials':
      setSocials(value);
      break;
    case 'services':
      setServices(value);
      break;
    case 'serviceDescription':
        setServiceDescription(value);
        break;
    // Add more cases for other fields if needed
    default:
      break;
  }
};

  return (
      <ScrollView contentContainerStyle={General.mainContainer}>
        <Text>Trainer Profile</Text>
        <Button title={editing ? "Save" : "Edit"} onPress={editTrainerProfile} />
        <TextInput
        style={styles.input}
        value={name}
        placeholder="Name"
        onChangeText={(text) => handleInputChange('name', text)}
        editable={editing}
      />
      <TextInput
        style={styles.input}
        value={tags}
        placeholder="Tags"
        onChangeText={(text) => handleInputChange('tags', text)}
        editable={editing}
      />
        {renderTagsSection()}
      <View>
       <Text>Tags:</Text>
        <FlatList
          data={presetTags}
          renderItem={renderTagItem}
          keyExtractor={(item) => item}
          horizontal
        />
      </View>
      <TextInput
        style={styles.input}
        value={equipment}
        placeholder="Equipment"
        onChangeText={(text) => handleInputChange('equipment', text)}
        editable={editing}
      />
      <TextInput
        style={styles.input}
        value={credentials}
        placeholder="Credentials"
        onChangeText={(text) => handleInputChange('credentials', text)}
        editable={editing}
      />
      <TextInput
        style={styles.input}
        value={socials}
        placeholder="Socials"
        onChangeText={(text) => handleInputChange('socials', text)}
        editable={editing}
      />
       <TextInput
        style={styles.input}
        value={services}
        placeholder="Services"
        onChangeText={(text) => handleInputChange('services', text)}
        editable={editing}
      />
      <TextInput
        style={styles.input}
        value={serviceDescription}
        placeholder="ServiceDescription"
        onChangeText={(text) => handleInputChange('serviceDescription', text)}
        editable={editing}
      />
        <Text>{reviews}</Text>
      </ScrollView>

  )

}