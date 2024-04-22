import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserToken, setUserToken, clearUserToken } from '../../redux/auth/authSlice';
import {getSuggestMenu, selectIsLoading, selectIsSuccess, selectIsError, } from '../../redux/user/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../../redux/user/userSlice'
import { useNavigation } from '@react-navigation/native'
import { Tab, TabView } from '@rneui/themed';
import { START_LINEAR_COLOR, END_LINEAR_COLOR } from '../../constants';

export const SuggestDishComponent = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const userToken = useSelector(selectUserToken)
    const loading = useSelector(selectIsLoading)
    const error = useSelector(selectIsError)
    const success = useSelector(selectIsSuccess)
    const [visible2, setVisible2] = useState(false)

 
    // if (loading) {
    //     return <View><ActivityIndicator size="large" color="#0000ff" /></View>   
    // }

    return (
        <View>
           <Text style={{fontWeight: "bold", fontSize: 16, textTransform: 'uppercase',
            color: END_LINEAR_COLOR}}>CÓ THỂ BẠN SẼ THÍCH</Text>

         
            
        </View>
    )
}

const styles = StyleSheet.create({

})