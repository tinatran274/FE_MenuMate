import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import { getDishIngredient, selectIsLoading, selectIsSuccess, selectIsError} from '../../redux/ingredient/ingredientSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { CardDishComponent } from '../../components/CardDishComponent/index'


export const DetailIngredientComponent = ({ ingredient }) => {

    const dispatch = useDispatch()
    const navigation = useNavigation();
    const loading = useSelector(selectIsLoading)
    const error = useSelector(selectIsError)
    const success = useSelector(selectIsSuccess)
    const [listDish, setListDish] = useState([])

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

    const fetchIngredientData = async () => {
        const res = await dispatch(getDishIngredient(ingredient.id))
        if (res) {
            setListDish(res);
        } 
    }
    useEffect(() => {
        fetchIngredientData();
    }, []);

    if (loading) {
        return <View><ActivityIndicator size="large" color="#0000ff" /></View>   
    }

    return (
        <View style={styles.container}>
          <Image style={styles.dish_img} source={require('../../assets/vegetables.png')}/>
          <Text style={{marginTop: 30, fontSize: 25, fontWeight: "bold", width: "100%"}}>{ingredient.name}
         </Text>
         
          <Text style={{marginTop: 10}}>Thuộc nhóm thực phẩm: {ingredient.category}</Text>
             <Text style={{ fontWeight: "bold", marginTop: 40, marginBottom: 15}}>Giá trị dinh dưỡng trên 100 gram:</Text>

            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", padding: 20,
              width: "100%", borderRadius: 12, backgroundColor: '#ffffff', shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5,}}>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.kcal}</Text>
                    <Text style={styles.txt}>kcal</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.glucid}</Text>
                    <Text style={styles.txt}>g lucid</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.lipid}</Text>
                    <Text style={styles.txt}>g lipid</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.protein}</Text>
                    <Text style={styles.txt}>g protein</Text>
                </View>
            </View>

            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", padding: 20,
              marginTop: 10, width: "100%", borderRadius: 12, backgroundColor: '#ffffff', shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5,}}>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.canxi}</Text>
                    <Text style={styles.txt}>mcg canxi</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.phosphor}</Text>
                    <Text style={styles.txt}> mcg phốt-pho</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.fe}</Text>
                    <Text style={styles.txt}>mcg sắt</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.beta_caroten}</Text>
                    <Text style={styles.txt}>mg beta caroten</Text>
                </View>
            </View>

            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", padding: 20,
              marginTop: 10, width: "100%", borderRadius: 12, backgroundColor: '#ffffff', shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5,}}>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.vitamin_c}</Text>
                    <Text style={styles.txt}>mg vit.C</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.vitamin_a}</Text>
                    <Text style={styles.txt}> mcg vit.A</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.vitamin_b1}</Text>
                    <Text style={styles.txt}>mg vit.B1</Text>
                </View>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.value}>{ingredient.vitamin_pp}</Text>
                    <Text style={styles.txt}>mg vit.PP</Text>
                </View>
            </View>
                
            <View style={{marginTop: 50}}>
                <Text style={{fontWeight: "bold", marginBottom: 25}}>Để tiêu hao {ingredient.kcal} kcal, cần:</Text>
                <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", marginHorizontal: 10}}>
                    <View  style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <Image style={styles.icon_ex} source={require('../../assets/walk.png')} />
                        <Text style={styles.txt_ex}>{calTimeWalking(ingredient.kcal)} phút</Text>
                    </View>
                    <View  style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <Image style={styles.icon_ex} source={require('../../assets/runner.png')} />
                        <Text style={styles.txt_ex}>{calTimeRun(ingredient.kcal)} phút</Text>
                    </View>
                    <View  style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <Image style={styles.icon_ex} source={require('../../assets/bicycle.png')} />
                        <Text style={styles.txt_ex}>{calTimeBicycle(ingredient.kcal)} phút</Text>
                    </View>
                </View>
            </View>

            {listDish.length ? <View>
                <Text style={{ fontWeight: "bold", marginTop: 50}}>Món ăn từ "{ingredient.name}"</Text>
                <View style={styles.list_item}>
                    {listDish.map((dish) => { return (
                            <CardDishComponent
                                key={dish.id}
                                dish = {dish}/>
                        )})
                    }
                </View>
            </View>: ""}
            <View style={{ height: 80,}}>

            </View>
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
    list_item: {
        display: "flex", flexDirection: "row", gap: 15,  marginTop: 20, 
        flexWrap: "wrap"
    },

    
  });
