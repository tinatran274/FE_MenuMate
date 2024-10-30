import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const GradientNomalButton = ({ onPress, title, colors }) => {
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
                <Text style={styles.buttonText}>{title}</Text>
  
            </LinearGradient>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 5,
    width: "49%",
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GradientNomalButton;