import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


export const CardIngredientComponent = ({id, ingredient}) => {

    const navigation = useNavigation();
    const data = { ingredient };
    return (
        <TouchableOpacity style={styles.ingredient}  
        onPress={() => navigation.push('DetailIngredient', {data})}
        >
            <Image style={styles.ingredient_img} source={require('../../assets/vegetables.png')}/>
            <View style={{width: "60%"}}>
                <Text style={styles.ingredient_name}>{ingredient.name}</Text>
                <View style={{display: "flex", flexDirection:"row", justifyContent: "space-around"}}>
                    <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <Text style={styles.txt}>Kcal</Text>
                        <Text style={styles.value}>{ingredient.kcal}</Text>
                    </View>
                    <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <Text style={styles.txt}>Glucid</Text>
                        <Text style={styles.value}>{ingredient.glucid}</Text>
                    </View>
                    <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <Text style={styles.txt}>Lipid</Text>
                        <Text style={styles.value}>{ingredient.lipid}</Text>
                    </View>
                    <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <Text style={styles.txt}>Protein</Text>
                        <Text style={styles.value}>{ingredient.protein}</Text>
                    </View>
                </View>
               
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ingredient: {
        display: "flex", flexDirection: "row",
        width: "100%", borderRadius: 12, backgroundColor: '#ffffff', shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5, position: "relative"
    },
    ingredient_img: {
        width: "35%", height: 80, objectFit: "contain", borderTopLeftRadius: 12, borderBottomLeftRadius: 15, marginVertical: 10
    },
    ingredient_name: {
        width: "100%", height: 35, paddingHorizontal: 10, marginTop: 15, fontWeight: "bold", 
        fontSize: 16,
    },
    txt: {
        color: "gray", fontSize: 12
    },
    value: {
        fontWeight: 'bold', fontSize: 16, color: '#1A8C03'
    },
    add:{
        position:'absolute', right: 10, bottom: 10,
    },
    
  });
  