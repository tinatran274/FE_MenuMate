import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import GradientButton from '../../components/UI/GradientButton/index';
import { setAuthError, registerUser, selectUserToken, selectIsAuthenticated, selectAuthLoading, selectAuthError } from '../../redux/auth/authSlice';
import { START_LINEAR_COLOR, END_LINEAR_COLOR } from '../../constants';

export const RegisterScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const loading = useSelector(selectAuthLoading)
    const error = useSelector(selectAuthError)
    const userToken = useSelector(selectUserToken)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');


    const isValidEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isValidPassword = () => {
        const minLength = 8
        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const hasNumber = /\d/.test(password)
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber
    }

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            dispatch(setAuthError('Bạn chưa điển đủ thông tin'))
        } else if (password !== confirmPassword) {
            dispatch(setAuthError('Mật khẩu không khớp, vui lòng nhập lại.'))
        
        } else if (!isValidEmail()) {
            dispatch(setAuthError('Email không hợp lệ, vui lòng nhập lại.'));
        } else if (!isValidPassword()) {
            dispatch(setAuthError('Mật khẩu ít nhất 8 ký tự, bao gồm chữ thường, chữ hoa và số'));
        } else {
            dispatch(registerUser(email, password));
        }
    }
      

    useEffect(() => {
        if (userToken)
            navigation.navigate('Home')
    }, [userToken])

    const handleGoToLogin = () => {
        dispatch(setAuthError(''))
        navigation.goBack()
    }


    return (
        <ScrollView style={styles.container}>
            <View style={{display:'flex', marginTop: 40, flexDirection: "row", alignItems: "center", 
                marginBottom: 30, gap: 10}}>
                <Image style={{width: 50, height: 50, objectFit: "contain",}} source={require('../../assets/img_logo.png')} />
                <Text style={{fontWeight: "bold", fontSize: 20}}>Đăng ký</Text>
            </View>
            <View style={{display:'flex', flexDirection: "row", justifyContent: "flex-end", marginBottom: 10, marginHorizontal: 5}}>
                <TouchableOpacity style={{display:'flex', flexDirection: "row", gap: 2}} onPress={handleGoToLogin}>
                    <Text>Bạn đã có tài khoản?</Text>
                    <Text style={{fontWeight: "bold", color: "#FF1E3F"}}>Đăng nhập</Text>
                </TouchableOpacity >
            </View>

            <View style={{paddingHorizontal: 8, display:'flex', flexDirection: "row", 
                alignItems: "center", gap: 10, marginHorizontal: 2, paddingVertical: 8,
                borderRadius: 50,
                backgroundColor: "white",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 5,}}>
                    <Ionicons style={{borderRadius: 50, backgroundColor: "white",
                    shadowOffset: { width: 1, height: 1 }, height: "100%", 
                    shadowOpacity: 0.8, padding: 5,
                    shadowRadius: 4,
                    elevation: 5,}} 
                    name="mail" size={25} color="#BFBFBF" />
                    <TextInput style={{width: "100%",}}
                        placeholder="Nhập email ..."
                        value={email}
                        onChangeText={setEmail}
                    />
            </View>
            <View style={{paddingHorizontal: 8, display:'flex', flexDirection: "row", 
                alignItems: "center", gap: 10, marginHorizontal: 2, paddingVertical: 8,
                borderRadius: 50, marginVertical: 14,
                backgroundColor: "white",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 5,}}>
                    <Ionicons style={{borderRadius: 50, backgroundColor: "white",
                    shadowOffset: { width: 1, height: 1 }, height: "100%", 
                    shadowOpacity: 0.8, padding: 5,
                    shadowRadius: 4,
                    elevation: 5,}} 
                    name="key" size={25} color="#BFBFBF" />
                    <TextInput style={{width: "100%",}}
                        placeholder="Nhập mật khẩu ..."
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
            </View>
            <View style={{paddingHorizontal: 8, display:'flex', flexDirection: "row", 
                alignItems: "center", gap: 10, marginHorizontal: 2, paddingVertical: 8,
                borderRadius: 50,
                backgroundColor: "white",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 5,}}>
                    <Ionicons style={{borderRadius: 50, backgroundColor: "white",
                    shadowOffset: { width: 1, height: 1 }, height: "100%", 
                    shadowOpacity: 0.8, padding: 5,
                    shadowRadius: 4,
                    elevation: 5,}} 
                    name="key" size={25} color="#BFBFBF" />
                    <TextInput style={{width: "100%",}}
                        placeholder="Nhập lại mật khẩu ..."
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
            </View>

            <View style={{height: 25, marginTop: 25}}>
            {error && 
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
                    <Ionicons style={{}} name="warning" size={25} color="#FFC000" />
                    <Text style={{color: "#FFC000", width: "90%"}}>{error}</Text>
                </View>
            }</View>

            <GradientButton
                onPress={handleRegister}
                title="Đăng ký"
                colors={[START_LINEAR_COLOR, END_LINEAR_COLOR]}
            /> 

            <Image style={{width: "100%", height: 300, objectFit: "contain", marginTop: 40}} source={require('../../assets/img_deco1.png')} />
        </ScrollView  >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20
    },
    
  })
