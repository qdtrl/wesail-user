import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
const style = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,
    borderWidth: 0.8,
    borderRadius: 8,
  },
});

interface InputProps {
  placeholder: string;
  value: string;
  setValue: (text: string) => void;
  secureTextEntry?: boolean;
}

const Input = ({
  placeholder,
  value,
  setValue,
  secureTextEntry = false,
}: InputProps) => {
  return (
    <TextInput
      style={style.input}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
    />
  );
};

export default Input;
