import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Text,
  Platform
} from 'react-native'
import { Icon } from '../../../components'

const ThirdStep = ({ user, setUser, error }: any) => {
  return (
    <>
      <View style={styles.inputs}>
        <View>
          <Text style={styles.label}>Adresse email *</Text>
          <View style={error.email ? styles.inputGroupRed : styles.inputGroup}>
            <Icon name="at" size={20} color="#4777EE" />
            <TextInput
              style={styles.input}
              onChangeText={text =>
                setUser({ ...user, email: text.toLocaleLowerCase() })
              }
              value={user.email}
              placeholder="Email"
              autoComplete={'email'}
              placeholderTextColor="#4777EE"
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Mot de passe *</Text>
          <View
            style={error.password ? styles.inputGroupRed : styles.inputGroup}>
            <Icon name="lock" size={20} color="#4777EE" />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={user.password}
              onChangeText={text => setUser({ ...user, password: text })}
              placeholder="Mot de passe"
              autoComplete={Platform.OS === 'ios' ? 'new-password' : 'off'}
              placeholderTextColor="#4777EE"
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Confirmer le mot de passe *</Text>
          <View
            style={error.password ? styles.inputGroupRed : styles.inputGroup}>
            <Icon name="lock" size={20} color="#4777EE" />

            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={user.confirmPassword}
              onChangeText={text => setUser({ ...user, confirmPassword: text })}
              placeholder="Confirmer le mot de passe"
              autoComplete={Platform.OS === 'ios' ? 'new-password' : 'off'}
              placeholderTextColor="#4777EE"
            />
          </View>
        </View>
      </View>

      <Text style={styles.errors}>{error.text}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 30
  },
  label: {
    color: '#4777EE',
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    color: '#EFEFEF',
    width: 250
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    borderLeftWidth: 1,
    borderColor: '#4777EE',
    width: 280,
    height: 50
  },
  inputGroupRed: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    borderLeftWidth: 1,
    borderColor: 'red',
    width: 280,
    height: 50
  },
  errors: {
    height: 20,
    color: 'red'
  }
})

export default ThirdStep
