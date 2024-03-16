import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const styles = StyleSheet.create({
  // ...
  ButtonContainer: {
    elevation: 8,
    backgroundColor: '#4777EE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#4777EE',
  },
  ButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  ButtonContainerOutlined: {
    backgroundColor: 'transparent',
  },
  ButtonTextOutlined: {
    color: '#4777EE',
  },
});

const Button = ({
  onPress,
  title,
  outlined,
  width,
  color,
  backgroundColor,
}: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={
      outlined
        ? {
            ...styles.ButtonContainer,
            ...styles.ButtonContainerOutlined,
            borderColor: color || '#4777EE',
          }
        : {
            ...styles.ButtonContainer,
            backgroundColor: backgroundColor || '#4777EE',
            borderColor: backgroundColor || '#4777EE',
          }
    }>
    <Text
      style={
        outlined
          ? {
              ...styles.ButtonText,
              ...styles.ButtonTextOutlined,
              color: color || '#4777EE',
              width,
            }
          : {...styles.ButtonText, width: width, color: color || '#EFEFEF'}
      }>
      {title}
    </Text>
  </TouchableOpacity>
);

export default Button;
