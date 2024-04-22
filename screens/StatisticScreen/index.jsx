import React, { useEffect, useStat } from "react";
import {View, StyleSheet, ScrollView} from 'react-native';
import { FeatureHeaderComponent } from '../../components/FeatureHeaderComponent/index'
import { CaloStatisticComponent } from '../../components/CaloStatisticComponent/index'



export const StatisticScreen = ({ navigation }) => {
    return (
        <ScrollView  style={styles.container}>
          <FeatureHeaderComponent title="Thống kê"/>
          <CaloStatisticComponent/>

        </ScrollView  >
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 10, backgroundColor: "white"
    },
  
    
  });
