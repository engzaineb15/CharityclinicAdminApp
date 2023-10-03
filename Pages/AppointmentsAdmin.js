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
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import AnimatedLottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import  AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ar'; 


import Icon from 'react-native-vector-icons/FontAwesome5';
const { height, width } = Dimensions.get('window');
import Color from '../constant/Color';
import {
  check,
  booking
} from '../constant/Images';
import DatePicker from 'react-native-date-picker'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      connection_Status:"Online",
      date: new Date(),
      open: false,
      index: -1,
      Days: [],
      confirmModel:false,

      NewinputDay :'',
      openIndex:-1,

      loading:false,
      addModalDay: false,
      modalForDay: 'اختار',
      doctor_id: this.props.route.params.doctor_id,
      admin_type : '', 
      day_idd:'',
      
    }
  }

 async componentDidMount() {

    let fun = this.props.route.params
   const admin_type = await AsyncStorage.getItem('admin_type');
           this.setState({admin_type : admin_type})
     
  const unsubscripe = NetInfo.addEventListener(state => {

    if (state.isConnected == true) {
       
        this.setState({ connection_Status:"Online"})

        this.selectDays();

    } else {
        
        this.setState({ connection_Status:"Offline"})
    }
//console.log(state.isConnected)

})
return unsubscripe

  
}



  selectDays() {

    this.setState({ loading: true });
    const { doctor_id } = this.props.route.params;

    axios
      .post('https://camp-coding.online/fem_code_organization/FemCode/admin/select_days.php', {
        doctor_id: doctor_id,
      })
      .then((response) => {
        if (response.data.status === 'success') {
          
         // console.log(response.data.message)
      
          const dayIds = response.data.message.map(item => item.day_id)
           

          this.setState({
            Days: response.data.message,
            day_idd:dayIds
          });

     //     console.log(this.state.day_idd)

          this.setState({ loading: false });
        } else {

           console.error('Failed to select days:', response.data.message);
          this.setState({ loading: false });
        }
      })
      .catch((error) => {

         //console.error('Error selecting days:', error);
        this.setState({ loading: false });
      });
  }



addNewDay() {

  this.setState({ loading: true });

  const { doctor_id, date } = this.state;

  if (!date) {
    alert('Please select a date before adding a new day.');
    return;
  }

  axios
    .post('https://camp-coding.online/fem_code_organization/FemCode/admin/create_day.php',{
      doctor_id: doctor_id,
      date: date.toISOString().split('T')[0],
    })
    .then((response) => {
      if (response.data.status === 'success') {

        this.selectDays();
        this.setState({ loading: false });
      } else {

        alert(response.data.message);
        this.setState({ loading: false });
      }
    })
    .catch((error) => {

      alert('Error adding day: ' + error.message);
      this.setState({ loading: false });
    });
}



