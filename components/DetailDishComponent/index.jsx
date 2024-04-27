import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import { addDishFavo, selectIsLoading, selectIsSuccess, selectIsError, getUserDishData, getRecipeData} from '../../redux/dish/dishSlice'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserToken} from '../../redux/auth/authSlice';
import { Avatar, Dialog, Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const DetailDishComponent = ({ dish }) => {

    const dispatch = useDispatch()
    const navigation = useNavigation();
    const userToken = useSelector(selectUserToken)
    const loading = useSelector(selectIsLoading)
    const error = useSelector(selectIsError)
    const success = useSelector(selectIsSuccess)
    const [visible2, setVisible2] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [listIngredient, setListIngredient] = useState([])
  
    const calTimeBicycle = (calories) =>  {
      const time = Math.trunc(calories / 7);
      return time;
    }
    const calTimeRun = (calories) =>  {
      const time = Math.trunc(calories / 10);
      return time;
    }
    const calTimeWalking = (calories) =>  {
      const time = Math.trunc(calories / 5);
      return time;
    }

    const fetchUserData = async () => {
      const res = await dispatch(getUserDishData(userToken, dish.id))
      if (res) {
        setIsFavorite(res.is_favorited);
      }
      else {
        console.log('ddd Token expired');
        setVisible2(true);
      }
  }
  const fetchIngredientData = async () => {
    const res = await dispatch(getRecipeData(dish.id))
    if (res) {
      setListIngredient(res);
    }
  }
    useEffect(() => {
        fetchUserData();
        fetchIngredientData();
    }, []);

    if (loading) {
      return <View><ActivityIndicator size="large" color="#0000ff" /></View>   
    }
    // if (error) {
    //     return <View><Text>Error loading detail dish.</Text></View>
    // }

    const handleSetFavo = async () => {
      if (userToken) {
        await dispatch(addDishFavo(userToken, dish.id))
        setIsFavorite(false)
      }
    };
    const handleSetUnFavo = async () => {
        await dispatch(addDishFavo(userToken, dish.id))
        setIsFavorite(true)
    }

    return (
        <View style={styles.container}>
          <Image style={styles.dish_img} source={require('../../assets/restaurant.png')}/>
          <View style={{display:"flex", flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "space-between"}}>
              <Text style={{ fontSize: 25, fontWeight: "bold", width: "80%"}}>{dish.name}</Text>
                {isFavorite ? ( <Ionicons  onPress={handleSetFavo} name="heart" size={30} color= "red"></Ionicons>
                ) : ( <Ionicons onPress={handleSetUnFavo} name="heart" size={30} color= "gray"></Ionicons>)}
          </View>
          <Text style={{ fontWeight: "bold", marginTop: 40, marginBottom: 15}}>Giá trị dinh dưỡng:</Text>

            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", padding: 20,
              width: "100%", borderRadius: 12, backgroundColor: '#ffffff', shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5,}}>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.kcal}</Text>
                    <Text style={styles.txt}>kcal</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.glucid}</Text>
                    <Text style={styles.txt}>g lucid</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.lipid}</Text>
                    <Text style={styles.txt}>g lipid</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.protein}</Text>
                    <Text style={styles.txt}>g protein</Text>
                </View>
            </View>
            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", padding: 20,
              marginTop: 10, width: "100%", borderRadius: 12, backgroundColor: '#ffffff', shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5,}}>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.canxi}</Text>
                    <Text style={styles.txt}>mcg canxi</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.phosphor}</Text>
                    <Text style={styles.txt}> mcg phốt-pho</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.fe}</Text>
                    <Text style={styles.txt}>mcg sắt</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.beta_caroten}</Text>
                    <Text style={styles.txt}>mg beta caroten</Text>
                </View>
            </View>

            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", padding: 20,
              marginTop: 10, width: "100%", borderRadius: 12, backgroundColor: '#ffffff', shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5,}}>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.vitamin_c}</Text>
                    <Text style={styles.txt}>mg vit.C</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.vitamin_a}</Text>
                    <Text style={styles.txt}> mcg vit.A</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.vitamin_b1}</Text>
                    <Text style={styles.txt}>mg vit.B1</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{dish.vitamin_pp}</Text>
                    <Text style={styles.txt}>mg vit.PP</Text>
                </View>
            </View>
            
            <Text style={{width: "100%", fontWeight: "bold", marginTop: 50, marginBottom: 5}}>Nguyên liệu</Text>
            {listIngredient && listIngredient.map((ingr, index) => (
                ingr.grams ? (
                    <View key={index} style={{}}>
                        <Text>{index+1}: {ingr.grams} grams - {ingr.name}</Text>
                    </View>
                ) : (
                  <Text key={index}>{index+1}: {ingr.name}</Text>
                )
            ))}



            
            <View style={{marginTop: 50,  marginBottom: 60,}}>
                <Text style={{fontWeight: "bold", marginBottom: 25}}>Để tiêu hao {dish.kcal} kcal, cần:</Text>
                <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", marginHorizontal: 10}}>
                    <View  style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <Image style={styles.icon_ex} source={require('../../assets/walk.png')} />
                        <Text style={styles.txt_ex}>{calTimeWalking(dish.kcal)} phút</Text>
                    </View>
                    <View  style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <Image style={styles.icon_ex} source={require('../../assets/runner.png')} />
                        <Text style={styles.txt_ex}>{calTimeRun(dish.kcal)} phút</Text>
                    </View>
                    <View  style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <Image style={styles.icon_ex} source={require('../../assets/bicycle.png')} />
                        <Text style={styles.txt_ex}>{calTimeBicycle(dish.kcal)} phút</Text>
                    </View>
                </View>
            </View>
            <Dialog isVisible={visible2} onBackdropPress={() => setVisible2(false)} >
                <Dialog.Title title="Phiên đã hết hạn"/>
                <Text>Đăng nhập để tiếp tục</Text>
                <Dialog.Actions>
                    <Dialog.Button title="Đăng nhập" onPress={() => navigation.navigate('Login')}/>
                </Dialog.Actions>
            </Dialog>
        </View  >
    )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 5, paddingTop: 10,
    },
    dish_img: {
        width: "100%", height: 300, objectFit: "contain"
    },
    wrap: {
        display:"flex", flexDirection: "column", paddingHorizontal: 20, 
        borderRadius: 12, backgroundColor: '#ffffff', shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, marginTop: 30, width: "100%",
        shadowOpacity: 0.8, paddingVertical: 22, 
        shadowRadius: 4,
        elevation: 5, 
      },
    suggest_txt:{
        fontWeight: 'bold', marginLeft: 15, width: "80%", 
    },
    icon:{
      width: 35, height: 35, objectFit: "contain"
    },
    icon_ex:{
        width: 70, height: 70, objectFit: "contain"
      },
    txt_ex: {
        marginTop: 5
    },
    txt: {
        color: "gray", fontSize: 12
    },
    btn_txt: {
        fontWeight: "bold", color: 'white',
    },
    btn_bg: {
        backgroundColor: '#1A8C03', paddingVertical: 14, paddingHorizontal: 18, borderRadius: 25
    },
    input: {
        borderColor: '#1A8C03',
        borderWidth: 1, marginLeft: 15, width: "25%",
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    
  });
