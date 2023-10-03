import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './Pages/Splash';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import DoctorAdmin from './Pages/DoctorAdmin';
import AppointmentsAdmin from './Pages/AppointmentsAdmin';
import hoursPage from './Pages/hoursPage';
import Patientnames from './Pages/Patientnames';

const Stack = createNativeStackNavigator()


function MyStack() {
  return (
    <Stack.Navigator

      screenOptions={
        {
          headerShown: false, 
        }
        
      }
      initialRouteName='Splash'
      >

      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='DoctorAdmin' component={DoctorAdmin} />
      <Stack.Screen name='AppointmentsAdmin' component={AppointmentsAdmin} />
      <Stack.Screen name='hoursPage' component={hoursPage} />
      <Stack.Screen name='Patientnames' component={Patientnames} />
 


    </Stack.Navigator>
  )
}





export default function App() {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}