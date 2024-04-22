import React, { useState, useEffect, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import { HomeScreen } from "./screens/HomeScreen/index";
import { LoginScreen } from "./screens/LoginScreen/index";
import { RegisterScreen } from "./screens/RegisterScreen/index";
import { GetUserDataScreen1 } from "./screens/GetUserDataScreen/screen1";
import { GetUserDataScreen2 } from "./screens/GetUserDataScreen/screen2";
import { GetUserDataScreen3 } from "./screens/GetUserDataScreen/screen3";
import { GetUserDataScreen4 } from "./screens/GetUserDataScreen/screen4";
import { RecommendMenuScreen } from "./screens/RecommendMenuScreen/index";
import { ControlCaloriesScreen } from "./screens/ControlCaloriesScreen/index";
import { ExerciseScreen } from "./screens/ExerciseScreen/index";
import { StatisticScreen } from "./screens/StatisticScreen/index";
import { IngredientScreen } from "./screens/IngredientScreen/index";
import { DishScreen } from "./screens/DishScreen/index";
import { DetailIngredientScreen } from "./screens/DetailIngredientScreen/index";
import { DetailDishScreen } from "./screens/DetailDishScreen/index";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigator from './navigators/tab_navigator';
import store from './redux/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="TabNavigator" screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="GetUserData1" component={GetUserDataScreen1} />
          <Stack.Screen name="GetUserData2" component={GetUserDataScreen2} />
          <Stack.Screen name="GetUserData3" component={GetUserDataScreen3} />
          <Stack.Screen name="GetUserData4" component={GetUserDataScreen4} />
          <Stack.Screen name="RecommendMenu" component={RecommendMenuScreen} />
          <Stack.Screen name="Exercise" component={ExerciseScreen} />
          <Stack.Screen name="ControlCalories" component={ControlCaloriesScreen} />
          <Stack.Screen name="Statistic" component={StatisticScreen} />
          <Stack.Screen name="Ingredient" component={IngredientScreen} />
          <Stack.Screen name="DetailIngredient" component={DetailIngredientScreen} />
          <Stack.Screen name="Dish" component={DishScreen} />
          <Stack.Screen name="DetailDish" component={DetailDishScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
  },
});
