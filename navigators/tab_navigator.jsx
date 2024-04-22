import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HomeScreen } from "../screens/HomeScreen/index";
import { DetectionScreen } from "../screens/DetectionScreen/index";
import { UserInfoScreen } from "../screens/UserInfoScreen/index";
import { Ionicons } from '@expo/vector-icons';
import { START_LINEAR_COLOR, END_LINEAR_COLOR } from '../constants';


const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: START_LINEAR_COLOR,
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            labelStyle: {
                fontSize: 16,
            },
          }}>
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({focused, color, size}) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}></Tab.Screen>
        <Tab.Screen
            name="Detection"
            component={DetectionScreen}
            options={{
              tabBarIcon: ({focused, color, size}) => (
                <Image source={require('../assets/full_scan.png')} style={{width:85, height:85, marginBottom: 60, }}/>
              ),
            }}></Tab.Screen>
        <Tab.Screen
            name="UserInfo"
            component={UserInfoScreen}
            options={{
              tabBarIcon: ({focused, color, size}) => (
                <Ionicons name="person" color={color} size={size} />
              ),
            }}></Tab.Screen>
        </Tab.Navigator>
      )
}

const styles = StyleSheet.create({
    tabBarStyle: {
      height: 80,
      position: 'absolute',
      backgroundColor: "#FFF5EB",
    },
  });



export default TabNavigator

