// // app-wide navigation for all states
// import React from 'react';
// import { useAuthentication } from '../utils/hooks/useAuthentication';
// import UserStack from './userStack';
// import AuthStack from './authStack';
// import axios from 'axios';
// import { getAuth, signOut } from 'firebase/auth';
// import { LogBox } from 'react-native';

// LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

// export default function RootNavigation() {
//   const { user } = useAuthentication();

//   return user ? <UserStack user={user} /> : <AuthStack />;
// }
