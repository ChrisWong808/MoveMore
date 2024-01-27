import WeekView from 'react-native-week-view';

const myEvents = [
 {
 id: 1,
 description: 'Event',
 startDate: new Date(2021, 3, 15, 12, 0),
 endDate: new Date(2021, 3, 15, 12, 30),
 color: 'blue',
 // ... more properties if needed,
 },
 // More events...
];

const MyComponent = () => (
 <WeekView
 events={myEvents}
 selectedDate={new Date(2021, 3, 15)}
 numberOfDays={7}
 />
);
