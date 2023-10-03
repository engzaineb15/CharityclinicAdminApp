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
import readmore from './Pages/readmore';

const Stack = createNativeStackNavigator()


function MyStack() {
  return (
    <Stack.Navigator

      screenOptions={
        {
          headerShown: false, 
        }
        
      }
    //  initialRouteName='Splash'
      >

       <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='DoctorAdmin' component={DoctorAdmin} />
      <Stack.Screen name='AppointmentsAdmin' component={AppointmentsAdmin} />
      <Stack.Screen name='hoursPage' component={hoursPage} />
      <Stack.Screen name='Patientnames' component={Patientnames} />
      <Stack.Screen name='readmore' component={readmore} />


    </Stack.Navigator>
  )
}





export default function App() {


  // const [showingSplash,setShowingSplash]=React.useState(true)


  //  React.useEffect(()=>{
  //   setTimeout(()=>{
  //     setShowingSplash(false)
  //   },3000)
  // },[])
  
  // if(showingSplash){
  //   return <Splash/>
  // }

   
//  async componentDidMount() {
  
//     const logged = await AsyncStorage.getItem('logged');

//     // logged = JSON.parse(logged)
// console.log(logged)
//     setTimeout(() => {
//       if (logged == null ) {
//         this.props.navigation.navigate('SignIn');
//       } else if (logged == 'logged') {
//         this.props.navigation.navigate('Home');
//       }
//     }, 3000);
//   }

  



  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}