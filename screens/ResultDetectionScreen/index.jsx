
import React, { useEffect, useState } from "react";
import { StyleSheet, Text} from 'react-native';
import { FeatureHeaderComponent } from '../../components/FeatureHeaderComponent/index'
import { Result } from '../../components/Result/index'
import { ScrollView } from 'react-native';


export const ResultDetectionScreen = ({ route }) => {

    const { uri } = route.params;

    return (
        <ScrollView style={styles.container}>
            <FeatureHeaderComponent title="Kết quả"/>
            <Result uri={uri}/>
        </ScrollView  >
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 10, backgroundColor: "white"
    },
    
  });
