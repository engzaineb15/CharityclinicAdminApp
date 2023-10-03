
import * as React from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Image,
  Text,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AnimatedLottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import  AsyncStorage from '@react-native-async-storage/async-storage'
const {height, width} = Dimensions.get('window');
import Color from '../constant/Color';
import {
  check,
  booking
} from '../constant/Images';



export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading:false,
      today_check: true,
      confirmModel:false,
      connection_Status:"Online",
      today_arr: [],
     
      admin_type : '', 
       visable:true,
       patientt:'',
       datee:'',
       timee:'',
       treatmentt:'',

       appointment_id:-1,
       finished:0
    }
  }

 async componentDidMount() {
    let fun = this.props.route.params

    const admin_type = await AsyncStorage.getItem('admin_type');
           this.setState({admin_type : admin_type})

  const unsubscripe = NetInfo.addEventListener(state => {

    if (state.isConnected == true) {
       
        this.setState({ connection_Status:"Online"})

        this.selectUsersAppointments(); 

    } else {
        
        this.setState({ connection_Status:"Offline"})
    }
///console.log(state.isConnected)

})
return unsubscripe

  
}
 

selectUsersAppointments() {

  this.setState({loading: true});

   const { day_id } = this.props.route.params;
    const { time_id } = this.props.route.params;

  axios
    .post('https://camp-coding.online/fem_code_organization/FemCode/admin/select_users_appointment.php', {
       day_id:day_id,
       time_id:time_id
    })
    .then((response) => {
      if (response.data.status === 'success') {
         
         //console.log(response.data)

        const appointmentIds = response.data.message.map(item => item.appointment_id);
        const finishedValues = response.data.message.map(item => item.finished);

      
        this.setState({
          today_arr: response.data.message,
          appointment_id: appointmentIds,
          finished:finishedValues
        });

      //    //console.log(this.state.appointment_id)
      //  //console.log(this.state.finished)

        this.setState({loading: false});


      } else {

         //console.error('Failed to retrieve users appointments:', response.data.message);
        this.setState({loading: false});
      }
    })
    .catch((error) => {
      
       //console.error('Error retrieving users appointments:', error);
      this.setState({loading: false});
    });
}








