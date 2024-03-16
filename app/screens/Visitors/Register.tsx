import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../services/firebase';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Button} from '../../components';

interface RegisterProps {
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

const Register = ({navigation}: RegisterProps) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );
      Alert.alert('Registered');
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={200}>
        <TextInput
          style={styles.input}
          onChangeText={text => setUser({...user, email: text})}
          value={user.email}
          placeholder="Email"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={user.password}
          onChangeText={text => setUser({...user, password: text})}
          placeholder="Mot de passe"
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={user.confirmPassword}
          onChangeText={text => setUser({...user, confirmPassword: text})}
          placeholder="Confirmer le mot de passe"
        />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Button title="Inscription" onPress={handleRegister} />
            <Button
              title="Se connecter"
              onPress={() => {
                navigation.navigate('/login');
              }}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;
