import {tsImportEqualsDeclaration} from '@babel/types';
import React from 'react';
import axios from 'axios';
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
  FlatList
} from 'react-native';

 import * as Animatable from 'react-native-animatable';
import  AsyncStorage from '@react-native-async-storage/async-storage'; 

import AnimatedLottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import {doctor, surgeon,heart,xray,sonar,mservices} from '../constant/Images';
import Color from '../constant/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const {height, width} = Dimensions.get('screen');
export default class DoctorAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connection_Status:"Online",
      inputDocName:'',
      modalForDoc:'تعديل',
      addModalDoc:false,
      openIndexDoc:-1,
      indexancelDoc:-1,
      cancelmodelDoc:false,
      index:-1,
      loading:false,
      confirmModel:false,
      admin_type : '', 
      doctors: [
        
      ],
      sections: [
        {
          section_name: this.props.route.params.category_name,
          section_id: this.props.route.params.category_id,


          

          checked: true,
          doctors: [
          
          ],
        },
      ],
    };
  }


  async  componentDidMount() {

      const admin_type = await AsyncStorage.getItem('admin_type');
           this.setState({admin_type : admin_type})
      let fun = this.props.route.params

    const unsubscripe = NetInfo.addEventListener(state => {

      if (state.isConnected == true) {
         
          this.setState({ connection_Status:"Online"})

          this.selectDoctors()

      } else {
          
          this.setState({ connection_Status:"Offline"})
      }
 //console.log(state.isConnected)

  })
  return unsubscripe


  
  }



  addNewDoc() {

    this.setState({loading: true});

    const { inputDocName } = this.state;
    const { category_id } = this.props.route.params;
     
    const data = {
      doctor_name: inputDocName,
      category_id: category_id, 
    };
  
   
    axios
      .post('https://camp-coding.online/fem_code_organization/FemCode/admin/add_doctor.php', data)
      .then((response) => {
       
        if (response.data.status === 'success') {
          //console.log('Doctor added successfully');
         
          //console.log(response.data);
          this.selectDoctors(category_id);

          this.setState({loading: false});

          this.setState({
            inputDocName: '',
            addModalDoc: false,
          });
          
        } else {
          
          //console.error('Failed to add a doctor:', response.data.message);
         this.setState({loading: false});
        }
      })
      .catch((error) => {
        
        //console.error('Error adding a doctor:', error);
        this.setState({loading: false});
      });
  }
  
 
 

deleteDoc(doctorIndex) {

  this.setState({loading: true});

  
  const doctors = this.state.doctors;
  const doctorToDelete = doctors[doctorIndex];
  const { category_id } = this.props.route.params;
  
 
  
  const doctorIdToDelete = doctorToDelete.doctor_id;

  axios
    .post('https://camp-coding.online/fem_code_organization/FemCode/admin/delete_doctor.php', {
      doctor_id: doctorIdToDelete,
    })
    .then((response) => {

      if (response.status === 200 && response.data.status === 'success') {
        
        doctors.splice(doctorIndex, 1);
        
        this.selectDoctors(category_id);

        //console.log(response.data);
       
        this.setState({ doctors });
        
        this.setState({loading: false});

      } else {
        
        //console.error('Failed to delete doctor');
        this.setState({loading: false});
      }
    })
    .catch((error) => {
     
      //console.error('Error deleting doctor:', error);

      this.setState({ loading: false });
    });
}





  selectDoctors(categoryId) {
    this.setState({loading: true});
    const data = {
      category_id: this.props.route.params.category_id,
    };
  
  
    axios
      .post('https://camp-coding.online/fem_code_organization/FemCode/admin/select_doctors.php', data)
      .then((response) => {
        
        if (response.data.status === 'success') {
          
          const selectedDoctors = response.data.message;
          //console.log(response.data)
          this.setState({doctors :response.data.message })
          this.setState({loading: false});

          this.setState((prevState) => ({
            sections: prevState.sections.map((section) => {
              if (section.section_id === categoryId) {
                return {
                  ...section,
                  // doctors: selectedDoctors,
                };
              }
              return section;
            }),
          }));
        } else {
          
          //console.error('Failed to select doctors:', response.data.message);
          
        }
      })
      .catch((error) => {
       
        //console.error('Error selecting doctors:', error);
        this.setState({loading: false});
        
      });
  }

  
  


 
  render() {
    const { route } = this.props;
    const { category_id } = route.params;
    const { category_name } = route.params;
    
    
    return (
      <>
        <StatusBar backgroundColor={Color.grey}></StatusBar>
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
                  ):
                  (
  
                   <View
            style={{
              flex:1,
              width: width,
              height: height,
              backgroundColor: Color.grey,
              padding: width * 0.06,
            }}>
            <Text
              style={{
                fontSize: height * 0.035,
                color: Color.blue,
                marginBottom: height * 0.02,
                fontFamily: 'Almarai-Bold',
                alignSelf: 'center',
              }}>
               {this.state.sections[0].section_name}
            </Text>

            <Image
              source={surgeon}
              style={{
                height: height * 0.2,
                width: height * 0.2,
                alignSelf: 'center',
                marginTop: height * 0.01,
                marginBottom: height * 0.01,
                borderRadius: height * 0.1,
              }}></Image>

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

                      data={this.state.doctors}
                      contentContainerStyle={{
                        // marginTop: 10,
                        // paddingHorizontal: 10,
                        // paddingBottom: 20,
                        // backgroundColor:"#00f"
                        // marginVertical: 10,
                        // paddingHorizontal: 10,
                        // paddingBottom: 20,
                      }} 
                      maxHeight={350}
                      marginBottom={50}

                          showsVerticalScrollIndicator={false}
                          keyExtractor={(item, index) => `pro-${index}`}
                          renderItem={({ item, index }) => {
                            return (
                              <>
                              
                             <View
                style={{
                  flexDirection: 'row',
                  width: width * 0.9,
                  backgroundColor: Color.babyblue,
                  alignSelf: 'center',
                  marginTop: height * 0.03,
                 // marginBottom: height * 0.01,
                  borderRadius: height * 0.012,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: width * 0.03,
                }}>
        {this.state.admin_type == 'super_admin' ?( 
                  <TouchableOpacity
                    style={{
                      padding:5
                    }}
                    onPress={() => {
                     // this.deleteDoc(index)
                     this.setState({confirmModel:true})
                    }}>
                    <Icon name='trash-alt' size={20} color={"red"}></Icon>
                    </TouchableOpacity>
                     ): null}

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
                                            }}>هل أنت متأكد من حذف هذا الدكتور ؟</Text>
            
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
                                                  this.deleteDoc(index)
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
                <Image
                  source={surgeon}
                  style={{
                    height: height * 0.08,
                    width: height * 0.08,
                    alignSelf: 'center',
                    // marginTop: height * 0.01,
                    // marginBottom: height * 0.01,
                    borderRadius: height * 0.05,
                  }}></Image>
                <View
                  style={{
                    width: width * 0.32,
                  }}>
                  <Text
                    style={{
                      fontSize: height * 0.022,
                      color: Color.blue,

                      fontFamily: 'Almarai-Bold',
                    }}>
                    د/{item.doctor_name}
                  </Text>
                
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    height: height * 0.06,
                    width: width * 0.25,
                    backgroundColor: Color.blue,
                    borderRadius: height * 0.012,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('AppointmentsAdmin',{
                      doctor_id:item.doctor_id
                    });
                  }}>
                     
                  <Text
                    style={{
                      fontSize: height * 0.023,
                      color: '#fff',
                      fontFamily: 'Almarai-Bold',
                      alignSelf: 'center',
                    }}>
                    الحجوزات
                  </Text>
                </TouchableOpacity>
                
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
                      
                 )}
      
           
               

              


 

