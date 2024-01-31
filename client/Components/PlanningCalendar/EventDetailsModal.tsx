import React, { useState } from 'react'
import { View, Text, Modal, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose, setEvents, setEventModalVisible, onDelete }) => {
  const [isModifyMode, setModifyMode] = useState(false)
  const [modifiedDescription, setModifiedDescription] = useState(event.description)
  const [modifiedStartDate, setModifiedStartDate] = useState(event.start)
  const [modifiedEndDate, setModifiedEndDate] = useState(event.end)
  const [modifiedLocation, setModifiedLocation] = useState(event.location)
  const [isModifiedStartDatePickerVisible, setModifiedStartDatePickerVisibility] = useState(false);
  const [isModifiedEndDatePickerVisible, setModifiedEndDatePickerVisibility] = useState(false);
  const handleModify = () => {
    setModifyMode(true)
  }

  const handleSaveChanges = () => {
    setModifyMode(false)
    // Pass the modified fields to onModify callback
    // setEvents({
    //   title: event.activity,
    //   start: modifiedStartDate,
    //   end: modifiedEndDate
    // })
    setEventModalVisible(false)
  }

  const handleDelete = () => {
    // Additional logic for deleting the event if needed
    onDelete()
    onClose()
  }
  const handleCancel = () => {
    setModifyMode(false)
    // Reset modified fields to their original values
    setModifiedDescription(event.description)
    setModifiedStartDate(event.start)
    setModifiedEndDate(event.end)
    setModifiedLocation(event.location)
  }
  const hideModifiedStartDatePicker = () => {
    setModifiedStartDatePickerVisibility(false)
  }
  const hideModifiedEndDatePicker = () => {
    setModifiedEndDatePickerVisibility(false)
  }
  const formatDateTime = (dateTime: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return dateTime.toLocaleDateString('en-US', options);
  };
  const showModifiedStartDatePicker = () => {
    setModifiedStartDatePickerVisibility(!isModifiedStartDatePickerVisible);
  };
  const showModifiedEndDatePicker = () => {
    setModifiedEndDatePickerVisibility(!isModifiedEndDatePickerVisible);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleModifiedStartDateConfirm = (selectedDate: Date) => {
    hideStartDatePicker();
    setModifiedStartDate(selectedDate);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(!isEndDatePickerVisible);
  };

  return (
    <Modal transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Button title="X" onPress={onClose} style={styles.closeButton} />
          </View>
          <Text style={styles.modalHeading}>{event.title}</Text>
          {isModifyMode
            ? (
            <View style={styles.datePickerContainer}>
<TouchableOpacity onPress={showModifiedStartDatePicker}>
                  <View style={styles.input}>
                    <Text>{formatDateTime(modifiedStartDate)}</Text>
                  </View>
                </TouchableOpacity>
                {isModifiedStartDatePickerVisible && (
                  <DateTimePicker
                    value={modifiedStartDate}
                    mode="datetime"
                    display="spinner"
                    minuteInterval={30}
                    onChange={(event, selectedDate) => {
                      if (event.type === 'dismissed') {
                        hideModifiedStartDatePicker()
                      }
                      if (event.type === 'set') {
                        setModifiedStartDate(selectedDate || new Date())
                      }
                    }}
                  />
                )}
            </View>
              )
            : (
            <Text>{`Start Date: ${event.start.toDateString()}`}</Text>
              )}
          {isModifyMode
            ? (
            <View style={styles.datePickerContainer}>
                <TouchableOpacity onPress={showModifiedEndDatePicker}>
                  <View style={styles.input}>
                    <Text>{formatDateTime(modifiedEndDate)}</Text>
                  </View>
                </TouchableOpacity>
                {isModifiedEndDatePickerVisible && (
                  <DateTimePicker
                    value={modifiedEndDate}
                    mode="datetime"
                    display="spinner"
                    minuteInterval={30}
                    onChange={(event, selectedDate) => {
                      if (event.type === 'dismissed') {
                        hideModifiedEndDatePicker()
                      }
                      if (event.type === 'set') {
                        setModifiedEndDate(selectedDate || new Date())
                      }
                    }}
                  />
                )}
            </View>
              )
            : (
            <Text>{`End Date: ${event.end.toDateString()}`}</Text>
              )}
          {isModifyMode
            ? (
            <TextInput
              style={[styles.editableText, styles.placeholderBackground]}
              value={modifiedLocation}
              onChangeText={(text) => { setModifiedLocation(text) }}
              placeholder="Location"
            />
              )
            : (
            <Text>{`Location: ${event.location}`}</Text>
              )}
          {isModifyMode
            ? (
            <TextInput
              style={[styles.editableText, styles.placeholderBackground]}
              value={modifiedDescription}
              onChangeText={(text) => { setModifiedDescription(text) }}
              multiline
              placeholder="Description"
            />
              )
            : (
            <Text>{`Description: ${event.description}`}</Text>
              )}
          <View style={styles.buttonRow}>
            <Button
              title={isModifyMode ? 'Save' : 'Modify'}
              onPress={isModifyMode ? handleSaveChanges : handleModify}
            />
            <Button title={isModifyMode ? 'Cancel' : 'Delete'} onPress={isModifyMode ? handleCancel : handleDelete} color="#d9534f" />
          </View>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  closeButton: {
    backgroundColor: 'transparent',
    color: 'black'
  },
  editableText: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  datePickerContainer: {
    marginBottom: 10
  },
  placeholderBackground: {
    backgroundColor: '#f2f2f2'
  }
})

export default EventDetailsModal
