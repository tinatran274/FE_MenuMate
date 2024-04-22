import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const GradientArea = ({ onPress, title, colors }) => {
    return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={onPress}
          style={styles.buttonContainer}
        >
            <LinearGradient 
              colors={colors}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradient}>
                <Ionicons style={{position: 'absolute', right: 0, borderRadius: 50, backgroundColor: "white",
                    shadowOffset: { width: 1, height: 2 }, bottom: 0,
                    shadowOpacity: 0.8, padding: 8,
                    shadowRadius: 4,
                    elevation: 5,}} 
                    name="caret-forward" size={36} color="#FF1E3F" />
                <View style={{ alignItems: "center", gap: 25, width: "40%",
                  display: "flex", flexDirection: "row"
                 }}>
                  <Image style={{ objectFit: "contain", height: 100}} source={require('../../../assets/deco1.png')} />
                  <Text style={styles.buttonText}>{title}</Text>
                </View>
            </LinearGradient>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 5,
    marginBottom: 20
  },
  gradient: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    height: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GradientArea;