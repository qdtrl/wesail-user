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
  disabled = false,
  backgroundColor,
}: any) => {
  let finalColor = color || '#EFEFEF';
  let finalBackgroundColor = backgroundColor || '#4777EE';
  if (disabled) {
    finalColor = 'gray';
    finalBackgroundColor = 'lightgray';
  }
  if (outlined) {
    finalColor = color || '#4777EE';
    finalBackgroundColor = 'transparent';
  }

  return (
    <TouchableOpacity
      disabled={disabled}
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
              backgroundColor: finalBackgroundColor,
              borderColor: finalBackgroundColor,
            }
      }>
      <Text
        style={
          outlined
            ? {
                ...styles.ButtonText,
                ...styles.ButtonTextOutlined,
                color: finalColor,
                width,
              }
            : {
                ...styles.ButtonText,
                color: finalColor,
                width,
              }
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
