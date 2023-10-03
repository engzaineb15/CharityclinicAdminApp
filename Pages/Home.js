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
} from 'react-native';
import axios from 'axios';

const {height, width} = Dimensions.get('window');
 import  AsyncStorage from '@react-native-async-storage/async-storage'; 
//import {AsyncStorage } from 'react-native'
import * as Animatable from 'react-native-animatable';
import AnimatedLottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import Color from '../constant/Color';
import {
  Logoo,
  no_connection,
  message,

  heart,xray,sonar,mservices
} from '../constant/Images';
import { BackHandler } from 'react-native';
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search_key: '',
      found: true,
      // category_id:'',
      // category_name:'',
      Sections: [],
      loading:false,
      connection_Status:"Online"
    };
  }

  componentDidMount() {
    this.loadSections();

  }


  componentDidMount() {

    const unsubscripe = NetInfo.addEventListener(state => {

      if (state.isConnected == true) {
         
          this.setState({ connection_Status:"Online"})

          this.loadSections()

      } else {
          
          this.setState({ connection_Status:"Offline"})
      }
 

  })
  return unsubscripe


  
  }



 


 async loadSections() {

  this.setState({loading: true});

    const apiUrl = 'https://camp-coding.online/fem_code_organization/FemCode/admin/select_category_by_admin_id.php';
    
    const user_id = await AsyncStorage.getItem('user_id');

    axios
      .post(apiUrl, {
        user_id: user_id,
      })
      .then((response) => {
        if (response.data.status === 'success') {
          const categories = response.data.message;
          const sectionImages = {
            'قسم الأسنان': require('../assests/teeth.png'),
            'قسم الأمراض الجلدية' :require('../assests/skin.jpg') ,
            'قسم جراحة عامة' :  require('../assests/surgeon.png'),
            'قسم التغذية والنحافة': require('../assests/man.png'),
            'قسم التغذية والعلاج والسمنة والنحافة':require('../assests/plan.png') ,
            'قسم الجهاز الهضمى والباطنة' : require('../assests/digestivesystem.png') ,
            'قسم امراض النسا والتوليد' : require('../assests/abortion.png'),
            'قسم انف و أذن و حنجرة': require('../assests/head.png') ,
            'قسم امراض الصدر والاطفال' : require('../assests/chest.png'), 
            'قسم الاطفال وحديثى الولادة': require('../assests/newborn.png'),
            'قسم المسالك البولية والذكورة' : require('../assests/urinary.png'),
            'قسم المخ والاعصاب': require('../assests/brain.png'),
            'قسم جراحة العظام والكسور': require('../assests/joint.png'),
            'قسم العلاج الطبيعى': require('../assests/therapy.png'),
            'قسم الغدد': require('../assests/thyroid.png'), 
            'قسم القلب' : require('../assests/heart.jpg'), 
            'قسم الاشعة' : require('../assests/xray.jpg'), 
            'قسم الخدمات الطبية' : require('../assests/mservices.jpg'),
            'قسم أشعة السونار التشخيصية' : require('../assests/sonar.jpg'), 
          };
  
          const updatedSections = categories.map((category) => {
            return {
              section_id: category.category_id,
              section_name: category.category_name,
              section_Image: sectionImages[category.category_name] || null,
              show: true,
            };
          });
          
          this.setState({ Sections: updatedSections });
          this.setState({loading: false});
        } else {
         // console.error(response.data.message);
          this.setState({ Sections: [] });
          this.setState({loading: false});
        }
      })
      .catch((error) => {
      //  console.error(error);
        this.setState({ Sections: [] });
        this.setState({loading: false});
      });
  }
  

  

  search(section) {
    let list = this.state.Sections;
    for (let i = 0; i < list.length; i++) {
      if (list[i].section_name.toLowerCase().includes(section)) {
        list[i].show = true;
        found = true;
      } else {
        list[i].show = false;
      }
    }

    this.setState({sections: list});
  }

  render() {
    return (
      <>
        <StatusBar
          backgroundColor={Color.grey}
          barStyle="dark-content"></StatusBar>
    {this.state.connection_Status === "Offline" ? (
      <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf:"center",
        padding: 100
      }}>
      <AnimatedLottieView
        source={no_connection}
        autoPlay
        loop
        style={{ height: 200, width: '100%' }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: height * 0.025,
                                      fontFamily: 'Almarai-Bold',
                                      color: Color.blue,
                                      textAlign: 'center',
        }}>
        لا يوجد إتصال بالإنترنت
      </Text>
    </View>
       
       ):
    (
      
    <View style={{flex: 1, backgroundColor: Color.grey}}>

      <View
        style={{
          padding: width * 0.05,
          // backgroundColor: Color.grey,
         // backgroundColor:"#0ff", 
           alignItems: 'center',
           flexDirection: 'row',
           justifyContent:"space-between",
           textAlign: 'center',
        }}>
       <View
 style={{
  //padding: width * 0.05,
 // backgroundColor: Color.grey,
 //backgroundColor:"#f0f", 
  alignItems: 'center',
  flexDirection: 'row',
  textAlign: 'center',
}}>
          <Image
            source={Logoo}
            style={{
              height: height * 0.10,
              width: height * 0.13,
              elevation: 16,
             // backgroundColor:"#0f0"
            }}
          />
          <Text
            style={{
              color: Color.fontColor,
              fontSize: height * 0.035,
              fontFamily: 'Almarai-Bold',
          // marginLeft: height * 0.01,
              color: Color.blue,
            }}>
            العيادة الخيرية
          </Text>
          </View>
          <TouchableOpacity
 styly={{

 }}
 onPress={() => {
  this.props.navigation.navigate('readmore')
}}
 >
          <Image
            source={message}
            style={{
              height: 45,
              width: 45,
              
             // backgroundColor:"#0f0"
            }}
          />
</TouchableOpacity>


      </View>
      <View
        style={{
          width: height * 0.5,
          alignSelf: 'center',
          padding: 5,
          height: height * 0.09,
        }}>
        <TextInput
          placeholder="ابحث"
          value={this.state.search_key}
          style={{
            backgroundColor: Color.babyblue,
            borderColor: Color.babyblue,
            borderWidth: 2,
            borderRadius: height * 0.02,
            paddingRight: 16,
            paddingLeft: 16,
            color: Color.blue,
            fontSize:height*0.028
          }}
          onChangeText={value => {
            this.setState({search_key: value});
            this.search(value);
          }}
        />
      </View>



      <ScrollView>
        <View
          style={{
            width: width,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: width * 0.06,
       //     marginBottom: height * 0.1,
          }}>

{this.state.loading ? (
          <View
          style={{
           // flex: 1,
            justifyContent: 'center',
            alignSelf:"center",
            padding: 150
          }}>

             <ActivityIndicator 
             color={Color.blue}
              size={45}
              />
              </View> 
             ):(
              this.state.Sections.map((item, index) =>
                item.show ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      padding: 5,
                      width: '45%',
                      backgroundColor: '#fff',
                      borderRadius: height * 0.02,
                      marginBottom: height * 0.03,
                      shadowColor: '#000',
                      elevation: 16,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('DoctorAdmin', {
                        category_id: item.section_id, 
                        category_name:item.section_name
                      });

                     
                    }}>
                    <View style={{padding: 25}}>
                      <Image
                      //  source={this.getImageSource(item.section_name)} 
                      source={item.section_Image}
                        style={{
                          height: height * 0.15,
                          //  padding:20,
                          borderRadius: height * 0.02,
                          width: '100%',
                        }}></Image>
                    </View>

                    <Text
                      style={{
                        fontSize: height * 0.025,
                        fontFamily: 'Almarai-Bold',
                        color: '#000',
                        textAlign: 'center',
                      }}>
                      {item.section_name}
                    </Text>
                  </TouchableOpacity>
                ) : null,
              )
             )}
         
        </View>





      </ScrollView>

    </View>)
  }
        
      </>
    );
  }
}
