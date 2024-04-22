import React, { useEffect, useState } from "react";
import { StyleSheet, Text} from 'react-native';
import { FeatureHeaderComponent } from '../../components/FeatureHeaderComponent/index'
import { DetailIngredientComponent } from '../../components/DetailIngredientComponent/index'
import { ScrollView } from 'react-native';


export const DetailIngredientScreen = ({ route }) => {
    const { data } = route.params;
    // console.log(data);
    return (
        <ScrollView style={styles.container}>
            <FeatureHeaderComponent title="Thông tin nguyên liệu"/>
            <DetailIngredientComponent ingredient={data.ingredient}/>
        </ScrollView  >
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 10, backgroundColor: "white"
    },
    
  });
