import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-big-calendar';
import EventDetailsModal from './EventDetailsModal';
interface Event {
  title: string;
  start: Date;
  end: Date;
}

const PlanningCalendar: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [activity, setActivity] = useState('');
  const [startDate, setStartDate] = useState(new Date()); // Set default start date to today
  const [endDate, setEndDate] = useState(new Date()); // Set default end date to today
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [events, setEvents] = useState([]);
  const [isModifyMode, setModifyMode] = useState(false);
  const [isEventModalVisible, setEventModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventModalObj, setEventModalObj] = useState({});

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(!isStartDatePickerVisible);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (selectedDate: Date) => {
    hideStartDatePicker();
    setStartDate(selectedDate);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(!isEndDatePickerVisible);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (selectedDate: Date) => {
    hideEndDatePicker();
    setEndDate(selectedDate);
  };

  const handleAddEvent = () => {
    if (activity && startDate && endDate && location && description) {
      let newEvent =  {
        title: activity,
        start: startDate!,
        end: endDate!,
      };

      // Do something with the new event
      let newEvents = [...events, newEvent ];
      setEvents(newEvents)

      toggleModal();
    }
  };

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

  const handleModify = () => {
    // Add your logic for modifying the event
    // For example, you can navigate to a screen with a form to edit the event
    // or toggle a form inside the modal for editing
    setModifyMode(true);
  };

  const handleDelete = () => {
    // Add your logic for deleting the event
    // For example, you can show a confirmation dialog before deleting
    console.log('Event deleted!');
    onClose();
  };
  const toggleEventModal = (event) => {
    setEventModalVisible(!isEventModalVisible);
    setEventModalObj(event);
  };

  const setEventDetails = (event: Event) => {
    setSelectedEvent(event);
    toggleEventModal(); // Open the modal when an event is selected
  };

  const showEventDetailsModal = (event: Event) => {
    setSelectedEvent(event);
    setEventModalVisible(true);
  };

  const closeEventDetailsModal = () => {
    setEventModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <View>
      {isEventModalVisible ? <Text>true</Text> : <Text>false</Text>}
      <TouchableOpacity onPress={toggleModal} style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Event</Text>
        </View>
      </TouchableOpacity>
      <View style={{ width: '80%' }}>
        <Calendar events={events} height={600} onPressEvent={toggleEventModal}/>
      </View>
      <Modal visible={isEventModalVisible && Object.keys(eventModalObj).length > 0} animationType="slide" transparent>
          <EventDetailsModal event={eventModalObj} onClose={closeEventDetailsModal} setEvents={setEvents} setEventModalVisible={setEventModalVisible} />
      </Modal>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeading}>Add Event</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Activity"
                  value={activity}
                  onChangeText={(text) => setActivity(text)}
                />
                <TouchableOpacity onPress={showStartDatePicker}>
                  <View style={styles.input}>
                    <Text>{formatDateTime(startDate)}</Text>
                  </View>
                </TouchableOpacity>
                {isStartDatePickerVisible && (
                  <DateTimePicker
                    value={startDate}
                    mode="datetime"
                    display="spinner"
                    minuteInterval={30}
                    onChange={(event, selectedDate) => {
                      if (event.type === 'dismissed') {
                        hideStartDatePicker();
                      }
                      if (event.type === 'set') {
                        setStartDate(selectedDate || new Date());
                      }
                    }}
                  />
                )}
                <TouchableOpacity onPress={showEndDatePicker}>
                  <View style={styles.input}>
                    <Text>{formatDateTime(endDate)}</Text>
                  </View>
                </TouchableOpacity>
                {isEndDatePickerVisible && (
                  <DateTimePicker
                    value={endDate}
                    mode="datetime"
                    display="spinner"
                    minuteInterval={30}
                    onChange={(event, selectedDate) => {
                      if (event.type === 'dismissed') {
                        hideEndDatePicker();
                      }
                      if (event.type === 'set') {
                        setEndDate(selectedDate || new Date());
                      }
                    }}
                  />
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Location"
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
                <View style={styles.buttonRow}>
                  <Button title="Submit" onPress={handleAddEvent} />
                  <Button title="Cancel" onPress={toggleModal} color="#d9534f" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PlanningCalendar;
