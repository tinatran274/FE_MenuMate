import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { selectUserToken} from '../../redux/auth/authSlice'
import { updateGender, selectIsLoading, selectIsSuccess, selectIsError, selectResponse, setInit} from '../../redux/user/userSlice'
import { CheckBox } from '@rneui/themed';
import { START_LINEAR_COLOR, END_LINEAR_COLOR } from '../../constants';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import GradientButton from '../../components/UI/GradientButton/index';
import GradientButtonBack from '../../components/UI/GradientButtonBack/index';
import * as UserService from '../../services/UserService';
import LottieView from 'lottie-react-native';


export const GetUserDataScreen2 = ({ navigation }) => {

    const userToken = useSelector(selectUserToken)
    const dispatch = useDispatch()
    const loading = useSelector(selectIsLoading)
    const error = useSelector(selectIsError)
    const success = useSelector(selectIsSuccess)
    const response = useSelector(selectResponse)
    const [updategender, setupdateGender] = useState('Nữ')

    const handleUpdateGender = async () => {
        if (userToken) {
            dispatch(updateGender(userToken, updategender))
            navigation.navigate('GetUserData3')
        }
    }

    // useEffect(() => {
    //     if (!loading && success) {
    //         navigation.navigate('GetUserData3')
    //         dispatch(setInit())
    //     }
    // }, [loading])

    return (
        <ScrollView style={styles.container}>
             <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 35,}}>
                <Ionicons name="ellipse" size={24} color={END_LINEAR_COLOR} />
                <Ionicons name="ellipse" size={24} color={END_LINEAR_COLOR} />
                <Ionicons name="ellipse" size={24} color="#D9D9D9" />
                <Ionicons name="ellipse" size={24} color="#D9D9D9" />
            </View>
            <View style={{display:'flex', marginTop: 25, flexDirection: "row", alignItems: "center", 
                marginBottom: 30, gap: 10}}>
                <Image style={{width: 50, height: 50, objectFit: "contain",}} source={require('../../assets/img_logo.png')} />
                <Text style={{fontWeight: "bold", fontSize: 20, width: "80%"}}>Chọn giới tính của bạn!</Text>
            </View>

            <View style={{marginHorizontal: 2, display:'flex', flexDirection: "row", gap: 10,
                alignItems: "center", marginTop: 10, backgroundColor: "white",
                shadowOffset: { width: 1, height: 1 }, paddingVertical: 20, justifyContent: "space-around",
                shadowOpacity: 0.8, borderRadius: 15, 
                shadowRadius: 4,
                elevation: 5,}}>
                <Ionicons style={{}} 
                name="female" size={50} color="#DE82D3" />
                <Text style={{fontSize: 18}}>Nữ</Text>
                <CheckBox
                    checked={updategender === 'Nữ'}
                    onPress={() => setupdateGender('Nữ')}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    />
            </View>

            <View style={{marginHorizontal: 2, display:'flex', flexDirection: "row", gap: 10,
                alignItems: "center", marginTop: 10, backgroundColor: "white",
                shadowOffset: { width: 1, height: 1 }, paddingVertical: 20, justifyContent: "space-around",
                shadowOpacity: 0.8, borderRadius: 15, marginBottom: 40,
                shadowRadius: 4,
                elevation: 5,}}>
                <Ionicons style={{}} 
                name="male" size={50} color="#4E95D9" />
                <Text style={{fontSize: 18}}>Nam</Text>
                <CheckBox
                checked={updategender === 'Nam'}
                onPress={() => setupdateGender('Nam')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                />
            </View>

            <View style={{height: 25}}>
            {error && 
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
                    <Ionicons style={{}} name="warning" size={25} color="#FFC000" />
                    <Text style={{color: "#FFC000", width: "90%"}}>{response}</Text>
                </View>
            }</View>
            <GradientButton
                onPress={handleUpdateGender}
                title="Xác nhận và tiếp tục"
                colors={[START_LINEAR_COLOR, END_LINEAR_COLOR]}
            /> 
            <GradientButtonBack
                onPress={() => navigation.goBack()}
                title="Quay lại"
                colors={[START_LINEAR_COLOR, END_LINEAR_COLOR]}
            /> 
            {loading &&
            <LottieView
                source={require('../../assets/loading.json')}
                autoPlay loop
                style={{width: 70, height: 70, alignSelf: "center"}}
            />
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20
    },
    
  });
