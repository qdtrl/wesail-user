import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../services/firebase';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Image,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from '../../components';

import {home_video, logo} from '../../assets';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
    height: '75%',
    marginHorizontal: 20,
    marginVertical: 120,
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
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
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

interface RegisterProps {
  navigation: any;
}

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
      await createUserWithEmailAndPassword(auth, user.email, user.password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={StyleSheet.absoluteFill}>
      <Video
        source={home_video} // Le chemin de votre vidéo
        style={StyleSheet.absoluteFill} // Pour couvrir tout l'écran
        muted={true}
        repeat={true}
        resizeMode={'cover'} // Pour couvrir tout l'écran sans déformation
        rate={1.0}
        ignoreSilentSwitch={'obey'}
        opacity={0.2}
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
                  onChangeText={text =>
                    setUser({...user, confirmPassword: text})
                  }
                  placeholder="Confirmer le mot de passe"
                />
              </View>

              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <View style={styles.buttons}>
                  <Button
                    accessibilityLabel="Button pour s'inscrire"
                    color="#4777EE"
                    outlined={true}
                    backgroundColor="transparent"
                    width={250}
                    title="S'inscrire"
                    onPress={handleRegister}
                  />
                  <Text style={styles.ou}>ou</Text>
                  <Button
                    title="Se connecter"
                    width={250}
                    onPress={() => {
                      navigation.navigate('/login');
                    }}
                  />
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Register;
