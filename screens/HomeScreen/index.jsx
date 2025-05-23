import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView,ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { selectUserToken, clearUserToken, setUserToken, setAuthError } from '../../redux/auth/authSlice';
import { HeaderComponent } from '../../components/HeaderComponent/index'
import { getUserData, getUserCalories } from '../../redux/user/userSlice'
import { MainFeatureComponent } from '../../components/MainFeatureComponent/index'
import { SuggestDishComponent } from '../../components/SuggestDishComponent/index'
import { Dialog, Button } from '@rneui/themed';


export const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const pickerRef = useRef()
    const userToken = useSelector(selectUserToken)
    const [userData, setUserData] = useState(null)
    const [visible2, setVisible2] = useState(false)


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

    console.log(userToken)

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <HeaderComponent/>
            <MainFeatureComponent/>
            <SuggestDishComponent/>

            <Dialog isVisible={visible2} onBackdropPress={() => setVisible2(false)} >
                <Dialog.Title title="Phiên đã hết hạn"/>
                <Text>Đăng nhập để tiếp tục</Text>
                <Dialog.Actions>
                    <Button title="Đăng nhập" onPress={() => navigation.navigate('Login')}/>
                </Dialog.Actions>
            </Dialog>

        </ScrollView  >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20
    },

  })
