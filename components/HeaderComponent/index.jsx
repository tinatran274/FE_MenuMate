import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';

export const HeaderComponent = () => {

    return (
        <View>
            <View style={{display:'flex', marginTop: 20, flexDirection: "row", marginBottom: 30}}>
                <Image style={{width: 50, height: 50, objectFit: "contain",}} source={require('../../assets/img_logo.png')} />
                <Image style={{ width: 190, height: 70, objectFit: "contain",}} source={require('../../assets/logo_name.png')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})