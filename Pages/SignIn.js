import React from 'react';
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {Welcome, email} from '../constant/Images';
import Color from '../constant/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import  AsyncStorage from '@react-native-async-storage/async-storage'; 
//import {AsyncStorage } from 'react-native'
import NetInfo from '@react-native-community/netinfo';
import AnimatedLottieView from 'lottie-react-native';
import axios from 'axios';
const {height, width} = Dimensions.get('screen');
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      colorerror: Color.grey,
      sec: false,
      loading_btn: false,
      connection_Status:"Online"
    };
  }
  change_sec() {
    this.setState({sec: !this.state.sec});
  }


  componentDidMount() {

    const unsubscripe = NetInfo.addEventListener(state => {

      if (state.isConnected == true) {
         
          this.setState({ connection_Status:"Online"})

       //   this.loginUser()

      } else {
          
          this.setState({ connection_Status:"Offline"})
      }
 

  })
  return unsubscripe


  
  }


  async submit() {
    const email = this.state.email;
    const pass = this.state.pass;
    let colorerror = this.state.colorerror;
    let error_count = 0;

    // email
    if (!email.includes('@') || !email.includes('.')) {
      error_count++;
    }
    const at = email.indexOf('@');
    const dot = email.lastIndexOf('.');
    if (at + 1 == dot || dot < at) {
      error_count++;
    }
    if (email.trim().length < 5) {
      error_count++;
    }

    // password
    if (pass.length < 6) {
      error_count++;
    }

    if (error_count === 0) {
      this.setState({ colorerror: Color.grey });

    
      this.loginUser(email, pass);
    } else {
      this.setState({ colorerror: '#D71313' });
    }
  }

  
  async loginUser(email, pass) {

    this.setState({loading_btn: true, });

    const apiUrl = 'https://camp-coding.online/fem_code_organization/FemCode/admin/admin_login.php';
 
    axios
      .post(apiUrl, {
        email: email,
        password: pass,
      })
      .then(async(response) => {
        if (response.data.status === 'success') {
        
        // console.log(response.data)
         this.storedata()
         
         await AsyncStorage.setItem('user_id', response.data.massage.user_id);
         await AsyncStorage.setItem('admin_type', response.data.massage.type);

    //     console.log(response.data, response.data.massage.user_id)

          this.props.navigation.replace('Home');
         
        } else {
        
          this.setState({ colorerror: '#D71313' });
          this.setState({loading_btn: false, });
       //   console.log(response.data)
        }
        this.setState({loading_btn: false, });
      })
      .catch((error) => {
        // Handle any errors here
     //   console.error(error);
        this.setState({loading_btn: false, });
      });
  }


async storedata() {
  await AsyncStorage.setItem('logged', 'logged');
}

  render() {
    return (
      <>
        <StatusBar
          backgroundColor={Color.grey}
          barStyle="dark-content"></StatusBar>

        <ScrollView>
 { this.state.connection_Status == "Offline" ? (
      <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf:"center",
        padding: 100
      }}>
      <AnimatedLottieView
        source={require('../assests/no_connection.json')}
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
      <View
    style={{
      
      width: width,
      //   height:height,
      backgroundColor: Color.grey,
      padding:  width * 0.18
    }}>

      
    <Text
      style={{
        fontSize: height * 0.035,
        color: Color.blue,
        fontFamily: 'Almarai-Bold',
        alignSelf: 'center',
      }}>
      مرحبا بك
    </Text>
    <Text
      style={{
        fontSize: height * 0.025,
        color: Color.blue,
        fontFamily: 'Almarai-Regular',
        alignSelf: 'center',
      }}>
    تسجيل الدحول كأحد الموظفين
    </Text>

    <Image
      source={Welcome}
      style={{
        height: height * 0.2,
        width: height * 0.2,
        alignSelf: 'center',
        marginTop: height * 0.02,
        marginBottom: height * 0.03,
      }}></Image>

    <View
      style={{
        flexDirection: 'row',
        height: height * 0.06,
        width: width * 0.9,
        backgroundColor: Color.babyblue,
        alignSelf: 'center',
        marginTop: height * 0.01,
        borderRadius: height * 0.012,
        //   opacity:0.3,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.02,
      }}>
      <Image
        source={email}
        style={{
          height: width * 0.07,
          width: width * 0.07, 
        }}></Image>

      <TextInput
        onChangeText={newvalue => {
          this.setState({email: newvalue});
        }}
        style={{
          height: height * 0.06,
          width: width * 0.7,
          color: Color.blue,
          fontSize: height * 0.025,
          paddingRight: 16,
          paddingLeft: 16,
          marginRight:height*0.03
        }}
        placeholder='ادخل بريدك الالكتروني'
        
        ></TextInput>
    </View>
    <View
      style={{
        flexDirection: 'row',
        height: height * 0.06,
        width: width * 0.9,
        backgroundColor: Color.babyblue,
        alignSelf: 'center',
        marginTop: height * 0.02,
        borderRadius: height * 0.012,
        //   opacity:0.3,
        // justifyContent: 'space-between',
        alignItems: 'center',
     //   paddingHorizontal: width * 0.02,
      
      }}>
      
      <TouchableOpacity activeOpacity={0.7}
        onPress={() => {
          this.change_sec();
        }}>
        <Icon
          name={this.state.sec ? 'eye-slash' : 'eye'}
          style={{color: '#84b3d1', paddingHorizontal: 10}}
          size={height * 0.03}
        />
      </TouchableOpacity>
      <TextInput
       secureTextEntry={this.state.sec}
        onChangeText={newvalue => {
          this.setState({pass: newvalue});
        }}
        style={{
          height: height * 0.06,
          width: width * 0.7,
          color: Color.blue,
          fontSize: height * 0.025,
          paddingRight: 16,
          paddingLeft: 16,
          marginRight:height*0.03
        
        }}
        placeholder='ادخل كلمة السر '
        ></TextInput>
    </View>
    <Text
      style={{
        fontSize: height * 0.023,
        color: this.state.colorerror,
        fontFamily: 'Almarai-Regular',
        //   alignSelf: 'center',
        marginTop: height * 0.01,
      }}>
      الايميل او الرقم السرى غير صحيح
    </Text>
   
    <TouchableOpacity
    disabled={this.state.loading_btn == true ? true : false }
      activeOpacity={0.7}
      
      style={{
        height: height * 0.06,
        width: width * 0.9,
        backgroundColor: Color.blue,
        alignSelf: 'center',
        marginTop: height * 0.04,
        borderRadius: height * 0.012,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        this.submit();
      }}>

{this.state.loading_btn ? (
    <ActivityIndicator 
    color={Color.babyblue}
    size={25}
     />
  ): (
      <Text
        style={{
          fontSize: height * 0.025,
          color: '#fff',
          fontFamily: 'Almarai-Regular',
          alignSelf: 'center',
          fontWeight: 'bold',
        }}>
        تسجيل الدخول
      </Text>
)}
    </TouchableOpacity>
    




  </View>)
  }
       

 
        </ScrollView>
        
      </>
    );
  }
}
