import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { START_LINEAR_COLOR, END_LINEAR_COLOR, API_URL } from '../../constants';
import GradientNomalButton from '../UI/GradientNomalButton/index';
import { CardDishComponent } from '../../components/CardDishComponent/index'
import { Tab, TabView } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Result = ({uri}) => {

    const listDishID = [11, 39, 10, 30]
    const listMenu = [1, 46, 11, 30, 39, 10, 34, 15, 1, 37, 63, 16, 23]
    const [listResult, setListResult] = useState(['xup lo', 'ca', 'ca rot', 'thit bo', 'ca chua', 'bap cai', 'bap'])
    const [stateF, setStateF] = useState(0)
    const [indexMeal, setIndexMeal] = useState(0)
    const [listDish, setListDish] = useState([
        {
            "beta_caroten": 78.6,
            "canxi": 36.68,
            "fe": 3.79,
            "glucid": 1.61,
            "id": 10,
            "kcal": 324.52,
            "lipid": 24.97,
            "main_category": "Protein",
            "name": "Đậu hũ nhồi thịt sốt cà chua",
            "phosphor": 217.34,
            "protein": 23.27,
            "vitamin_a": 6.36,
            "vitamin_b1": 0.38,
            "vitamin_b2": 0.13,
            "vitamin_c": 9.27,
            "vitamin_pp": 2.28
        },
        {
            "beta_caroten": 5290.18,
            "canxi": 48.23,
            "fe": 3.91,
            "glucid": 27.88,
            "id": 11,
            "kcal": 246.91,
            "lipid": 7.35,
            "main_category": "Protein",
            "name": "Bò sốt vang",
            "phosphor": 212.52,
            "protein": 17.29,
            "vitamin_a": 0.0,
            "vitamin_b1": 0.26,
            "vitamin_b2": 0.22,
            "vitamin_c": 46.37,
            "vitamin_pp": 4.43
        },
        {
            "beta_caroten": 52.99,
            "canxi": 55.52,
            "fe": 1.39,
            "glucid": 4.43,
            "id": 30,
            "kcal": 65.18,
            "lipid": 1.55,
            "main_category": "Vegetables",
            "name": "Canh bắp cải cuộn tôm thịt",
            "phosphor": 96.41,
            "protein": 8.44,
            "vitamin_a": 4.35,
            "vitamin_b1": 0.23,
            "vitamin_b2": 0.09,
            "vitamin_c": 24.19,
            "vitamin_pp": 1.59
        },
        {
            "beta_caroten": 3423.6,
            "canxi": 39.46,
            "fe": 2.11,
            "glucid": 33.46,
            "id": 39,
            "kcal": 192.66,
            "lipid": 1.75,
            "main_category": "Grains",
            "name": "Cháo thịt bò",
            "phosphor": 135.32,
            "protein": 10.82,
            "vitamin_a": 4.0,
            "vitamin_b1": 0.09,
            "vitamin_b2": 0.1,
            "vitamin_c": 8.33,
            "vitamin_pp": 2.27
        }
    ])
    const [morningToday, setMorningToday] = useState([{
        "beta_caroten": 0.0,
        "canxi": 23.72,
        "fe": 1.03,
        "glucid": 60.0,
        "id": 1,
        "kcal": 271.94,
        "lipid": 0.79,
        "main_category": "Grains",
        "name": "Cơm gạo tẻ",
        "phosphor": 82.21,
        "protein": 6.25,
        "vitamin_a": 0.0,
        "vitamin_b1": 0.08,
        "vitamin_b2": 0.02,
        "vitamin_c": 0.0,
        "vitamin_pp": 1.26
    },
    {
        "beta_caroten": 5290.18,
        "canxi": 48.23,
        "fe": 3.91,
        "glucid": 27.88,
        "id": 11,
        "kcal": 246.91,
        "lipid": 7.35,
        "main_category": "Protein",
        "name": "Bò sốt vang",
        "phosphor": 212.52,
        "protein": 17.29,
        "vitamin_a": 0.0,
        "vitamin_b1": 0.26,
        "vitamin_b2": 0.22,
        "vitamin_c": 46.37,
        "vitamin_pp": 4.43
    },
    {
        "beta_caroten": 52.99,
        "canxi": 55.52,
        "fe": 1.39,
        "glucid": 4.43,
        "id": 30,
        "kcal": 65.18,
        "lipid": 1.55,
        "main_category": "Vegetables",
        "name": "Canh bắp cải cuộn tôm thịt",
        "phosphor": 96.41,
        "protein": 8.44,
        "vitamin_a": 4.35,
        "vitamin_b1": 0.23,
        "vitamin_b2": 0.09,
        "vitamin_c": 24.19,
        "vitamin_pp": 1.59
    },
    {
        "beta_caroten": 3343.5,
        "canxi": 184.8,
        "fe": 0.52,
        "glucid": 12.44,
        "id": 46,
        "kcal": 123.3,
        "lipid": 5.66,
        "main_category": "Dairy",
        "name": "Smoothie táo cà rốt",
        "phosphor": 144.35,
        "protein": 5.8,
        "vitamin_a": 62.5,
        "vitamin_b1": 0.1,
        "vitamin_b2": 0.28,
        "vitamin_c": 14.05,
        "vitamin_pp": 0.52
    }])
    const [lunchToday, setLunchToday] = useState([{
        "beta_caroten": 3423.6,
        "canxi": 39.46,
        "fe": 2.11,
        "glucid": 33.46,
        "id": 39,
        "kcal": 192.66,
        "lipid": 1.75,
        "main_category": "Grains",
        "name": "Cháo thịt bò",
        "phosphor": 135.32,
        "protein": 10.82,
        "vitamin_a": 4.0,
        "vitamin_b1": 0.09,
        "vitamin_b2": 0.1,
        "vitamin_c": 8.33,
        "vitamin_pp": 2.27
    },{
        "beta_caroten": 78.6,
        "canxi": 36.68,
        "fe": 3.79,
        "glucid": 1.61,
        "id": 10,
        "kcal": 324.52,
        "lipid": 24.97,
        "main_category": "Protein",
        "name": "Đậu hũ nhồi thịt sốt cà chua",
        "phosphor": 217.34,
        "protein": 23.27,
        "vitamin_a": 6.36,
        "vitamin_b1": 0.38,
        "vitamin_b2": 0.13,
        "vitamin_c": 9.27,
        "vitamin_pp": 2.28
    },
    {
        "beta_caroten": 0.0,
        "canxi": 18.4,
        "fe": 0.4,
        "glucid": 5.84,
        "id": 15,
        "kcal": 24.0,
        "lipid": 0.0,
        "main_category": "Fruits",
        "name": "Bưởi",
        "phosphor": 14.4,
        "protein": 0.16,
        "vitamin_a": 0.0,
        "vitamin_b1": 0.03,
        "vitamin_b2": 0.02,
        "vitamin_c": 76.0,
        "vitamin_pp": 0.24
    },
    {
        "beta_caroten": 1269.2,
        "canxi": 89.68,
        "fe": 2.35,
        "glucid": 7.64,
        "id": 34,
        "kcal": 121.2,
        "lipid": 3.23,
        "main_category": "Vegetables",
        "name": "Canh chua cá chép",
        "phosphor": 211.0,
        "protein": 15.6,
        "vitamin_a": 158.38,
        "vitamin_b1": 0.09,
        "vitamin_b2": 0.15,
        "vitamin_c": 73.6,
        "vitamin_pp": 2.39
    }])
    const [dinnerToday, setDinnerToday] = useState([{
        "beta_caroten": 0.0,
        "canxi": 23.72,
        "fe": 1.03,
        "glucid": 60.0,
        "id": 1,
        "kcal": 271.94,
        "lipid": 0.79,
        "main_category": "Grains",
        "name": "Cơm gạo tẻ",
        "phosphor": 82.21,
        "protein": 6.25,
        "vitamin_a": 0.0,
        "vitamin_b1": 0.08,
        "vitamin_b2": 0.02,
        "vitamin_c": 0.0,
        "vitamin_pp": 1.26
    },
    {
        "beta_caroten": 266.8,
        "canxi": 63.23,
        "fe": 3.19,
        "glucid": 2.41,
        "id": 37,
        "kcal": 166.79,
        "lipid": 11.05,
        "main_category": "Protein",
        "name": "Cà chua xào trứng",
        "phosphor": 212.33,
        "protein": 14.34,
        "vitamin_a": 662.16,
        "vitamin_b1": 0.17,
        "vitamin_b2": 0.32,
        "vitamin_c": 20.8,
        "vitamin_pp": 0.47
    },
    {
        "beta_caroten": 6.4,
        "canxi": 20.8,
        "fe": 1.12,
        "glucid": 3.84,
        "id": 63,
        "kcal": 24.0,
        "lipid": 0.08,
        "main_category": "Vegetables",
        "name": "Súp lơ luộc",
        "phosphor": 40.8,
        "protein": 2.0,
        "vitamin_a": 0.8,
        "vitamin_b1": 0.09,
        "vitamin_b2": 0.08,
        "vitamin_c": 56.0,
        "vitamin_pp": 0.48
    },{
        "beta_caroten": 56.8,
        "canxi": 27.2,
        "fe": 0.32,
        "glucid": 6.64,
        "id": 16,
        "kcal": 30.4,
        "lipid": 0.08,
        "main_category": "Fruits",
        "name": "Cam",
        "phosphor": 18.4,
        "protein": 0.72,
        "vitamin_a": 0.0,
        "vitamin_b1": 0.06,
        "vitamin_b2": 0.02,
        "vitamin_c": 32.0,
        "vitamin_pp": 0.16
    }])
    const [snackToday, setSnackToday] = useState([{
        "beta_caroten": 32.0,
        "canxi": 12.0,
        "fe": 0.4,
        "glucid": 5.2,
        "id": 23,
        "kcal": 23.2,
        "lipid": 0.0,
        "main_category": "Fruits",
        "name": "Mãng cầu (na)",
        "phosphor": 13.6,
        "protein": 0.64,
        "vitamin_a": 0.0,
        "vitamin_b1": 0.06,
        "vitamin_b2": 0.02,
        "vitamin_c": 19.2,
        "vitamin_pp": 0.16
    }])



    return (
        <View>
            {/* <Text>{uri}</Text> */}
            {/* <Image source={{ uri: uri }} style={{ width: "100%", height: 500 }} /> */}
            <Image source={require('../../assets/test24.jpg')} style={{ width: "100%", height: 500, objectFit: "contain"}} />
            <View style={{display: "flex", flexDirection: "row", gap: 5, marginVertical: 20, 
                flexWrap: "wrap", alignItems: "center"}}>
                <Text style={{fontWeight: "bold", fontSize: 16, textTransform: 'uppercase', 
                color: END_LINEAR_COLOR}}>THỰC PHẨM: </Text>
                {listResult.length ? listResult.map((ingre, index) => { return (
                    <View key={index} style={{ backgroundColor: '#201E43', paddingHorizontal: 10, borderRadius: 50, 
                        paddingVertical: 6 }}>
                        <Text style={{color: "white", fontWeight: "bold"}}>{ingre}</Text>
                    </View>
                )})
                : <Text style={{fontWeight: "bold", color: "red"}}>Không có kết quả!</Text>} 
            </View>
            <View style={{display: "flex", flexDirection: "row", gap: 5, 
                alignItems: "center"}}>
                <GradientNomalButton
                    onPress={() => setStateF(1)}
                    title="Gợi ý món ăn"
                    colors={['#FF1E3F', '#FF1E3F']}
                />  
                <GradientNomalButton
                    onPress={() => setStateF(2)}
                    title="Gợi ý thực đơn"
                    colors={['#FF1E3F', '#FF1E3F']}
                /> 
            </View>
            {stateF && stateF==1 ? 
                <View style={styles.list_item}>
                {listDish && listDish.map((dish) => { return (
                    <CardDishComponent
                        key={dish.id}
                        dish = {dish}/>
                    )})
                }
                </View>
                :
                <View>


                </View>
            }

            {stateF && stateF==2 ? 
                <View >
                    <Tab value={indexMeal} onChange={(e) => setIndexMeal(e)}
                        indicatorStyle={{ backgroundColor: 'white', height: 3,}}
                        style={{backgroundColor: END_LINEAR_COLOR, marginVertical: 20}}
                        variant="primary">
                        <Tab.Item title="Sáng" titleStyle={{ fontSize: 12 }}
                            icon={{ name: 'sunny', type: 'ionicon', color: 'white' }} />
                        <Tab.Item title="Trưa" titleStyle={{ fontSize: 12 }}
                            icon={{ name: 'partly-sunny', type: 'ionicon', color: 'white' }} />
                        <Tab.Item title="Tối" titleStyle={{ fontSize: 12 }}
                            icon={{ name: 'moon', type: 'ionicon', color: 'white' }} />
                        <Tab.Item title="Phụ" titleStyle={{ fontSize: 12 }}
                            icon={{ name: 'cafe', type: 'ionicon', color: 'white' }} />
                    </Tab>
                    <View style={{marginBottom: 10}}>
                        <View style={styles.list_item1}>
                            {morningToday && indexMeal === 0 && morningToday.map((dish, index) => { return (
                                <CardDishComponent key={index} dish = {dish}/> )})}
                        </View>
                        <View style={styles.list_item}>
                            {lunchToday && indexMeal === 1 && lunchToday.map((dish, index) => { return (
                                <CardDishComponent key={index} dish = {dish}/> )})}
                        </View>
                        <View style={styles.list_item}>
                            {dinnerToday && indexMeal === 2 && dinnerToday.map((dish, index) => { return (
                                <CardDishComponent key={index} dish = {dish}/> )})}
                        </View>
                        <View style={styles.list_item}>
                            {snackToday && indexMeal === 3 && snackToday.map((dish, index) => { return (
                                <CardDishComponent key={index} dish = {dish}/>)})}
                        </View>
                    </View>
                </View>
                :
                <View>


                </View>
            }

        </View>
    );
};

export default Result;


const styles = StyleSheet.create({
    container: {
        
    },
    list_item1: {
        display: "flex", flexDirection: "row", gap: 15, marginHorizontal: 5, flexWrap: "wrap"
    },
    list_item: {
        display: "flex", flexDirection: "row", gap: 15, marginHorizontal: 5, marginTop: 20, 
        marginBottom: 60, flexWrap: "wrap"
    },
})
