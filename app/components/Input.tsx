import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
const style = StyleSheet.create({
  input: {
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});

interface InputProps {
  placeholder: string;
  value: string;
  setValue: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const Input = ({
  placeholder,
  value,
  setValue,
  secureTextEntry = false,
  autoCapitalize = 'sentences',
}: InputProps) => {
  return (
    <TextInput
      style={style.input}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
    />
  );
};

export default Input;
