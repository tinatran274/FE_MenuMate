import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { selectUserToken} from '../../redux/auth/authSlice'
import { updateAgeHeightWeight, selectIsLoading, selectIsSuccess, selectIsError, selectResponse, setInit} from '../../redux/user/userSlice'
import { Slider } from '@rneui/themed';
import { START_LINEAR_COLOR, END_LINEAR_COLOR } from '../../constants';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import GradientButton from '../../components/UI/GradientButton/index';
import * as UserService from '../../services/UserService';
import LottieView from 'lottie-react-native';

export const GetUserDataScreen1 = ({ navigation }) => {

    const userToken = useSelector(selectUserToken)
    const dispatch = useDispatch()
    const loading = useSelector(selectIsLoading)
    const error = useSelector(selectIsError)
    const success = useSelector(selectIsSuccess)
    const response = useSelector(selectResponse)
    const [updateage, setupdateAge] = useState(18)
    const [updateheight, setupdateHeight] = useState(100)
    const [updateweight, setupdateWeight] = useState(30)

    const handleUpdateAgeHeightWeight = async () => {
        if (userToken) {
            dispatch(updateAgeHeightWeight(userToken, updateage, updateheight, updateweight))
            navigation.navigate('GetUserData2')
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 35,}}>
                <Ionicons name="ellipse" size={24} color={END_LINEAR_COLOR} />
                <Ionicons name="ellipse" size={24} color="#D9D9D9" />
                <Ionicons name="ellipse" size={24} color="#D9D9D9" />
                <Ionicons name="ellipse" size={24} color="#D9D9D9" />
            </View>
            <View style={{display:'flex', marginTop: 25, flexDirection: "row", alignItems: "center", 
                marginBottom: 30, gap: 10}}>
                <Image style={{width: 50, height: 50, objectFit: "contain",}} source={require('../../assets/img_logo.png')} />
                <Text style={{fontWeight: "bold", fontSize: 20, width: "80%"}}>Hãy nhập tuổi, chiều cao và cân nặng của bạn nhé!</Text>
            </View>

            <View style={{marginHorizontal: 2, display:'flex', flexDirection: "row", gap: 10,
                alignItems: "center", marginTop: 10}}>
                    <MaterialCommunityIcons style={{borderRadius: 50, backgroundColor: "white",
                    shadowOffset: { width: 1, height: 1 }, height: "100%", 
                    shadowOpacity: 0.8, padding: 5,
                    shadowRadius: 4,
                    elevation: 5,}} 
                    name="face-agent" size={25} color="#BFBFBF" />
                    <Text style={{}}>Tuổi:</Text>
                    <Text style={{fontWeight: "bold"}}>{updateage}</Text>
            </View>

            <Slider value={updateage} onValueChange={setupdateAge}
                maximumValue={60} minimumValue={18}
                step={1} allowTouchTrack
                thumbStyle={{ backgroundColor: '#FFC93C', width: 24, height: 24,
                    shadowOffset: { width: 1, height: 2 },
                    shadowOpacity: 0.8, padding: 5,
                    shadowRadius: 4,
                    elevation: 5, 
                }}
            />

            <View style={{marginHorizontal: 2, display:'flex', flexDirection: "row", gap: 10,
                alignItems: "center", marginTop: 25}}>
                    <MaterialCommunityIcons style={{borderRadius: 50, backgroundColor: "white",
                    shadowOffset: { width: 1, height: 1 }, height: "100%", 
                    shadowOpacity: 0.8, padding: 5,
                    shadowRadius: 4,
                    elevation: 5,}} 
                    name="human-male-height" size={25} color="#BFBFBF" />
                    <Text style={{}}>Chiều cao:</Text>
                    <Text style={{fontWeight: "bold"}}>{updateheight}</Text>
                    <Text style={{}}>cm</Text>
            </View>

            <Slider value={updateheight} onValueChange={setupdateHeight}
                maximumValue={200} minimumValue={100}
                step={1} allowTouchTrack
                thumbStyle={{ backgroundColor: '#07689F', width: 24, height: 24,
                    shadowOffset: { width: 1, height: 2 },
                    shadowOpacity: 0.8, padding: 5,
                    shadowRadius: 4,
                    elevation: 5, 
                }}
            />

            <View style={{marginHorizontal: 2, display:'flex', flexDirection: "row", gap: 10,
                alignItems: "center", marginTop: 25}}>
                    <MaterialCommunityIcons style={{borderRadius: 50, backgroundColor: "white",
                    shadowOffset: { width: 1, height: 1 }, height: "100%", 
                    shadowOpacity: 0.8, padding: 5,
                    shadowRadius: 4,
                    elevation: 5,}} 
                    name="weight-kilogram" size={25} color="#BFBFBF" />
                    <Text style={{}}>Cân nặng:</Text>
                    <Text style={{fontWeight: "bold"}}>{updateweight}</Text>
                    <Text style={{}}>kg</Text>
            </View>

            <Slider value={updateweight} onValueChange={setupdateWeight} style={{marginBottom: 40}}
                maximumValue={150} minimumValue={30}
                step={1} allowTouchTrack
                thumbStyle={{ backgroundColor: '#40A8C4', width: 24, height: 24,
                    shadowOffset: { width: 1, height: 2 },
                    shadowOpacity: 0.8, padding: 5,
                    shadowRadius: 4,
                    elevation: 5, 
                }}
            />
            <View style={{height: 25}}>
            {error && 
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
                    <Ionicons style={{}} name="warning" size={25} color="#FFC000" />
                    <Text style={{color: "#FFC000", width: "90%"}}>{response}</Text>
                </View>
            }</View>
            <GradientButton
                onPress={handleUpdateAgeHeightWeight}
                title="Xác nhận và tiếp tục"
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
