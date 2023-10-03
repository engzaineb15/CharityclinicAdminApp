import * as React from 'react'
 import { View , StatusBar , Dimensions, Image } from 'react-native'
const { height } = Dimensions.get('window');
import Color from '../constant/Color';
import {Logo} from '../constant/Images';

import  AsyncStorage from '@react-native-async-storage/async-storage'
// import {AsyncStorage } from 'react-native'


export default class Splash extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      louding: true,
    };
  }

  
 async componentDidMount() {
  
    const logged = await AsyncStorage.getItem('logged');
 
    // logged = JSON.parse(logged)
// console.log(logged)
    setTimeout(() => {
      if (logged == null ) {
        this.props.navigation.navigate('SignIn');
      } else if (logged == 'logged') {
        this.props.navigation.navigate('Home');
      }
    }, 1500);
  }



    render(){
        return(
            <>
            <StatusBar backgroundColor={Color.grey} barStyle="dark-content"></StatusBar>
            <View
          style={{
            flex: 1,
            backgroundColor: Color.grey,
            justifyContent:"center"
          }}>
          <Image
            source={Logo}
            style={{
              height: height * 0.35,
              width: height * 0.6,
              alignSelf: 'center',
              
            }}
          />
      
       
        </View>
            </>
        )
    }
}