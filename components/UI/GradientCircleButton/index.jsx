import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const GradientCircleButton = ({ onPress, colors }) => {
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
                <Ionicons style={{position: 'absolute', borderRadius: 50,
                    shadowOffset: { width: 1, height: 2 },
                    shadowOpacity: 0.8, padding: 8,
                    shadowRadius: 4,
                    elevation: 5,}} 
                    name="add" size={40} color="white" />
            </LinearGradient>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 3
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 22,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
});

export default GradientCircleButton;