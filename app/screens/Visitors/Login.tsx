import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {auth} from '../../services/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Input, Button} from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  primary: {
    backgroundColor: '#f0f0f0',
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
        <Input placeholder="Email" value={email} setValue={setEmail} />

        <Input
          placeholder="Mot de passe"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Button
              accessibilityLabel="Button pour se connecter"
              color="#f194ff"
              title="Se connecter"
              onPress={handleLogin}
            />
            <Button
              title="Créer un compte"
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
