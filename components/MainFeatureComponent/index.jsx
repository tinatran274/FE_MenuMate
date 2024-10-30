import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientArea from '../../components/UI/GradientArea/index';
import GradientArea2 from '../../components/UI/GradientArea2/index';

export const MainFeatureComponent = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <GradientArea
                onPress={() => navigation.push('RecommendMenu')}
                title="Khám phá thực đơn dành riêng cho bạn"
                colors={['#FF1E3F', '#FF7E06']}
            /> 
            <GradientArea2
                onPress={() => navigation.push('Detection')}
                title="Nhận diện thực phẩm"
                colors={['#FF1E3F', '#FF7E06']}
            /> 
            <View style={styles.row}>
                <TouchableOpacity  style={styles.wrap} onPress={() => navigation.navigate('UserInfo')}>
                    <Image style={styles.icon} source={require('../../assets/running.png')} />
                    <Text>Cá nhân</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.wrap} onPress={() => navigation.navigate('ControlCalories')}>
                    <Image style={styles.icon} source={require('../../assets/pie-chart.png')} />
                    <Text>QLý calo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrap} onPress={() => navigation.push('Ingredient')}>
                    <Image style={styles.icon} source={require('../../assets/img_ingre.png')} />
                    <Text>Nguyên liệu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrap} onPress={() => navigation.push('Dish')}>
                    <Image style={styles.icon} source={require('../../assets/main-course.png')} />
                    <Text>Món ăn</Text>
                </TouchableOpacity>
                
            </View>
            {/* <View style={styles.row}>
                <TouchableOpacity  style={styles.wrap} onPress={() => navigation.navigate('Ingredient')}>
                    <Image style={styles.icon} source={require('../../assets/img_ingre.png')} />
                    <Text>Nguyên liệu</Text>
                </TouchableOpacity >
            </View> */}
            <View style={styles.line} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display:"flex", flexDirection: "column", 
    },
    row:{
        display:"flex", flexDirection: "row", gap: 15, flexWrap: "nowrap", marginVertical: 15
    },
    wrap: {
        display:"flex", flexDirection: "column", alignItems: "center", padding: 6
    },
    txt:{
        fontWeight: 'bold', color: '#1A8C03', marginLeft: 15, marginBottom: 20
    },
    icon:{
        width: 35, height: 35, objectFit: "contain", marginBottom: 8
    },
    line: {
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 20,
      },

  });
  