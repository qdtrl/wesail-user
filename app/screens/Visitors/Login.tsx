import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {auth} from '../../services/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';

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

interface LoginProps {
  navigation: any;
}

const Login = ({navigation}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Logged in');
      console.log(res);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
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
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Button title="Connexion" onPress={handleLogin} />
            <Button
              title="S'inscrire"
              onPress={() => {
                navigation.navigate('/register');
              }}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
