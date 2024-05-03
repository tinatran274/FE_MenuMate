import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import GradientButton from '../UI/GradientButton/index';
import AntDesignIcon from '@expo/vector-icons/AntDesign';
import { selectUserToken} from '../../redux/auth/authSlice';
import { getUserStatistic, selectIsLoading, selectIsSuccess, selectIsError,} from '../../redux/user/userSlice'
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { START_LINEAR_COLOR, END_LINEAR_COLOR } from '../../constants';
import { Avatar, Dialog, Button } from '@rneui/themed';

export const CaloStatisticComponent = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const loading = useSelector(selectIsLoading)
    const error = useSelector(selectIsError)
    const success = useSelector(selectIsSuccess)
    const userToken = useSelector(selectUserToken)
    const [numDate, setNumDate] = useState(7)
    const [dataLabel, setDataLabel] = useState([""])
    const [dataCalo, setDataCalo] = useState([0])
    const [tdee, setTDEE] = useState(0);
    const [visible2, setVisible2] = useState(false);



    const handleGetUserData = async (token) => {
        const res = await dispatch(getUserStatistic(userToken, numDate))
        if (res) {
            const dateValues = res.data.map(item => item.date);
            const caloValues = res.data.map(item => item.total_calo);
            setDataLabel(dateValues)
            setDataCalo(caloValues)
            setTDEE(res.tdee)
        }
        else {
            console.log('cs Token expired');
            setVisible2(true);
        }
    }
    const fetchData = async () => {
        await handleGetUserData(userToken);
    }

    useEffect(() => {
        fetchData(userToken)
    }, [numDate])

    const temp = {
        labels: numDate > 7 ? [] : dataLabel.map(item => item.substring(0, 5)),
        datasets: [{
          data: dataCalo,
          color: (opacity = 1) => `rgba(26, 140, 3, ${opacity})`,
        }],
    }

    const countChain = () => {
        return dataCalo.reduce((count, value) => {
          return value > 0 ? count + 1 : count
        }, 0)
    }
      
    const countGreaterThanTDEE = () => {
        return dataCalo.reduce((count, value) => {
          return value > tdee ? count + 1 : count
        }, 0)
    }
      
    const countLessThanTDEE = () => {
        return dataCalo.reduce((count, value) => {
          return value < tdee ? count + 1 : count
        }, 0)
    }

    if (loading) {
        return <View><ActivityIndicator size="large" color="#0000ff" /></View>   
    }

    return (
        <View style={styles.container}>
            <View style={styles.statistic}>
                <View style={{display: "flex", flexDirection: "row", gap: 5}}>
                    <TouchableOpacity style={{ backgroundColor: numDate === 7 ? END_LINEAR_COLOR : '#D9D9D9', 
                    padding: 10, borderRadius: 50 }} onPress={() => setNumDate(7)}>
                        <Text style={{color: "white", fontWeight: "bold"}}>07</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: numDate === 14 ? END_LINEAR_COLOR : '#D9D9D9', 
                    padding: 10, borderRadius: 50 }} onPress={() => setNumDate(14)}>
                        <Text style={{color: "white", fontWeight: "bold"}}>14</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: numDate === 30 ? END_LINEAR_COLOR : '#D9D9D9', 
                    padding: 10, borderRadius: 50 }} onPress={() => setNumDate(30)}>
                        <Text style={{color: "white", fontWeight: "bold"}}>30</Text>
                    </TouchableOpacity>

                </View>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}}>
                    <Text>{dataLabel[dataLabel.length-1]}</Text>
                    <AntDesignIcon name="calendar" color="black" size={16} style={{ fontWeight: 'bold' }}/>
                </View>
            </View>
            <LineChart data={temp} width={390} height={220} yAxisLabel={''}
                chartConfig={{
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(26, 140, 3, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: { borderRadius: 16,},
                  propsForDots: { r: '6', strokeWidth: '2', stroke: '#1A8C03', fill: '#fff'},
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16, }} />
            <View style={styles.chain}>
                <View style={{display:"flex", flexDirection: "column", alignItems:"center", width: "30%"}}>
                    <Text style={{fontWeight: "bold", fontSize: 25, marginBottom: 8}}>{countLessThanTDEE()}</Text>
                    <Text style={{fontSize: 12, color: "gray", textAlign: "center"}}>Số ngày chưa vượt tdee</Text>
                </View>
                <View style={{display:"flex", flexDirection: "column", alignItems:"center", width: "35%"}}>
                    <View style={{alignItems: "center",  flex: 1, justifyContent: 'center'}}>
                        <Image style={{ width: 55, height: 45, objectFit: "fill"}} source={require('../../assets/fire.png')} />
                        <Text style={{fontWeight: "bold", fontSize: 30, position: "absolute", textShadowColor: 'white', 
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 1,}}>{countChain()}</Text>
                    </View>
                    <Text style={{fontSize: 12, color: "gray"}}>Streak dài nhất</Text>
                </View>
                <View style={{display:"flex", flexDirection: "column", alignItems:"center", width: "30%"}}>
                    <Text style={{fontWeight: "bold", fontSize: 25, marginBottom: 8}}>{countGreaterThanTDEE()}</Text>
                    <Text style={{fontSize: 12, color: "gray", textAlign: "center"}}>Số ngày vượt tdee</Text>
                </View>
            </View>
            <Dialog isVisible={visible2} onBackdropPress={() => setVisible2(false)} >
                <Dialog.Title title="Phiên đã hết hạn"/>
                <Text>Đăng nhập để tiếp tục</Text>
                <Dialog.Actions>
                    <Dialog.Button title="Đăng nhập" onPress={() => navigation.navigate('Login')}/>
                </Dialog.Actions>
            </Dialog>


        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display:"flex", alignItems: "center"
    },
    statistic:{
        display:"flex", flexDirection: "row", justifyContent:"space-between",
        alignItems: "center", marginVertical: 30, width: "95%",
    },
    chain: {
        display:"flex", flexDirection: "row", paddingHorizontal: 20, 
        borderRadius: 12, backgroundColor: '#ffffff', shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, marginBottom: 20, marginTop: 30,
        shadowOpacity: 0.8, paddingVertical: 22, alignItems: "center",
        shadowRadius: 4, justifyContent: "space-between",
        elevation: 5,
    },
  
   
    
    
  });
  