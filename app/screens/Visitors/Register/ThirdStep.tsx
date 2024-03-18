import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Text,
  Platform,
} from 'react-native';
import {Icon} from '../../../components';

const ThirdStep = ({user, setUser, error}: any) => {
  return (
    <KeyboardAvoidingView>
      <View style={styles.inputs}>
        <View>
          <Text style={styles.label}>Adresse email</Text>
          <View style={error.email ? styles.inputGroupRed : styles.inputGroup}>
            <Icon name="at" size={20} color="#4777EE" />
            <TextInput
              style={styles.input}
              onChangeText={text =>
                setUser({...user, email: text.toLocaleLowerCase()})
              }
              value={user.email}
              placeholder="Email"
              autoComplete={'email'}
              placeholderTextColor="#4777EE"
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Mot de passe</Text>
          <View
            style={error.password ? styles.inputGroupRed : styles.inputGroup}>
            <Icon name="lock" size={20} color="#4777EE" />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={user.password}
              onChangeText={text => setUser({...user, password: text})}
              placeholder="Mot de passe"
              autoComplete={Platform.OS === 'ios' ? 'new-password' : 'off'}
              placeholderTextColor="#4777EE"
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Confirmer le mot de passe</Text>
          <View
            style={error.password ? styles.inputGroupRed : styles.inputGroup}>
            <Icon name="lock" size={20} color="#4777EE" />

            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={user.confirmPassword}
              onChangeText={text => setUser({...user, confirmPassword: text})}
              placeholder="Confirmer le mot de passe"
              autoComplete={Platform.OS === 'ios' ? 'new-password' : 'off'}
              placeholderTextColor="#4777EE"
            />
          </View>
        </View>
      </View>

      <Text style={styles.errors}>{error.text}</Text>
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
    fontWeight: 'bold',
  },
  input: {
    color: '#4777EE',
    width: 250,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 15,
    borderLeftWidth: 1,
    borderColor: '#4777EE',
    width: 280,
  },
  inputGroupRed: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 15,
    borderLeftWidth: 1,
    borderColor: 'red',
    width: 280,
  },
  errors: {
    height: 20,
    color: 'red',
  },
});

export default ThirdStep;
