import React, { useEffect, useStat } from "react";
import {View, StyleSheet, Text} from 'react-native';
import { FeatureHeaderComponent } from '../../components/FeatureHeaderComponent/index'


export const ExerciseScreen = ({ navigation }) => {
    return (
        <View style={{}}>
          <FeatureHeaderComponent title="Tập luyện"/>
          <Text>ExerciseScreen</Text>
        </View  >
    )
}

const styles = StyleSheet.create({
    container: {
    },
    
  });
