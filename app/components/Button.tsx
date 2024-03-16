import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const styles = StyleSheet.create({
  // ...
  ButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#4777EE',
  },
  ButtonText: {
    fontSize: 18,
    color: '#fff',
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

const Button = ({onPress, title, outlined, width}: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={
      outlined
        ? {
            ...styles.ButtonContainer,
            ...styles.ButtonContainerOutlined,
          }
        : styles.ButtonContainer
    }>
    <Text
      style={
        outlined
          ? {
              ...styles.ButtonText,
              ...styles.ButtonTextOutlined,
              width,
            }
          : {...styles.ButtonText, width: width}
      }>
      {title}
    </Text>
  </TouchableOpacity>
);

export default Button;
