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
  FlatList
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import NetInfo from '@react-native-community/netinfo';
import AnimatedLottieView from 'lottie-react-native';
import  AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ar';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {height, width} = Dimensions.get('window');
import Color from '../constant/Color';
import {
  overtime
} from '../constant/Images';
import DatePicker from 'react-native-date-picker'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      connection_Status:"Online",
      date: new Date(),
      open:false,
      index:-1,
      tiem:[],
      loading: false,
      addModalDay:false,
     day_id: this.props.route.params.day_id,
     admin_type : '', 

     Newinputtime :'',
     openIndex:-1,
     modalFortime: 'اختار',
     confirmModel:false,
           


    }
  }


 async componentDidMount() {
    let fun = this.props.route.params
    
    const admin_type = await AsyncStorage.getItem('admin_type');
           this.setState({admin_type : admin_type})

  const unsubscripe = NetInfo.addEventListener(state => {

    if (state.isConnected == true) {
       
        this.setState({ connection_Status:"Online"})

        this.selectTimes(); 

    } else {
        
        this.setState({ connection_Status:"Offline"})
    }
//console.log(state.isConnected)

})
return unsubscripe

  
}
 

  


  selectTimes() {
    this.setState({ loading: true });
    const { day_id } = this.props.route.params;
    axios
      .post('https://camp-coding.online/fem_code_organization/FemCode/admin/select_times.php', {
        day_id: day_id,
      })
      .then((response) => {
        if (response.data.status === 'success') {

           //console.log(response.data);

          this.setState({
            tiem: response.data.message,
          });
          this.setState({ loading: false });
        } else {
         
           //console.error('Failed to select times:', response.data.message);
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
      
         //console.error('Error selecting times:', error);
        this.setState({ loading: false });
       
      });
  }



  addNewTime() {
    this.setState({ loading: true });
    const { day_id, date } = this.state;
 
    if (!date) {
      alert('Please select a time before adding a new time.');
      return;
    }

    axios
      .post('https://camp-coding.online/fem_code_organization/FemCode/admin/add_time.php', {
        day_id: day_id,
        time: date.toTimeString().split(' ')[0], 
      })
      .then((response) => {
        if (response.data.status === 'success') {
          
         
          this.selectTimes();
          this.setState({ loading: false });
        } else {
         
          alert(' خطأ في إضافة الوقت: ' + response.data.message);
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
      
        alert('Error adding time: ' + error.message);
        this.setState({ loading: false });
      });
  }

  editTime(){
  
      this.setState({ loading: true });
  
      const { Newinputtime,openIndex, tiem ,day_idd} = this.state;
             
      const requestData = {
        time: Newinputtime, 
          time_id: this.state.openIndex, 
      };

     // console.log(requestData)
  
      axios.post('https://camp-coding.online/fem_code_organization/FemCode/admin/edit_time.php', requestData)
      
          .then((response) => {
           
              if (response.data.status === 'success') {
          //      console.log(response.data)
                
          this.selectTimes();
          this.setState({ loading: false });
  
                  
  
              } else {
                  
                  console.error('Failed to edit time:', response.data.message);
                  this.setState({ loading: false });
              }
          })
          .catch((error) => {
             
              console.error('Error editing time:', error);
              this.setState({ loading: false });
          });
  
  
  
  
  
  }
  

  deleteTime(timeIndex) {

    const tiem = this.state.tiem;
    const dayTotime = tiem[timeIndex];
    
    this.setState({ loading: true });
    
    const timeIdToDelete = dayTotime.time_id;
  
    axios
      .post('https://camp-coding.online/fem_code_organization/FemCode/admin/delete_time.php', {
        time_id: timeIdToDelete,
      })
      .then((response) => {
        if (response.status === 200 && response.data.status === 'success') {
          tiem.splice(timeIndex, 1);
           //console.log(response.data);
          this.setState({ tiem: tiem });
          this.selectTimes()
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
  const {day_id } = route.params;
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
                  ) :( <View style={{flex: 1, backgroundColor: Color.grey}}>
                    <View style={{
                       // height: 60,
                       padding:15,
                        width: '100%',
                      //   backgroundColor:'#0f0',
                        flexDirection: 'row',
                        alignItems: 'center',
            
                      }}>
            
                        <Image source={overtime}
                         style={{
                          height: 45,
                          width: 45
                        }}></Image>
            
                        <Text style={{
                          padding:15,
                        //  color: Color.fontColor,
                          fontSize: height * 0.030,
                          fontFamily: 'Almarai-Bold',
                      // marginLeft: height * 0.01,
                          color: Color.blue,
                        }}> ساعات الحجز</Text>
                      </View>
            
                  
            
            
                         <DatePicker
                    modal
                    open={this.state.open}
                    date={this.state.date}
                    mode='time'
                    
                    theme='light'
                   
                    title={this.state.modalFor == "اختار" ? "اختار الوقت" : "تعديل الوقت"}

                    onConfirm={(date) => {
                      this.setState({ open: false, date: date, });
                      

                      if (this.state.modalFortime == "اختار") {
                        this.setState({ Newinputtime: date.toTimeString().split(' ')[0] }, () => {
                            this.addNewTime();
                        });
                    } else {
                        this.setState({ Newinputtime: date.toTimeString().split(' ')[0]}, () => {
                            this.editTime();
                        });
                    }

                    }}
                     
                    
                    onCancel={() => {
                      this.setState({open:false,})
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
                             )
                             :(
                              <FlatList
                              data={this.state.tiem}
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
                                    padding: width * 0.01,
                                  }}
                                  onPress={() => {
        
                                    this.setState({modalFortime :'تعديل', openIndex:item.time_id, open: true })
                                    this.setState({time:item.time})   
                          //        console.log(item.time+"--"+item.time_id)      
                                      

                                                                                  }}>

                   {this.state.admin_type == 'super_admin' ?(    
                                    <TouchableOpacity
                                    style={{
                                      padding:4
                                    }}
                                    onPress={() => {
                                      // this.deleteTime(index)
                                      this.setState({confirmModel:true})
                                    }}>
                                    <Icon name='trash-alt' size={23} color={"red"}></Icon>
                                    </TouchableOpacity>
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
                                            }}>هل أنت متأكد من إتمام من حذف الوقت ؟</Text>
            
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
                                                  this.deleteTime(index)
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

                                  <Text
                                    style={{
                                      padding:5,
                                      marginHorizontal:5,
                                      fontSize: height * 0.030,
                                      color: Color.blue,
                                      fontFamily: 'Almarai-Bold',
                                    
                                    }}>
                                     {/* {item.time.slice(0,5)} */}
                                     {moment(item.time, "HH:mm:ss Z").format('hh:mm  A')}
                                     {/* {  moment.utc('2000-01-01T15:40:00.000', "YYYY-MM-DDTHH:mm:ss").format('HH:mm')} */}
                                    {/* {moment().format('LT')} */}
                                    
                                  </Text>
                     <TouchableOpacity 
                      activeOpacity={0.7}
                      style={{
                        height: height * 0.06,
                        width: width * 0.31,
                        padding:2,
                        backgroundColor: Color.blue,
                        borderRadius: height * 0.012,
                        // alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: "flex-start"
                      }}  
                      onPress={() => {
                        this.props.navigation.navigate('Patientnames',{
                          time_id:item.time_id,
                          day_id:item.day_id
                        });
                      }}>
                      
                                  <Text
                                    style={{
                                      fontSize: height * 0.022,
                                      color: '#fff',
                                      fontFamily: 'Almarai-Bold',
                                      alignSelf: 'center',
                                    
                                    }}>{"عرض الحجوزات"}</Text>
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
                                            لم يتم إضافة دكاترة لهذا القسم
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
                     this.setState({open:true })
                     this.setState({modalFortime:"اختار"})
                        
                        }} >
                          <Text 
                           style={{ fontSize: height * 0.030,
                            color: Color.blue,
                            fontFamily: 'Almarai-Bold',
                          
                          }}>
                          إضافة ساعات الحجز 
                          </Text>
                        </TouchableOpacity>
                      </View>
            
           
            
                    
                    </View>
                    )}
       
   
      </>

    );
  }
}