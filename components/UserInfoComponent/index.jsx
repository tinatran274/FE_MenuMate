import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState, useRef } from "react";
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserToken, setUserToken, clearUserToken } from '../../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Dialog, Button } from '@rneui/themed';
import { getUserData } from '../../redux/user/userSlice'
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import GradientButton from '../../components/UI/GradientButton/index';

export const UserInfoComponent = () => {

    const dispatch = useDispatch()
    const pickerRef = useRef()
    const navigation = useNavigation();
    const userToken = useSelector(selectUserToken);
    const [userData, setUserData] = useState(null);
    const [aim, setAim] = useState('');
    const [disease, setDisease] = useState('');
    const [updateage, setupdateAge] = useState(0);
    const [updategender, setupdateGender] = useState("");
    const [updateheight, setupdateHeight] = useState(0);
    const [updateweight, setupdateWeight] = useState(0);
    const [updateexercise, setupdateExercise] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible5, setVisible5] = useState(false);

    const handleLogout = async () => {
        dispatch(clearUserToken());
        await AsyncStorage.removeItem("localToken")
        setUserData(null)
        navigation.navigate('Login')
    }

    const handleGetUserData = async (token) => {
        const user = await dispatch(getUserData(token))
        if (user) {
            setUserData(user);
            setAim(user.aim)
        } else {
            console.log('Token expired');
            setUserData(null);
            setVisible2(true);
        }
    }

    const fetchData = async () => {
        await handleGetUserData(userToken);
    }

    useEffect(() => {
        if (userToken) {
            fetchData()
        } else {
            console.log('Local token is expired. Redirect to login.');
            setUserData(null)
            setVisible2(true)
        }
    }, [userToken])

    const toggleDialog5 = () => {
        setVisible5(!visible5);
    }

    // console.log(userData)

    return (
        <View>
            <View style={{ display:"flex", flexDirection: "row", alignItems: "center",
                marginHorizontal: 20, justifyContent: "space-between"}}>
                <View style={{ display:"flex", flexDirection: "row", alignItems: "center"}}>
                    <Avatar 
                        size={36}
                        rounded
                        title={userData ? userData.username.split(' ').map(word => word.charAt(0)).join('') : ""}
                        containerStyle={{ backgroundColor: '#3d4db7' }}
                        />
                    <Text style={{marginLeft: 10}}>Username: </Text>
                    <Text style={{fontWeight: "bold"}}>{userData ? userData.username : ""}</Text>
                </View> 
                <Button radius={"sm"} type="solid" color="red" onPress={handleLogout} >
                    <AntDesign name="logout" size={24} color="white" />
                </Button>
            </View>
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
            <View style={{marginHorizontal: 20, marginTop: 26}}>
                <Text style={{ fontSize: 15, fontWeight: "bold",}}>
                    Mục tiêu của bạn </Text>
                <View style={{ width: "100%", backgroundColor: "white", borderRadius: 10, borderColor: '#FF1E3F',
                    borderWidth: 1, paddingHorizontal: 10, paddingVertical: 1, marginVertical: 10}}>
                    <Picker style={{ width: "100%", backgroundColor: "white"}}
                        ref={pickerRef}
                        mode="dropdown"
                        selectedValue={aim}
                        onValueChange={async (itemValue, itemIndex) => {
                            setAim(itemValue);
                        }}>
                        <Picker.Item label="Tăng cân" value="Tăng cân" />
                        <Picker.Item label="Giảm cân" value="Giảm cân" />
                        <Picker.Item label="Giữ cân" value="Giữ cân" />
                    </Picker>
                </View>
            </View>

            <View style={{marginHorizontal: 20, marginTop: 26}}>
                <Text style={{ fontSize: 15, fontWeight: "bold",}}>
                    Bệnh lý </Text>
                <View style={{ width: "100%", backgroundColor: "white", borderRadius: 10, borderColor: '#FF1E3F',
                borderWidth: 1, paddingHorizontal: 10, marginVertical: 10}}>
                    <Picker style={{ width: "100%", backgroundColor: "white"}}
                        ref={pickerRef}
                        mode="dropdown"
                        selectedValue={disease}
                        onValueChange={async (itemValue, itemIndex) => {
                            setDisease(itemValue);
                        }}>
                        <Picker.Item label="Không" value="Không" />
                        <Picker.Item label="Bệnh tiểu đường" value="Bệnh tiểu đường" />
                        <Picker.Item label="Bệnh cao huyết áp" value="Bệnh cao huyết áp" />
                    </Picker>
                </View>
            </View>
            <Dialog isVisible={visible2} onBackdropPress={() => setVisible2(false)} >
                <Dialog.Title title="Phiên đã hết hạn"/>
                <Text>Đăng nhập để tiếp tục</Text>
                <Dialog.Actions>
                    <Dialog.Button title="Đăng nhập" onPress={() => navigation.navigate('Login')}/>
                </Dialog.Actions>
            </Dialog>

            <View style={{ display:"flex", flexDirection: "column", justifyContent: "space-between", 
                backgroundColor: 'white', paddingHorizontal: 20, borderRadius: 15, paddingVertical: 25,
                shadowOffset: { width: 0, height: 1 }, marginBottom: 150, marginHorizontal: 10,
                shadowOpacity: 0.8, marginTop: 20,
                shadowRadius: 4,
                elevation: 5,}}>
                <Text style={{ fontSize: 15,fontWeight: "bold", marginBottom: 10}}>Thông tin cá nhân</Text>
                <View style={{display: "flex", flexDirection: "row", marginVertical: 5, shadowColor: '#000', alignItems: "center"}}>
                    <Text>Tuổi: </Text>
                    <Text style={{fontStyle: "italic"}}>{userData && userData.age}</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", marginVertical: 5, shadowColor: '#000', alignItems: "center"}}>
                    <Text>Giới tính: </Text>
                    <Text style={{fontStyle: "italic"}}>{userData && userData.gender}</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", marginVertical: 5, shadowColor: '#000', alignItems: "center"}}>
                    <Text>Chiều cao: </Text>
                    <Text style={{fontStyle: "italic"}}>{userData && userData.height} cm</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", marginVertical: 5, shadowColor: '#000', alignItems: "center"}}>
                    <Text>Cân nặng: </Text>
                    <Text style={{fontStyle: "italic"}}>{userData && userData.weight} kg</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", marginTop: 5, shadowColor: '#000', alignItems: "center", marginBottom: 20}}>
                    <Text>Mức độ vận động: </Text>
                    <Text style={{fontStyle: "italic"}}>{userData && userData.exercise}</Text>
                </View>
                <GradientButton
                    onPress={toggleDialog5}
                    title="Cập nhật thông tin"
                    colors={['#FF1E3F', '#FF7E06']}
                />
              
                <Dialog
                    isVisible={visible5}
                    onBackdropPress={toggleDialog5}
                    >
                    <Dialog.Title title="Cập nhật thông tin của bạn"/>
            
                    <View style={{display: "flex", flexDirection: "row", marginVertical: 8, shadowColor: '#000', alignItems: "center"}}>
                        <Text style={{fontWeight: "bold"}}>Tuổi: </Text>
                        <TextInput style={{width: "70%"}} onChangeText={setupdateAge} value={updateage.toString()}
                        placeholder="..." keyboardType="numeric"/>
                    </View>
                    <View style={{display:"flex", flexDirection: "row", alignItems:"center"}}>
                        <Text style={{fontWeight: "bold"}}>Giới tính: </Text>
                        <Picker style={{ width: "50%"}}
                            ref={pickerRef}
                            mode="dropdown"
                            selectedValue={updategender}
                            onValueChange={(itemValue, itemIndex) =>
                                setupdateGender(itemValue)
                            }>
                            <Picker.Item label="Nam" value="Nam" />
                            <Picker.Item label="Nữ" value="Nữ" />
                        </Picker>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", marginVertical: 8, shadowColor: '#000', alignItems: "center"}}>
                        <Text style={{fontWeight: "bold"}}>Chiều cao: </Text>
                        <TextInput style={{width: "70%"}} onChangeText={setupdateHeight} value={updateheight.toString()}
                        placeholder="..." keyboardType="numeric"/>
                    </View>
                    <View style={{display: "flex", flexDirection: "row", marginVertical: 8, shadowColor: '#000', alignItems: "center"}}>
                        <Text style={{fontWeight: "bold"}}>Cân nặng: </Text>
                        <TextInput style={{width: "70%"}} onChangeText={setupdateWeight} value={updateweight.toString()}
                        placeholder="..." keyboardType="numeric"/>
                    </View>
                    <View style={{display:"flex", flexDirection: "row", alignItems:"center"}}>
                        <Text style={{fontWeight: "bold"}}>Mức độ vận động: </Text>
                        <Picker style={{ width: "50%"}} ref={pickerRef} mode="dropdown"
                            selectedValue={updateexercise}
                            onValueChange={(itemValue, itemIndex) =>
                                setupdateExercise(itemValue)
                            }>
                            <Picker.Item label="Không vận động" value="Không vận động" />
                            <Picker.Item label="1-2 buổi/tuần" value="1-2 buổi/tuần" />
                            <Picker.Item label="3-5 buổi/tuần" value="3-5 buổi/tuần" />
                            <Picker.Item label="5-7 buổi/tuần" value="5-7 buổi/tuần" />
                        </Picker>
                    </View>
                    <Dialog.Actions>
                        <Dialog.Button
                        title="Xác nhận"
                        onPress={{}}
                        />
                        <Dialog.Button title="Hủy bỏ" onPress={toggleDialog5} />
                    </Dialog.Actions>
                </Dialog>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})