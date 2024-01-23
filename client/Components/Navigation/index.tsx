// app-wide navigation for all states
import React, { useState, useEffect } from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import NewUser from './NewUser';
import axios from 'axios';
// import { getAuth, signOut } from 'firebase/auth';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

export default function RootNavigation() {
  // const auth = getAuth();
  // signOut(auth);
  const { user } = useAuthentication();

  return user ? <UserStack user={user} /> : <NewUsers />;
}