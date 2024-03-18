import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {auth} from '../../services/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Button, Icon} from '../../components';
import Video from 'react-native-video';
import {home_video, logo} from '../../assets';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <Video
        source={home_video}
        style={styles.video}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.form}>
              <View style={styles.brand}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>WeSail</Text>
              </View>
              <View style={styles.inputs}>
                <View style={styles.inputGroup}>
                  <Icon name="at" size={20} color="#4777EE" />
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text.toLocaleLowerCase())}
                    value={email}
                    placeholder="Email"
                    autoComplete={'email'}
                    placeholderTextColor="#4777EE"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Icon name="lock" size={20} color="#4777EE" />
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Mot de passe"
                    autoComplete="current-password"
                    placeholderTextColor="#4777EE"
                  />
                </View>
              </View>

              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <View style={styles.buttons}>
                  <Button
                    title="Se connecter"
                    accessibilityLabel="Button pour se connecter"
                    width={250}
                    onPress={handleLogin}
                  />
                  <Text style={styles.ou}>ou</Text>
                  <Button
                    title="Créer un compte"
                    accessibilityLabel="Button pour aller à la page d'inscription"
                    color="#4777EE"
                    outlined={true}
                    backgroundColor="transparent"
                    width={250}
                    onPress={() => {
                      navigation.navigate('/register');
                    }}
                  />

                  <Text
                    style={styles.link}
                    onPress={() => {
                      navigation.navigate('/forgot-password');
                    }}>
                    Mot de passe oublié ?
                  </Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {...StyleSheet.absoluteFillObject, opacity: 0.2},
  form: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
    height: '90%',
    margin: 30,
  },
  brand: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
  },
  title: {
    fontSize: 40,
    color: '#4777EE',
    fontWeight: 'bold',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 276,
    gap: 20,
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
  ou: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4777EE',
  },
  link: {
    marginTop: 10,
    fontSize: 16,
  },
  logo: {width: 100, height: 100},
});

export default Login;
