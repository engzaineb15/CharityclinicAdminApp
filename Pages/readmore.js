import * as React from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Button,
  Linking, BackHandler

} from 'react-native';


import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
const {height, width} = Dimensions.get('window');
import Color from '../constant/Color';
import {
  contact,
  phone2,
  phone,
  phone3,
  menu,
  whatsapp,facebook,map
} from '../constant/Images';
// import {AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import AnimatedLottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
 export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
     
    };
 
  }

  async logout() {
   
    
    await AsyncStorage.clear();
   
    this.props.navigation.navigate('SignIn'); 
    // console.log(this.logout())
    setTimeout(() => {
      BackHandler.exitApp()
    }, 1000);
  }


  render() {
    return (
      <>
        <StatusBar backgroundColor={Color.grey} barStyle="dark-content"></StatusBar>
        <ScrollView>
    <View 
    style={{
      flex: 1,
      width: width,
      height: height,
      backgroundColor: Color.grey,
      padding: width * 0.06,
      }}>
<View style={{
                       // height: 60,
                      // padding:10,
                        width: '100%',
                      //   backgroundColor:'#0f0',
                        flexDirection: 'row',
                        alignItems: 'center',
                      marginBottom:20,
                      }}>
            
                        <Image source={menu}
                         style={{
                          height: 40,
                          width: 40
                        }}></Image>
            
                        <Text style={{
                          padding:15,
                        //  color: Color.fontColor,
                          fontSize: height * 0.035,
                          fontFamily: 'Almarai-Bold',
                      // marginLeft: height * 0.01,
                          color: Color.blue,
                        }}>{'المزيد'}</Text>
                      </View>
<View
style={{
  width:width/1.9,
 // padding:5,
//  backgroundColor:"#0ff",
  flexDirection:"row",
  justifyContent:"space-between",
  marginVertical:10,
}}>
<Image
            source={phone3}
            style={{
              height: width * 0.09,
              width: width * 0.08,
            }}></Image>
<Text
              style={{
                fontSize: 20,
                color: Color.blue,
                fontFamily: 'Almarai-Bold',
                alignSelf: 'flex-start',
              }}>
               {'أرقام العيادة الخيرية'}
            </Text>

</View>

<View
style={{
  width:width/2.5,
 //padding:5,
 // backgroundColor:"#f0f",
  flexDirection:"row",
  justifyContent:"space-between",
  marginVertical:10
}}>

<Image
            source={whatsapp}
            style={{
              height: width * 0.08,
              width: width * 0.08,
            }}></Image>

<TouchableOpacity
style={{
 
}}
onPress={() => {
  Linking.openURL(`https://wa.me/+2${'01030862572'}`);
}}
>
  
<Text
              style={{
                fontSize: 20,
                color: Color.blue,
               
                fontFamily: 'Almarai-Bold',
                alignSelf: 'flex-start',
                textDecorationLine:'underline'
              }}>
               {'01030862572'}
            </Text>

            </TouchableOpacity>
            </View>


<View
style={{
  flexDirection:"row",
  justifyContent:'space-between'
}}
>


            <View
style={{
  width:width/2.6,
 //padding:5,
// backgroundColor:"#f0f",
  flexDirection:"row",
  justifyContent:"space-between",
  marginVertical:10
}}>

<Image
            source={phone}
            style={{
              height: width * 0.08,
              width: width * 0.08,
            }}></Image>

<TouchableOpacity
style={{
 
}}
onPress={() => {

  Linking.openURL(`tel:${"01211543629"}`);
}}
>
  
<Text
              style={{
                fontSize: 20,
                color: Color.blue,
               
                fontFamily: 'Almarai-Bold',
                alignSelf: 'flex-start',
                textDecorationLine:'underline'
              }}>
               {'01211543629'}
            </Text>

            </TouchableOpacity>
            </View>


            <View
style={{
  width:width/2.6,
 //padding:5,
 // backgroundColor:"#f0f",
  flexDirection:"row",
  justifyContent:"space-between",
  marginVertical:10
}}>

<Image
            source={phone2}
            style={{
              height: width * 0.08,
              width: width * 0.08,
            }}></Image>

<TouchableOpacity
style={{
 
}}
onPress={() => {

  Linking.openURL(`tel:${"0402538456"}`);
}}
>
  
<Text
              style={{
                fontSize: 20,
                color: Color.blue,
               
                fontFamily: 'Almarai-Bold',
                alignSelf: 'flex-start',
                textDecorationLine:'underline'
              }}>
               {'0402538456'}
            </Text>

            </TouchableOpacity>
            </View>
            </View>

            <View
style={{
  width:width/1.3,
 // padding:5,
 // backgroundColor:"#0ff",
  flexDirection:"row",
  justifyContent:"space-between",
  marginVertical:10,
}}>
<Image
            source={phone}
            style={{
              height: width * 0.08,
              width: width * 0.08,
              
            }}></Image>
<Text
              style={{
                fontSize: 20,
                color: Color.blue,
                fontFamily: 'Almarai-Bold',
                alignSelf: 'flex-start',
                
              }}>
               {'التمريض الليلي'}
            </Text>

           < TouchableOpacity
style={{
 marginHorizontal:10
}}
onPress={() => {

  Linking.openURL(`tel:${"01032715327"}`);
}}
>
  
<Text
              style={{
                fontSize: 20,
                color: Color.blue,
               
                fontFamily: 'Almarai-Bold',
                alignSelf: 'flex-start',
                textDecorationLine:'underline'
              }}>
               {'01032715327'}
            </Text>

            </TouchableOpacity>

</View>
 
<View
style={{
  width:width/1.15,
 padding:5,
 //backgroundColor:"#0ff",
  flexDirection:"row",
  justifyContent:"space-between",
  marginVertical:20,
}}>
<Image
            source={facebook}
            style={{
              height: width * 0.07,
              width: width * 0.07,
            }}></Image>
           < TouchableOpacity
style={{
 marginHorizontal:10
}}
onPress={() => {

  Linking.openURL('https://www.facebook.com/3asem.news?mibextid=2JQ9oc')
}}
>

<Text
              style={{
                fontSize: 17,
                color: Color.blue,
                fontFamily: 'Almarai-Bold',
                alignSelf: 'flex-start',
                textDecorationLine:'underline'
              }}>
               {'اضغط هنا للتواصل من خلال الفيس بوك'}
            </Text>
            </TouchableOpacity>
</View>

<View
style={{
  width:width/2.4,
 //padding:5,
 //backgroundColor:"#0ff",
  flexDirection:"row",
  justifyContent:"space-between",
marginVertical:5,
}}>
<Image
            source={map}
            style={{
              height: width * 0.07,
              width: width * 0.07,
            }}></Image>

 

<Text
              style={{
                fontSize: 16,
                color: Color.blue,
                fontFamily: 'Almarai-Bold',
                alignSelf: 'flex-start',
                
              }}>
               {' العنوان بالتفصيل: '}

            </Text>
      
</View>


 <Text
              style={{
                fontSize: 16.5,
                color: Color.blue,
                fontFamily: 'Almarai-Bold',
                alignSelf: 'flex-start',
                textDecorationLine:'underline'
              }}> {'كفور بلشاى على الموقف مباشر بجوار مسجد النصر ومحلات أبوعبير عموش بعد صهريج المياه'}
            </Text>

      

            <TouchableOpacity
              style={{
                marginVertical:10,
             // padding:5,
            // backgroundColor:"#0f0",
            justifyContent:"center"
              }}
              onPress={() => {

                let daddr = `${30.837130},${30.80731}`;
                Linking.openURL(`google.navigation:q=${daddr}&avoid=tf`);
              }}>
            <Text
              style={{
                fontSize: 20,
                color: Color.black,
                fontFamily: 'Almarai-Bold',
                alignSelf: 'flex-start',
                textDecorationLine:'underline'
              }}>
               {'اضغط هنا لمعرفة الاتجاهات'}
            </Text>
            </TouchableOpacity>

            <View
            style={{
              width:width/1,
               position: 'absolute',
             bottom:0,
             padding:40,
             alignSelf:"center",
              alignItems:"center",
              justifyContent:"center",
            //  backgroundColor:Color.grey
            }}>
            
            <TouchableOpacity
            
              style={{
                width:width/1.5,
               padding:7,
                alignItems: 'center',
                justifyContent:"center",
                alignSelf:"center",
               borderRadius: 30,
                backgroundColor: Color.blue,
              }}
   
            onPress={() => {
             this.logout()
            }} >
              <Text 
               style={{ fontSize: height * 0.028,
                color: "#ffff",
                fontFamily: 'Almarai-Bold',
              
              }}>
             تسجيل الخروج
              </Text>
            </TouchableOpacity>
          </View>

    </View>
    </ScrollView>
      </>
    );
  }
}
