import React, { useEffect, useStat } from "react";
import {View, StyleSheet, ScrollView} from 'react-native';
import { FeatureHeaderComponent } from '../../components/FeatureHeaderComponent/index'
import { FollowCaloComponent } from '../../components/FollowCaloComponent/index'


export const ControlCaloriesScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
          <FeatureHeaderComponent title="Quản lý calories"/>
          <FollowCaloComponent/>

        </ScrollView  >
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white"
    },
    
  });
