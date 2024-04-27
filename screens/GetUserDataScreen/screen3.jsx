import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button, Image, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { selectUserToken} from '../../redux/auth/authSlice'
import { updateExercise, selectIsLoading, selectIsSuccess, selectIsError, selectResponse, } from '../../redux/user/userSlice'
import { CheckBox } from '@rneui/themed';
import { START_LINEAR_COLOR, END_LINEAR_COLOR } from '../../constants';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import GradientButton from '../../components/UI/GradientButton/index';
import GradientButtonBack from '../../components/UI/GradientButtonBack/index';
import * as UserService from '../../services/UserService';
import LottieView from 'lottie-react-native'


export const GetUserDataScreen3 = ({ navigation }) => {

    const userToken = useSelector(selectUserToken)
    const dispatch = useDispatch()
    const loading = useSelector(selectIsLoading)
    const error = useSelector(selectIsError)
    const success = useSelector(selectIsSuccess)
    const response = useSelector(selectResponse)
    const [updateexercise, setupdateExercise] = useState('Không vận động')

    const handleUpdateExercise = async () => {
        if (userToken) {
            dispatch(updateExercise(userToken, updateexercise))
            navigation.navigate('GetUserData4')
        }
    }

    // useEffect(() => {
    //     if (!loading && success) {
    //         navigation.navigate('GetUserData4')
    //         dispatch(setInit())
    //     }
    // }, [loading])

    return (
        <ScrollView style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 35,}}>
                <Ionicons name="ellipse" size={24} color={END_LINEAR_COLOR} />
                <Ionicons name="ellipse" size={24} color={END_LINEAR_COLOR} />
                <Ionicons name="ellipse" size={24} color={END_LINEAR_COLOR} />
                <Ionicons name="ellipse" size={24} color="#D9D9D9" />
            </View>
            <View style={{display:'flex', marginTop: 25, flexDirection: "row", alignItems: "center", 
                marginBottom: 30, gap: 10}}>
                <Image style={{width: 50, height: 50, objectFit: "contain",}} source={require('../../assets/img_logo.png')} />
                <Text style={{fontWeight: "bold", fontSize: 20, width: "80%"}}>Chọn mức độ vận động của bạn!</Text>
            </View>

            <TouchableOpacity style={{marginHorizontal: 2, display:'flex', flexDirection: "row", gap: 10,
                alignItems: "center", marginTop: 10, backgroundColor: "white",
                shadowOffset: { width: 1, height: 1 }, paddingVertical: 20, 
                shadowOpacity: 0.8, borderRadius: 15, paddingHorizontal: 10,
                shadowRadius: 4,
                elevation: 5,}}
                onPress={() => setupdateExercise('Không vận động')}>
                <MaterialCommunityIcons style={{}} 
                name="sleep" size={50} color="#FFF67E" />
                <Text style={{width: 190}}>Không vận động</Text>
                <CheckBox
                    checked={updateexercise === 'Không vận động'}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    />
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal: 2, display:'flex', flexDirection: "row", gap: 10,
                alignItems: "center", marginTop: 10, backgroundColor: "white",
                shadowOffset: { width: 1, height: 1 }, paddingVertical: 20, 
                shadowOpacity: 0.8, borderRadius: 15, paddingHorizontal: 10,
                shadowRadius: 4,
                elevation: 5,}}
                onPress={() => setupdateExercise('Vận động nhẹ (1-3 ngày/tuần)')}>
                <MaterialCommunityIcons style={{}} 
                name="walk" size={50} color="#BFEA7C" />
                <Text style={{width: 190}}>Vận động nhẹ (1-3 ngày/tuần)</Text>
                <CheckBox
                    checked={updateexercise === 'Vận động nhẹ (1-3 ngày/tuần)'}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    />
            </TouchableOpacity> 
            <TouchableOpacity style={{marginHorizontal: 2, display:'flex', flexDirection: "row", gap: 10,
                alignItems: "center", marginTop: 10, backgroundColor: "white",
                shadowOffset: { width: 1, height: 1 }, paddingVertical: 20, 
                shadowOpacity: 0.8, borderRadius: 15, paddingHorizontal: 10,
                shadowRadius: 4,
                elevation: 5,}}
                onPress={() => setupdateExercise('Vận động vừa phải (4-5 ngày/tuần)')}>
                <MaterialCommunityIcons style={{}} 
                name="run-fast" size={50} color="#9BCF53" />
                <Text style={{width: 190}}>Vận động vừa phải (4-5 ngày/tuần)</Text>
                <CheckBox
                    checked={updateexercise === 'Vận động vừa phải (4-5 ngày/tuần)'}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    />
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal: 2, display:'flex', flexDirection: "row", gap: 10,
                alignItems: "center", marginTop: 10, backgroundColor: "white",
                shadowOffset: { width: 1, height: 1 }, paddingVertical: 20, 
                shadowOpacity: 0.8, borderRadius: 15, paddingHorizontal: 10,
                shadowRadius: 4, marginBottom: 40,
                elevation: 5,}}
                onPress={() => setupdateExercise('Vận động nhiều (6-7 ngày/tuần)')}>
                <MaterialCommunityIcons style={{}} 
                name="bike" size={50} color="#416D19" />
                <Text style={{width: 190}}>Vận động nhiều (6-7 ngày/tuần)</Text>
                <CheckBox
                    checked={updateexercise === 'Vận động nhiều (6-7 ngày/tuần)'}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    />
            </TouchableOpacity>

            
            <View style={{height: 25}}>
            {error && 
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
                    <Ionicons style={{}} name="warning" size={25} color="#FFC000" />
                    <Text style={{color: "#FFC000", width: "90%"}}>{response}</Text>
                </View>
            }</View>
            <GradientButton
                onPress={handleUpdateExercise}
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
