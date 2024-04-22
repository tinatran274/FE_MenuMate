import React, { useEffect, useState } from "react";
import { StyleSheet, Text} from 'react-native';
import { FeatureHeaderComponent } from '../../components/FeatureHeaderComponent/index'
import { DetailDishComponent } from '../../components/DetailDishComponent/index'
import { ScrollView } from 'react-native';


export const DetailDishScreen = ({ route }) => {
    const { data } = route.params;

    return (
        <ScrollView style={styles.container}>
            <FeatureHeaderComponent title="Thông tin món ăn"/>
            <DetailDishComponent dish={data.dish}/>
        </ScrollView  >
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 10, backgroundColor: "white"
    },
    
  });