editDay() {

  this.setState({ loading: true });

  const { NewinputDay,openIndex, Days ,day_idd} = this.state;
         
  const requestData = {
      date: NewinputDay, 
      day_id: this.state.openIndex, 
  };
  console.log(requestData)

  axios.post('https://camp-coding.online/fem_code_organization/FemCode/admin/edit_day.php', requestData)
  
      .then((response) => {
      //  console.log(response.data)
          if (response.data.status === 'success') {
              
            
      this.selectDays();
      this.setState({ loading: false });

              // this.setState({
              //   NewinputDay: '',   
              // });

          } else {
              
              console.error('Failed to edit day:', response.data.message);
              this.setState({ loading: false });
          }
      })
      .catch((error) => {
         
          console.error('Error editing day:', error);
          this.setState({ loading: false });
      });
}




  deleteDay(dayIndex) {
    const Days = this.state.Days;
    const dayToDelete = Days[dayIndex];
    
    this.setState({ loading: true });
    
    const dayIdToDelete = dayToDelete.day_id;
  
    axios
      .post('https://camp-coding.online/fem_code_organization/FemCode/admin/delete_day.php', {
        day_id: dayIdToDelete,
      })
      .then((response) => {
        if (response.status === 200 && response.data.status === 'success') {
          Days.splice(dayIndex, 1);
           //console.log(response.data);
          this.setState({ Days: Days });
          this.selectDays()
          this.setState({ loading: false });
        } else {
           //console.error('Failed to delete day');
          this.setState({loading: false});
        }
      })
      .catch((error) => {
         //console.error('Error deleting day:', error);
        this.setState({ loading: false });
      });
  }
  



  render() {
    const { route } = this.props;
    const { doctor_id } = route.params;
    // const formattedDate =  moment().format('dddd'); 
    //moment().format("MMM Do YY"); 
   moment.locale('ar');

    return (
      <>

        <StatusBar backgroundColor={Color.grey} barStyle="dark-content"></StatusBar>

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
                  ) : 
                  
                  (
                  
                  <View style={{ flex: 1, backgroundColor: Color.grey }}>
                    <View style={{
                      // height: 60,
                      padding: 15,
                      width: '100%',
                      //   backgroundColor:'#0f0',
                      flexDirection: 'row',
                      alignItems: 'center',
          
                    }}>
          
                      <Image source={booking}
                        style={{
                          height: 42,
                          width: 42
                        }}></Image>
          
                      <Text style={{
                        padding: 15,
                        //  color: Color.fontColor,
                        fontSize: height * 0.033,
                        fontFamily: 'Almarai-Bold',
                        // marginLeft: height * 0.01,
                        color: Color.blue,
                      }}> أيام الحجز</Text>
                    </View>
          
          
          
          
                    <DatePicker
                      modal
                      open={this.state.open}
                      date={this.state.date}
                      mode='date'
          
                      theme='light'
                      title={this.state.modalForDay == "اختار" ? "اختار اليوم" : "تعديل اليوم"}
          
                      onConfirm={(date) => {
                        this.setState({ open: false, date: date });
                    
                        if (this.state.modalForDay == "اختار") {
                            this.setState({ NewinputDay: date.toISOString().split('T')[0] }, () => {
                                this.addNewDay();
                            });
                        } else {
                            this.setState({ NewinputDay: date.toISOString().split('T')[0] }, () => {
                                this.editDay();
                            });
                        }
                    }}
          
                      onCancel={() => {
                        this.setState({ open: false, })
                      }}
                    />
          
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
                            
                            <FlatList 
                            data={this.state.Days}
                            contentContainerStyle={{
                              // marginTop: 10,
                              // paddingHorizontal: 10,
                              // paddingBottom: 20,
                             // backgroundColor:"#00f",
                              // marginVertical: 10,
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
                                   <TouchableOpacity
                                 style={{
                                   flexDirection: 'row',
                                   width: width * 0.95,
                                   backgroundColor: Color.babyblue,
                                   alignSelf: 'center',
                                   marginTop: height * 0.03,
                                   borderRadius: height * 0.012,
                 
                                 justifyContent: 'space-between',
                                   alignItems: 'center',
                                   padding: width * 0.02,
                                 }}
                                 
                                 onPress={() => {
        
 this.setState({modalForDay :'تعديل', openIndex:item.day_id, open: true })
 this.setState({data:item.date})         
   
                                               }}>


{this.state.admin_type == 'super_admin' ?( 
                 <View
                  style={{
                    width:"7%",
                    //  backgroundColor:'#00d',
                    
                  }}>

                                 <TouchableOpacity
                                   style={{
                                   //   padding: 2,
                                     
                                   }}
                                   onPress={() => {
                                    //  this.deleteDay(index)
                                    this.setState({confirmModel:true})
                                   }}>
                                   <Icon name='trash-alt' size={23} color={"red"}></Icon>
                                     </TouchableOpacity>
                                     </View> 

):null}
                    
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
                                            }}>هل أنت متأكد من إتمام من حذف اليوم ؟</Text>
            
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
                                                  this.deleteDay(index)
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

                             <View
                             style={{
                              width:"50%",
                             // backgroundColor:'#00d',
                              alignItems:"center"
                            }}>  
                                 <Text
                                   style={{
                                     fontSize: height * 0.023,
                                     color: Color.blue,
                                     fontFamily: 'Almarai-Bold',
                                    // marginRight:-30
                                   }}>
                                   {/* {this.state.date.toDateString()} */}
                                 {moment(item.date).locale('ar').format('dddd DD MMMM YYYY')}
                                 </Text>
                                 </View>  
                        
                                 <TouchableOpacity
                               
                                   activeOpacity={0.7}
                                   style={{
                                     height: height * 0.06,
                                     width: width * 0.32,
                                     padding:2,
                                     backgroundColor: Color.blue,
                                     borderRadius: height * 0.012,
                                     // alignItems: 'center',
                                     justifyContent: 'center',
                                     alignSelf: "flex-start"
                                   }}
                 
                                   onPress={() => {
                                     this.props.navigation.navigate('hoursPage', {
                                       day_id: item.day_id
                                     });
                                   }}>
                                   <Text
                                     style={{
                                       fontSize: height * 0.018,
                                       color: '#fff',
                                       fontFamily: 'Almarai-Bold',
                                       alignSelf: 'center',
                                     }}>
                                      {this.state.admin_type == 'admin' ? (
                                    "إضافة ساعات الحجز"
                                     ):("عرض ساعات الحجز")}
                                   </Text>
                                 </TouchableOpacity>
                                
                                

                                
                               </TouchableOpacity>
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
                                     style={{height: 200, width: '100%'}}
                                     resizeMode="contain"
                                   />
                                   <Text
                                     style={{ 
                                       fontSize: height * 0.025,
                                       fontFamily: 'Almarai-Bold',
                                       color: Color.blue,
                                       textAlign: 'center',
                                     }}>
                                     لم يتم إضافة أيام حجز لهذا القسم
                                   </Text>
                                 </View>
                               );
                             }}
                          
                          />
                                         
                           )
                           }
                 
          
                       
          
                    <View
                      style={{
                        width:width/1,
                        position: 'absolute',
                      bottom:0,
                      padding:40,
                      alignSelf:"center",
                       alignItems:"center",
                       justifyContent:"center",
                       backgroundColor:Color.grey
                      }}>
          
                      <TouchableOpacity
                       disabled={this.state.loading == true ? true : false }
                        style={{
                          width:width/1.5,
                          padding:7,
                           alignItems: 'center',
                           justifyContent:"center",
                           alignSelf:"center",
                          borderRadius: 30,
                           backgroundColor: Color.babyblue,
                        }}
          
                        onPress={() => {
                          this.setState({ open: true })
                          this.setState({modalForDay:"اختار"})
          
                        }} >
                        <Text
                          style={{
                            fontSize: height * 0.030,
                            color: Color.blue,
                            fontFamily: 'Almarai-Bold',
          
                          }}>
                          إضافة يوم
                        </Text>
                      </TouchableOpacity>
                    </View>
         
          
          
          
                  </View>)}
        
      </>

    );
  }
}