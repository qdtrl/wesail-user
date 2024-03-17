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
} from 'react-native';
import React, {useState} from 'react';
import {auth} from '../../services/firebase';
import {sendPasswordResetEmail} from 'firebase/auth';
import {Input, Button} from '../../components';
import Video from 'react-native-video';
import {home_video, logo} from '../../assets';

interface LoginProps {
  navigation: any;
}

const ForgotPassword = ({navigation}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Email envoyé');
    } catch (error) {
      Alert.alert('Erreur', (error as Error).message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <Video
        source={home_video} // Le chemin de votre vidéo
        style={styles.video}
        muted={true}
        repeat={true}
        resizeMode={'cover'} // Pour couvrir tout l'écran sans déformation
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
                <Input placeholder="Email" value={email} setValue={setEmail} />
              </View>

              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <View style={styles.buttons}>
                  <Button
                    accessibilityLabel="Button pour réinitialiser le mot de passe"
                    title="Réinitialiser le mot de passe"
                    width={250}
                    onPress={handleResetPassword}
                  />

                  <Text style={styles.ou}>ou</Text>

                  <Button
                    accessibilityLabel="Button pour revenir à la page de connexion"
                    color="#4777EE"
                    outlined={true}
                    backgroundColor="transparent"
                    width={250}
                    title="Se connecter"
                    onPress={() => {
                      navigation.navigate('/login');
                    }}
                  />

                  <Text
                    style={styles.link}
                    onPress={() => {
                      navigation.navigate('/register');
                    }}>
                    Pas de compte ? S'inscrire
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

export default ForgotPassword;
