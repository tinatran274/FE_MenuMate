import React, { useEffect, useStat } from "react";
import {View, StyleSheet, ScrollView} from 'react-native';
import { FeatureHeaderComponent } from '../../components/FeatureHeaderComponent/index'
import { SuggestMenuComponent } from '../../components/SuggestMenuComponent/index'



export const RecommendMenuScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
          <FeatureHeaderComponent title="gợi ý thực đơn"/>
          <SuggestMenuComponent/>
        </ScrollView  >
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 10, backgroundColor: "white"
    },
    
  });