toggleItemCheck(appointment_id) {
  
  this.setState({loading: true});

  axios
    .post('https://camp-coding.online/fem_code_organization/FemCode/admin/update_finish_appointment.php', {
      appointment_id: appointment_id,
    })
    .then((response) => {

        //console.log(appointment_id)

      if (response.data.status === 'success') {
        const today_arr = this.state.today_arr;
        const updatedItem = today_arr.find(item => item.appointment_id === appointment_id);
        updatedItem.finished = updatedItem.finished === '1' ? '0' : '1';

        this.setState({ today_arr: today_arr,appointment_id:this.state.appointment_id });

        this.setState({loading: false});
         //console.log('Appointment status updated successfully');
      } else {
         //console.error('Failed to update appointment status:', response.data.message);
        this.setState({loading: false});
      }
    })
    .catch((error) => {
       //console.error('Error updating appointment status:', error);
      this.setState({loading: false});
    });
}



  


  
  render() {
    const { route } = this.props;
    const {day_id } = route.params;
    const {time_id } = route.params;

    
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
                  ) :(<View style={{flex: 1, backgroundColor: Color.grey}}>

                    <View style={{
                       // height: 60,
                       padding:15,
                        width: '100%',
                      //   backgroundColor:'#0f0',
                        flexDirection: 'row',
                        alignItems: 'center',
            
                      }}>
            
                        <Image source={booking}
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
                        }}>حجزات اليوم</Text>
                      </View>
            
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
                             )
                             :
                             (
                              <FlatList 
                
                              data={this.state.today_arr}
                              contentContainerStyle={{
                                // marginTop: 10,
                                // paddingHorizontal: 10,
                                // paddingBottom: 20,
                              }} 
                              maxHeight={500}
                           marginBottom={50}
                                  showsVerticalScrollIndicator={false}
                                  keyExtractor={(item, index) => `pro-${index}`}
                                  renderItem={({ item, index }) => {
                                    return (
                                      <>
                                          <View style={{
                                      height: 70,
                                      width: '93%',
                                      alignSelf:"center",
                                      borderRadius:15,
                                      backgroundColor: '#fff',
                                      marginBottom: 15,
                                      shadowColor: '#000',
                                      shadowOpacity: 0.26,
                                      elevation: 4,
                                      paddingVertical: 10,
                                      flexDirection: "row",
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      paddingHorizontal: 15
                                    }}>
                          
                                      <View style={{
                                        // backgroundColor: '#f0f',
                                      
                                      }}>
                          
                                        <Text style={{
                                          
                                          fontSize: height * 0.025,
                                          color: Color.blue,
                                          fontFamily: 'Almarai-Bold',
                                          
                                        }}>{item.user_name}</Text>
                                        
                                      </View>
                          
                                      <View style={{
                                        padding:10,
                                     //  backgroundColor: '#ff0',
                                        flexDirection: 'row',
                                        width: '35%',
                                        justifyContent: 'space-between',
                                        alignItems:"center",
                                      
                          
                                      }}>
                          
                                        <Text style={{
                                         
                          
                                          fontSize: height * 0.030,
                                          color: Color.blue,
                                          fontFamily: 'Almarai-Bold',
                          
                                        }}>{item.time}</Text>

                     {this.state.admin_type == 'admin' ?(  
                           
                      <TouchableOpacity 
                      disabled={item.finished === '1' ? true : false }
                      style={{
                       
                                          height: 30,
                                          width: 30,
                                          borderRadius: 15,
                                          shadowColor: '#000',
                                          shadowOpacity: 0.26,
                                          elevation: 5,
                                          shadowRadius: 10,
                                          backgroundColor:Color.grey,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}
                                        onPress={() =>{
                                       this.setState({confirmModel:true, appointment_id:item.appointment_id})
            
                                       }}>
                                        {item.finished === '1' ? (
                                          <Icon name='check' size={17} color={"#000"} />
                                        ) : null}
                                     </TouchableOpacity>
                     ):
                     (
                      <View style={{
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        shadowColor: '#000',
                        shadowOpacity: 0.26,
                        elevation: 5,
                        shadowRadius: 10,
                        backgroundColor:Color.grey,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>{
                     this.setState({confirmModel:true, appointment_id:item.appointment_id})

                     }}>
                      {item.finished === '1' ? (
                        <Icon name='check' size={17} color={"#000"} />
                      ) : null}
                   </View>
                     )
                     
                     }

                     <Modal
                                    visible={this.state.confirmModel}
                                    onRequestClose={() => {
                                      this.setState({confirmModel:false})
                                    }}
                                    transparent={true}>
                                    <View
                                      style={{
                                        flex: 1, alignItems: 'center', justifyContent: 'center',
                                        //  backgroundColor: 'rgba(0,0,0,.6)' 
                                      }}>
                                      <View
                                        style={{
                                          width: '90%',
                                          // height: height / 6,
                                          padding: 10,
                                          backgroundColor: "#fff",
                                          elevation: 10,
                                          borderRadius: 15,
            
                                        }}>
                                        <View
                                          style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 10,
                                            //backgroundColor: '#0ff',
                                          }}>
                                          <Text
                                            style={{
                                              fontSize: 19,
                                              fontFamily: 'Almarai-Regular',
                                              color: Color.blue
                                            }}>هل أنت متأكد من إتمام كشف المريض ؟</Text>
            
                                        </View>
            
                       <View
            
                                            style={{
                                              width: '80%',
                                              height: height / 15,
                                              borderRadius: 5,
                                              alignSelf: "center",
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                              // backgroundColor:"#00f",
                                              paddingHorizontal: 10,
                                              marginVertical: 10
                                            }}>
            
                                            <View
                                              style={{
                                                width: width / 4,
                                                height: height / 20,
                                                borderRadius: 10,
                                                alignSelf: 'center',
                                                justifyContent: "center",
                                                backgroundColor: Color.babyblue,
                                              }}>
                                              <TouchableOpacity
                                                style={{ alignItems: 'center', justifyContent: 'center', }}
                                                onPress={() => {        
                                                this.toggleItemCheck(this.state.appointment_id)
                                                this.setState({confirmModel:false})
                                                }}>
                                                <Text
                                                  style={{
                                                    fontSize: 22,
                                                    fontFamily: 'Almarai-Bold',
                                                    textAlign: 'center',
                                                    color: Color.blue,
                                                  }}>
                                                  نعم
                                                </Text>
                                              </TouchableOpacity>
                                            </View>
            
                                <View
                                              style={{
                                                width: width / 4,
                                                height: height / 20,
                                                borderRadius: 10,
            
                                                alignSelf: 'center',
                                                justifyContent: "center",
            
                                                backgroundColor: Color.babyblue,
                                              }}>
                                              <TouchableOpacity
                                                style={{ alignItems: 'center', justifyContent: 'center', }}
                                                onPress={() => {
                                                  this.setState({confirmModel:false})
                                                }}>
                                                <Text
                                                  style={{
                                                    fontSize: 22,
                                                    fontFamily: 'Almarai-Bold',
                                                    textAlign: 'center',
                                                    color: Color.blue,
                                               
                                                  }}>
                                                  لا
                                                </Text>
                                              </TouchableOpacity>
                                            </View>
            
            
            
                                          </View>
            
                                       
            
                                      </View>
                                    </View>
            
            
                                  </Modal>
                          
                                        </View>
                          
                      
                                    </View>
                                    </>
                                    )}}
                          
                          
                                    ListEmptyComponent={() => {
                                      return (
                                        <View
                                          style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                          }}>
                                          <AnimatedLottieView
                                            source={require('../assests/emptyData.json')
                          
                                          }
                                            autoPlay
                                            loop
                                            style={{height: 250, width: '100%', justifyContent:"center"}}
                                            resizeMode="contain"
                                          />
                                          <Text
                                            style={{ 
                                              fontSize: height * 0.025,
                                              fontFamily: 'Almarai-Bold',
                                              color: Color.blue,
                                              textAlign: 'center',
                                            }}>
                                            لا يوجد حجزات في هذا المعاد    
                                          </Text>
                                        </View>
                                      );
                                    }}
                             />
                          
                             )}
         
                    </View>)}

        
      </>

    );
  }
}