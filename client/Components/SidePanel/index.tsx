import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import TrainerHome from '../Trainer/TrainerHome'; // Replace with your actual screen components
import ClientHome from '../Client/ClientHome';
import TrainerProfile from '../Trainer/TrainerProfile';
import ClientProfile from '../Client/ClientProfile';
// import Payment from '../Payment';
// import Settings from '../Settings';
// import Referrals from '../Referrals';

// const [accountBalance, setAccountBalance] = React.useState('');
// const [rewardPoints, setRewardPoints] = React.useState('');
// const [freeSessions, setFreeSessions] = React.useState('');

const Drawer = createDrawerNavigator();

export default function SidePanel() {
  const [switchUser, setSwitchUser] = React.useState('');
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" id="SidePanel">
        <Drawer.Screen name="TrainerHome" component={TrainerHome} />
        <Drawer.Screen name="ClientHome" component={ClientHome} />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
      </NavigationContainer>
  );
};

// export default SidePanel;
