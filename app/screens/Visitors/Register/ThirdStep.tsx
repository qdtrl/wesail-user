import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Text,
} from 'react-native';

const ThirdStep = ({user, setUser}: any) => {
  return (
    <KeyboardAvoidingView>
      <View style={styles.inputs}>
        <View>
          <Text style={styles.label}>Adresse email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text =>
              setUser({...user, email: text.toLocaleLowerCase()})
            }
            value={user.email}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="#4777EE"
          />
        </View>

        <View>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={user.password}
            onChangeText={text => setUser({...user, password: text})}
            placeholder="Mot de passe"
            placeholderTextColor="#4777EE"
          />
        </View>

        <View>
          <Text style={styles.label}>Confirmer le mot de passe</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={user.confirmPassword}
            onChangeText={text => setUser({...user, confirmPassword: text})}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    gap: 40,
  },
  label: {
    color: '#4777EE',
    fontSize: 16,
  },
  input: {
    height: 45,
    width: 276,
    padding: 10,
    borderLeftWidth: 1,
    // borderRadius: 10,
    borderColor: '#4777EE',
    color: '#4777EE',
  },
});

export default ThirdStep;
