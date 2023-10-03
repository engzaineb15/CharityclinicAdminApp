import { tsImportEqualsDeclaration } from '@babel/types';
import React from 'react';
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,

} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { height, width } = Dimensions.get('screen');
export default class doctors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      booked:'محجوز',
      to_book:'حجز',
      appointment_price:70,
      dayes: [
        {
          day: 'السبت',
          day_check: false,
          times: [
            {
              time: 'الساعه 8 مساء ',
              time_ckeck: false
            },
            {
              time: 'الساعه 9 مساء ',
              time_ckeck: false
            },


          ],
        },
        {
          day: 'الخميس',
          day_check: false,
          times: [
            {
              time: 'الساعه 9 مساء ',
              time_ckeck: false
            },

          ],
        }

      ],

    };
  }

  checked_day(index) {
    let dayes = this.state.dayes
    dayes[index].day_check = !dayes[index].day_check
    for(let i=0;i>dayes.length;i++){
      if(i!=index){
        dayes[i].day_check=false
      }
    }
    this.setState({ dayes })
  }
  checked_time(index, indexx) {
    var dayes = this.state.dayes
    var times = this.state.dayes[index].times
    this.state.dayes[index].times[indexx].time_ckeck= !this.state.dayes[index].times[indexx].time_ckeck
    for(let i=0;i>dayes.length;i++){
      if(i==index){
        for(let i=0;i>times.length;i++){
          if(i!=indexx){
            times[i].time_ckeck=false
          }
        }
      }
     
  }
    this.setState({ dayes })
  
  }


  render() {
    return (
      <>
        <StatusBar
          backgroundColor={'#F6F1F1'}></StatusBar>

        <ScrollView>
          <View style={{
            width: width,
            height: height,
            backgroundColor: '#F6F1F1',
            padding: width * 0.06
          }}>

            <Text style={{
              fontSize: height * 0.035,
              color: '#146C94',
              marginBottom: height * 0.02,
              fontFamily: 'Almarai-Bold',
              alignSelf: 'center',

            }}>
              إحجز موعدك الان
            </Text>

            <Image source={require('./assest/appointment.png')}
              style={{
                height: height * 0.2,
                width: height * 0.2,
                alignSelf: 'center',
                marginTop: height * 0.01,
                marginBottom: height * 0.01,

              }}>
            </Image>
            <Text style={{
              fontSize: height * 0.025,
              color: '#146C94',
              fontFamily: 'Almarai-Bold',
              alignSelf: 'center',

            }}>
               سعر الكشف {this.state.appointment_price} جنيه
            </Text>
            
            {this.state.dayes.map((item, index) =>


              <>
                <View style={{
                  flexDirection: 'row',
                  width: width * 0.9,
                  backgroundColor: '#b4cad5',
                  alignSelf: 'center',
                  marginTop: height * 0.03,
                  borderRadius: height * 0.012,
                  borderBottomLeftRadius: this.state.dayes[index].day_check ? 0 : height * 0.012,
                  borderBottomRightRadius: this.state.dayes[index].day_check ? 0 : height * 0.012,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: width * 0.02,


                }}>



                  <Text style={{
                    fontSize: height * 0.025,
                    color: '#146C94',
                    fontFamily: 'Almarai-Regular',


                  }}>
                    {item.day}
                  </Text>



                  <TouchableOpacity style={{
                    height: height * 0.06,
                    width: width * 0.3,
                    backgroundColor: '#146C94',
                    borderRadius: height * 0.012,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                    onPress={() => {
                      this.checked_day(index)
                    }}
                  >
                    <Text style={{
                      fontSize: height * 0.025,
                      color: '#fff',
                      fontFamily: 'Almarai-Regular',
                      alignSelf: 'center',


                    }}>
                      المواعيد
                    </Text>
                  </TouchableOpacity>




                </View>
                {item.day_check ? <>
                  <View style={{
                    width: width * 0.9,
                    padding: width * 0.02,
                    backgroundColor: '#dda9be',
                    alignSelf: 'center',
                    borderBottomLeftRadius: height * 0.012,
                    borderBottomRightRadius: height * 0.012,
                  }}>
                    {this.state.dayes[index].times.map((itemm, indexx) =>
                      <>
                        <View style={{
                          // backgroundColor: '#fff',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          alignItems: 'center',
                          marginVertical: height * 0.01,
                          borderRadius: height * 0.012,
                        }}>
                          <Text style={{
                            fontSize: height * 0.025,
                            color: '#146C94',
                            fontFamily: 'Almarai-Regular',


                          }}>
                            {itemm.time}
                          </Text>

                          <TouchableOpacity style={{
                            height: height * 0.06,
                            width: width * 0.3,
                            backgroundColor:this.state.dayes[index].times[indexx].time_ckeck?'#b4cad5' :'#146C94',
                            borderRadius: height * 0.012,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                            onPress={() => {
                              this.checked_time(index, indexx)
                              this.test(index,indexx)
                            }}
                          >
                            <Text style={{
                              fontSize: height * 0.025,
                              color: '#fff',
                              fontFamily: 'Almarai-Regular',
                              alignSelf: 'center',


                            }}>
                              {this.state.dayes[index].times[indexx].time_ckeck?this.state.booked:this.state.to_book}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}

                  </View>

                </> : null}

              </>
            )}


          </View>
        </ScrollView>
      </>
    );
  }
}

