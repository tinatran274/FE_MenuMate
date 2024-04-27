import React from "react";
import { StyleSheet, ScrollView} from 'react-native';
import { UserInfoComponent } from '../../components/UserInfoComponent/index'
import { FeatureHeaderComponent } from '../../components/FeatureHeaderComponent/index'



export const UserInfoScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <FeatureHeaderComponent title="Thông tin cá nhân"/>
            <UserInfoComponent/>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
    
  });