<Modal
          visible={this.state.addModalDoc}
          onRequestClose={() => {
           
            this.setState({addModalDoc:false})
          }}
          transparent={true}>
          <View
            style={{
               flex: 1, 
               alignItems: 'center',
                justifyContent: 'center' }}>
            <View
              style={{
                width: '90%',
                padding: 8,
                backgroundColor: "#fff",
                elevation: 22,
                borderRadius: 15,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: height * 0.030,
                    color: Color.blue, 
                    fontFamily: 'Almarai-Bold',
                    alignSelf: 'center',

                  }}>{ "إضافة دكتور" }</Text>


              </View>

   

                <View

                  style={{
                    width: '98%',
                  //  height: height / 15,
                    borderRadius: 5,
                    alignSelf: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems:"center",
                  //   backgroundColor:"#00f"
                  }}>


                  <TextInput
                    style={{
                      width: '90%',
                      borderWidth: 2,
                      borderColor: Color.blue,
                      borderStyle: "solid",
                      backgroundColor: 'white',
                      borderRadius: 10,
                      marginVertical: 5,
                      marginHorizontal: 5,
                      color: "#000",
                      textAlign: "center"

                    }}
                    placeholder="اسم الدكتور"
                    placeholderTextColor={Color.babyblue}
                    keyboardType="default"
                    value={(this.state.inputDocName + '')}
                    onChangeText={(nameval) => {
                     this.setState({inputDocName:nameval})
                    }}></TextInput>



                </View>

                <View
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    borderWidth: 1.5,
                    borderColor: Color.blue,
                  }} />

                <View
                  style={{
                    width: width / 5,
                    height: height / 20,
                    borderRadius: 10,
                    
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 7,
                    backgroundColor: Color.babyblue,
                  }}>
                  <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', }}
                    onPress={() => {

                     
                       this.setState({addModalDoc:false})

                      if (this.state.inputDocName == '' ) {

                        alert("يجب أدخل اسم الدكتور")
                        this.setState({addModalDoc:true})
                      }
                       else  {
                        this.addNewDoc()
                       
                      } 

                      

                    }}>
                    <Text
                      style={{
                        fontSize: height * 0.028,
                        color: Color.blue, 
                        fontFamily: 'Almarai-Bold',
                        alignSelf: 'center',
                      }}>
                      حفظ
                    </Text>
                  </TouchableOpacity>
                </View>
           

            </View>
          </View>


        </Modal>


        {this.state.admin_type == 'super_admin' ?(  

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
              this.setState({addModalDoc:true})
              this.setState({inputDocName:''})
            // this.add_new()
            }} >
              <Text 
               style={{ fontSize: height * 0.028,
                color: Color.blue,
                fontFamily: 'Almarai-Bold',
              
              }}>
             إضافة دكتور للقسم
              </Text>
            </TouchableOpacity>
          </View>
):null}
          </View> 
          
                  )
                  }
       
          
        
      </>
    );
  }
}
