import React, { useEffect, useStat } from "react";
import { StyleSheet, Text} from 'react-native';
import { FeatureHeaderComponent } from '../../components/FeatureHeaderComponent/index'
import { ListDishComponent } from '../../components/ListDishComponent/index'
import { ScrollView } from 'react-native';


export const DishScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <FeatureHeaderComponent title="món ăn"/>
            <ListDishComponent/>
        </ScrollView  >
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 10, backgroundColor: "white"
    },
    
  });
