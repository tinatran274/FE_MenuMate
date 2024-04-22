import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { Svg,  Circle } from 'react-native-svg';
import GradientButton from '../UI/GradientButton/index';
import AntDesignIcon from '@expo/vector-icons/AntDesign';
import { selectUserToken, clearUserToken, setUserToken, setAuthError } from '../../redux/auth/authSlice';
import { getUserData, getUserCalo, addMorningCalo, addNoonCalo, addDinnerCalo, addSnackCalo, addExerciseCalo } from '../../redux/user/userSlice'
import { Ionicons } from '@expo/vector-icons';
import GradientCircleButton from '../UI/GradientCircleButton/index';
import { START_LINEAR_COLOR, END_LINEAR_COLOR } from '../../constants';

export const FollowCaloComponent = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userToken = useSelector(selectUserToken)
    const [userData, setUserData] = useState(null);
    const [totalCalories, setTotalCalories] = useState(0);
    const [tdee, setTDEE] = useState(1);
    const [percen, setPercen] = useState(0);
    const [morning, setMorning] = useState("");
    const [morningSeted, setMorningSeted] = useState(0);
    const [noon, setNoon] = useState("");
    const [noonSeted, setNoonSeted] = useState(0);
    const [dinner, setDinner] = useState("");
    const [dinnerSeted, setDinnerSeted] = useState(0);
    const [snack, setSnack] = useState("");
    const [snackSeted, setSnackSeted] = useState(0);
    const [exercise, setExercise] = useState("");
    const [exerciseSeted, setExerciseSeted] = useState(0);
    const [visible2, setVisible2] = useState(false)
    const [date, setDate] = useState(null);

    const setChangPercent = (data, tdee) => {
        const add = parseInt((data / tdee) * 100);
          const newPercent = percen+ add;
          if (newPercent < 100) {
                setPercen(newPercent)
          } else setPercen(100)
    }

    const handleGetUserData = async (token) => {
        const user = await dispatch(getUserData(token))
        if (user) {
            setUserData(user)
            const userCalories = await dispatch(getUserCalo(token))
            setDate(userCalories.date_add)
            setTDEE(user.tdee)
            let userCalo = 0;
            if (user && userCalories) {
                if (userCalories.total_morning_calo) {
                    setMorningSeted(parseInt(userCalories.total_morning_calo));
                    userCalo += userCalories.total_morning_calo;
                }
                if (userCalories.total_noon_calo) {
                    setNoonSeted(parseInt(userCalories.total_noon_calo));
                    userCalo += userCalories.total_noon_calo;
                }
                if (userCalories.total_dinner_calo) {
                    setDinnerSeted(parseInt(userCalories.total_dinner_calo));
                    userCalo += userCalories.total_dinner_calo;
                }
                if (userCalories.total_snack_calo) {
                    setSnackSeted(parseInt(userCalories.total_snack_calo));
                    userCalo += userCalories.total_snack_calo;
                }
                if (userCalories.total_exercise_calo) {
                    setExerciseSeted(parseInt(userCalories.total_exercise_calo));
                    userCalo -= userCalories.total_exercise_calo;
                }
                setTotalCalories(userCalo);
                setChangPercent(userCalo, user.tdee);
            }
        }
        else {
            console.log('ccs Token expired');
            setVisible2(true);
        }
    }
    const fetchData = async () => {
        await handleGetUserData(userToken);
    }

    useEffect(() => {
        fetchData(userToken)
    }, [])

    const handleAdvice = () => {
        if (userData) {
            const temp = parseInt(tdee - totalCalories);
            if (userData.aim == "Tăng cân") {
            if (temp > 0)
                return `Để đạt được mục tiêu tăng cân bạn cần nạp nhiều hơn ${temp} kcal trong ngày hôm nay`;
            else return `Bạn đã hoàn thành mục tiêu tăng cân trong ngày`;
            } else if (userData.aim == "Giữ cân") {
            if (temp > 0)
                return `Để đạt được mục tiêu giữ cân bạn cần nạp thêm khoảng ${temp} kcal trong ngày hôm nay`;
            else
                return `Cảnh báo nguy cơ tăng cân, bạn cần tiêu hao khoảng ${-temp} kcal để giữ cân`;
            } else {
            if (temp > 0)
                return `Để đạt được mục tiêu giảm cân bạn cần nạp ít hơn ${temp} kcal trong ngày hôm nay`;
            else
                return `Cảnh báo tăng cân, bạn cần tiêu hao nhiều hơn ${-temp} kcal để giảm cân`;
            }
        }
    }

    const handleAddMorning = () => {
        if (userData) {
          setTotalCalories(totalCalories + parseInt(morning));
          setChangPercent(parseInt(morning), tdee);
          dispatch(addMorningCalo(userToken && userToken, parseInt(morning)));
          setMorningSeted(morningSeted + parseInt(morning));
          setMorning("");
        } else setVisible2(true);
    }
    const handleAddNoon = () => {
        if (userData) {
          setTotalCalories(totalCalories + parseInt(noon));
          setChangPercent(parseInt(noon), tdee);
          dispatch(addNoonCalo(userToken && userToken, parseInt(noon)));
          setNoonSeted(noonSeted + parseInt(noon));
          setNoon("");
        } else setVisible2(true);
    }
    const handleAddDinner = () => {
        if (userData) {
          setTotalCalories(totalCalories + parseInt(dinner));
          setChangPercent(parseInt(dinner), tdee);
          dispatch(addDinnerCalo(userToken && userToken, parseInt(dinner)));
          setDinnerSeted(dinnerSeted + parseInt(dinner));
          setDinner("");
        } else setVisible2(true);
    }
    const handleAddSnack = () => {
        if (userData) {
          setTotalCalories(totalCalories + parseInt(snack));
          setChangPercent(parseInt(snack), tdee);
          dispatch(addSnackCalo(userToken && userToken, parseInt(snack)));
          setSnackSeted(snackSeted + parseInt(snack));
          setSnack("");
        } else setVisible2(true);
    }

    const handleAddExercise = () => {
        if (userData) {
          setTotalCalories(totalCalories - parseInt(exercise));
          setChangPercent(parseInt(-exercise), tdee);
          dispatch(addExerciseCalo(userToken && userToken, parseInt(exercise)));
          setExerciseSeted(exerciseSeted + parseInt(exercise));
          setExercise("");
        } else setVisible2(true);
    }


    // console.log('ccs', userToken)
    
    return (
        <View style={styles.container}>
            <View style={styles.statistic}>
                <View></View>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}}>
                    <AntDesignIcon name="left" color="black" size={18} style={{ fontWeight: 'bold' }}/>
                    <AntDesignIcon name="calendar" color="black" size={16} style={{ fontWeight: 'bold' }}/>
                    <Text>{date}</Text>
                    <AntDesignIcon name="right" color="black" size={18} style={{ fontWeight: 'bold' }}/>
                </View>
            </View>
            <View style={{marginBottom: 40, alignItems: "center", justifyContent: 'center',}}>
                <Svg width={250} height={250}>
                    <Circle cx={125} cy={125} r={(250 - 20) / 2} fill="none"
                        stroke='#e6e6e6' strokeWidth={20}
                    />
                    <Circle cx={125} cy={125} r={(250 - 20) / 2} fill="none"
                        stroke='#1A8C03' strokeWidth={20} strokeDasharray={((250 - 20) / 2) * 2 * Math.PI}
                        strokeDashoffset={(((250 - 20) / 2) * 2 * Math.PI) - (percen/100) * ((250 - 20) / 2) * 2 * Math.PI}
                        transform={`rotate(-90 ${125} ${125})`}
                    />
                </Svg>
                <View style={{position: "absolute", alignItems: "center"}}>
                    <Text style={{fontWeight: "bold", fontSize: 25, color: '#1A8C03' }}>
                    {totalCalories}/{Math.trunc(tdee)}</Text>
                    <Text style={{fontSize: 20, color: '#1A8C03' }}>Kcal</Text>
                </View>
            </View>
            <View style={styles.wrap_suggest}>
                <Image style={styles.icon} source={require('../../assets/img_tip.png')} />
                <View>
                    <Text style={{marginHorizontal: 10}}>{handleAdvice()}</Text>
                </View>  
            </View>
            <View style={{width: "100%", display:"flex", flexDirection: "row", justifyContent: "space-between",}}>
                <View style={{display:"flex", flexDirection: "row", alignItems: "center",}}>
                    <Text style={styles.suggest_txt}>Bữa sáng</Text>
                    <Text style={{color: "gray", marginLeft: 10}}> +{morningSeted}</Text>
                </View>
                <View></View>
            </View>
            <View style={{display:"flex", flexDirection: "row", alignItems: "center", 
                justifyContent: "space-between", marginBottom: 35, width: "100%" }}>
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
                        name="extension-puzzle" size={25} color="#BFBFBF" />
                        <TextInput style={{width: "70%",}}
                            placeholder="Nhập số kcal bữa sáng ..."
                            value={morning.toString()}
                            onChangeText={setMorning}
                        />
                </View>
                <GradientCircleButton onPress={handleAddMorning} colors={[START_LINEAR_COLOR, END_LINEAR_COLOR]} /> 
            </View>
            <View style={{width: "100%", display:"flex", flexDirection: "row", justifyContent: "space-between",}}>
                <View style={{display:"flex", flexDirection: "row", alignItems: "center",}}>
                    <Text style={styles.suggest_txt}>Bữa trưa</Text>
                    <Text style={{color: "gray", marginLeft: 10}}> +{noonSeted}</Text>
                </View>
                <View></View>
            </View>
            <View style={{display:"flex", flexDirection: "row", alignItems: "center", 
                justifyContent: "space-between", marginBottom: 35, width: "100%" }}>
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
                        name="extension-puzzle" size={25} color="#BFBFBF" />
                        <TextInput style={{width: "70%",}}
                            placeholder="Nhập số kcal bữa trưa ..."
                            value={noon.toString()}
                            onChangeText={setNoon}
                        />
                </View>
                <GradientCircleButton onPress={handleAddNoon} colors={[START_LINEAR_COLOR, END_LINEAR_COLOR]} /> 
            </View>
            <View style={{width: "100%", display:"flex", flexDirection: "row", justifyContent: "space-between",}}>
                <View style={{display:"flex", flexDirection: "row", alignItems: "center",}}>
                    <Text style={styles.suggest_txt}>Bữa tối</Text>
                    <Text style={{color: "gray", marginLeft: 10}}> +{dinnerSeted}</Text>
                </View>
                <View></View>
            </View>
            <View style={{display:"flex", flexDirection: "row", alignItems: "center", 
                justifyContent: "space-between", marginBottom: 35, width: "100%" }}>
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
                        name="extension-puzzle" size={25} color="#BFBFBF" />
                        <TextInput style={{width: "70%",}}
                            placeholder="Nhập số kcal bữa tối ..."
                            value={dinner.toString()}
                            onChangeText={setDinner}
                        />
                </View>
                <GradientCircleButton onPress={handleAddDinner} colors={[START_LINEAR_COLOR, END_LINEAR_COLOR]} /> 
            </View>

            <View style={{width: "100%", display:"flex", flexDirection: "row", justifyContent: "space-between",}}>
                <View style={{display:"flex", flexDirection: "row", alignItems: "center",}}>
                    <Text style={styles.suggest_txt}>Bữa phụ</Text>
                    <Text style={{color: "gray", marginLeft: 10}}> +{snackSeted}</Text>
                </View>
                <View></View>
            </View>
            <View style={{display:"flex", flexDirection: "row", alignItems: "center", 
                justifyContent: "space-between", marginBottom: 35, width: "100%" }}>
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
                        name="extension-puzzle" size={25} color="#BFBFBF" />
                        <TextInput style={{width: "70%",}}
                            placeholder="Nhập số kcal bữa phụ ..."
                            value={snack.toString()}
                            onChangeText={setSnack}
                        />
                </View>
                <GradientCircleButton onPress={handleAddSnack} colors={[START_LINEAR_COLOR, END_LINEAR_COLOR]} /> 
            </View>

            <View style={{width: "100%", display:"flex", flexDirection: "row", justifyContent: "space-between",}}>
                <View style={{display:"flex", flexDirection: "row", alignItems: "center",}}>
                    <Text style={styles.suggest_txt}>Tập luyện</Text>
                    <Text style={{color: "gray", marginLeft: 10}}> +{exerciseSeted}</Text>
                </View>
                <View></View>
            </View>
            <View style={{display:"flex", flexDirection: "row", alignItems: "center", 
                justifyContent: "space-between", marginBottom: 35, width: "100%" }}>
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
                        name="extension-puzzle" size={25} color="#BFBFBF" />
                        <TextInput style={{width: "70%",}}
                            placeholder="Nhập số kcal tập luyện ..."
                            value={exercise.toString()}
                            onChangeText={setExercise}
                        />
                </View>
                <GradientCircleButton onPress={handleAddExercise} colors={[START_LINEAR_COLOR, END_LINEAR_COLOR]} /> 
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        marginHorizontal: 10, alignItems: "center"
    },
    statistic:{
        display:"flex", flexDirection: "row", justifyContent:"space-between", 
        alignItems: "center", marginBottom: 40, width: "92%"
    },
    icon:{
        width: 35, height: 35, objectFit: "contain",
    },
    wrap_suggest: {
        display:"flex", flexDirection: "row", alignItems: "center", marginHorizontal:10, 
        marginBottom: 30
    },
    wrap_inp: {
        display:"flex", flexDirection: "column",  marginHorizontal:10, paddingHorizontal: 20, 
        borderRadius: 10, backgroundColor: '#ffffff', shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, marginBottom: 40, width: "100%",
        shadowOpacity: 0.8, paddingVertical: 22,
        shadowRadius: 4,
        elevation: 5, 
    },
    cart:{
        width: 28, height: 28, objectFit: "contain",
    },
    suggest_txt:{
        fontWeight: 'bold', marginLeft: 20, fontSize: 15, marginBottom: 5
    },
    input: {
        width: "84%",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8, paddingVertical: 14,
        shadowRadius: 4,
        elevation: 5, 
    },

    btn_txt: {
        fontWeight: "bold", color: 'white',
    },
    btn_bg: {
        backgroundColor: '#1A8C03', padding: 14, borderRadius: 30,
        display:"flex", flexDirection:"row", justifyContent:"center"
    },
    
    
  });
  