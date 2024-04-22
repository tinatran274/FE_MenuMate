import React, { useEffect, useStat } from "react";
import { StyleSheet, Text} from 'react-native';
import { FeatureHeaderComponent } from '../../components/FeatureHeaderComponent/index'
import { ListIngredientComponent } from '../../components/ListIngredientComponent/index'
import { ScrollView } from 'react-native';


export const IngredientScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <FeatureHeaderComponent title="Nguyên liệu"/>
            <ListIngredientComponent/>
        </ScrollView  >
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 10, backgroundColor: "white"
    },
    
  });
