import React, { useEffect, useStat } from "react";
import { View, Text, StyleSheet, ScrollView, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import GradientButton from '../../components/UI/GradientButton/index';
import { loginUser, selectUserToken, selectIsAuthenticated, selectAuthLoading, selectAuthError, setAuthError } from '../../redux/auth/authSlice';

export const LoginScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const userToken = useSelector(selectUserToken);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const isValidEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isValidPassword = () => {
        // const minLength = 8
        // const hasUpperCase = /[A-Z]/.test(password)
        // const hasLowerCase = /[a-z]/.test(password)
        // const hasNumber = /\d/.test(password)
        // return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber
        return true
    }

    const handleLogin = async () => {
        if (!email || !password) {
            dispatch(setAuthError('Bạn chưa điển đủ thông tin'));
        }
        else if (!isValidEmail()) {
            dispatch(setAuthError('Email không hợp lệ, vui lòng nhập lại.'))
        } else if (!isValidPassword()) {
            dispatch(setAuthError('Mật khẩu không hợp lệ, vui lòng nhập lại.'));
        } else {
            dispatch(loginUser(email, password));
            
        }
    }

    const handleGoToRegister = () => {
        dispatch(setAuthError(''))
        navigation.navigate('Register')
    }

    useEffect(() => {
        if (userToken)
            navigation.navigate('Home')
    }, [userToken])


    return (
        <ScrollView style={styles.container}>
            <View style={{display:'flex', marginTop: 40, flexDirection: "row", alignItems: "center", 
                marginBottom: 30, gap: 10}}>
                <Image style={{width: 50, height: 50, objectFit: "contain",}} source={require('../../assets/img_logo.png')} />
                <Text style={{fontWeight: "bold", fontSize: 20}}>Đăng nhập</Text>
            </View>
            <View style={{display:'flex', flexDirection: "row", justifyContent: "flex-end", marginBottom: 10, marginHorizontal: 5}}>
                <TouchableOpacity style={{display:'flex', flexDirection: "row", gap: 2}} onPress={handleGoToRegister}>
                    <Text>Bạn chưa có tài khoản?</Text>
                    <Text style={{fontWeight: "bold", color: "#FF1E3F"}}>Đăng ký</Text>
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
            <View style={{display:'flex', flexDirection: "row", justifyContent: "flex-end", marginBottom: 10, marginHorizontal: 5}}>
                <Text style={{color: "#FF1E3F", marginHorizontal: 5}}>Quên mật khẩu</Text>
            </View>
            <View style={{height: 25, marginTop: 6}}>
            {error && 
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}>
                    <Ionicons style={{}} name="warning" size={25} color="#FFC000" />
                    <Text style={{color: "#FFC000", width: "90%"}}>{error}</Text>
                </View>
            }</View>
            <GradientButton
                onPress={handleLogin}
                title="Đăng nhập"
                colors={['#FF1E3F', '#FF7E06']}
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
    
  });
