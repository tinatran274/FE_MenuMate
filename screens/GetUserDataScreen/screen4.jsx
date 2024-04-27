import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { selectUserToken} from '../../redux/auth/authSlice'
import { getUserData, selectIsLoading, selectIsSuccess, selectIsError, selectResponse, setInit} from '../../redux/user/userSlice'
import { START_LINEAR_COLOR, END_LINEAR_COLOR } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import GradientButton from '../../components/UI/GradientButton/index';
import LottieView from 'lottie-react-native'


export const GetUserDataScreen4 = ({ navigation }) => {

    const userToken = useSelector(selectUserToken)
    const dispatch = useDispatch()
    const loading = useSelector(selectIsLoading)
    const error = useSelector(selectIsError)
    const success = useSelector(selectIsSuccess)
    const response = useSelector(selectResponse)
    const [userData, setUserData] = useState(null)


    const handleGetUserData = async () => {
        const user = await dispatch(getUserData(userToken))
        if (user) {
            setUserData(user)
        } else {
            console.log('Token expired');
            setVisible2(true);
        }
    }

    const fetchData = async () => {
        await handleGetUserData();
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 35,}}>
                <Ionicons name="ellipse" size={24} color={END_LINEAR_COLOR} />
                <Ionicons name="ellipse" size={24} color={END_LINEAR_COLOR} />
                <Ionicons name="ellipse" size={24} color={END_LINEAR_COLOR} />
                <Ionicons name="ellipse" size={24} color={END_LINEAR_COLOR} />
            </View>
            <LottieView
                source={require('../../assets/co1.json')}
                autoPlay loop
                style={{width: "100%", height: 80, alignSelf: "center", marginTop: 35,}}
            />
            <Text style={{fontWeight: "bold", fontSize: 20, width: "100%", textAlign: "center"}}>MenuMate đã hiểu!</Text>

            <View style={{display:"flex", flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginBottom: 20, marginTop: 36}}>
                <View style={{width: "48%", display:"flex", flexDirection: "row", borderRadius: 15,
                backgroundColor: '#ffffff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                paddingVertical: 15, paddingHorizontal: 14, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5,}}>
                    <Image style={{width: 35, height: 35, objectFit: "contain", marginRight: 6, marginTop: 2 }} source={require('../../assets/cal_tdee.png')} />
                    <View style={{width: "75%"}}>
                        <Text style={{fontWeight:"bold", fontSize: 24}}>{userData ? Math.round(userData.tdee) : ""}</Text>
                        <Text style={{fontSize: 12, color: "gray"}}>TDEE</Text>
                    </View>
                </View>
                <View style={{width: "48%", display:"flex", flexDirection: "row", borderRadius: 15, 
                backgroundColor: '#ffffff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                paddingVertical: 15, paddingHorizontal: 14, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5,}}>
                    <Image style={{width: 35, height: 35, objectFit: "contain", marginRight: 6, marginTop: 2 }} source={require('../../assets/cal_bmi.png')} />
                    <View style={{width: "75%"}}>
                        <Text style={{ fontWeight:"bold", fontSize: 24}}>{userData ? Math.round(userData.bmi) : ""}</Text>
                        <Text style={{fontSize: 12, color: "gray"}}>BMI</Text>
                    </View>
                </View>
            </View>


            <GradientButton
                onPress={() => navigation.navigate('UserInfo')}
                title="Hoàn tất"
                colors={[START_LINEAR_COLOR, END_LINEAR_COLOR]}
            /> 
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20
    },
    
  });
