import React, {useEffect, useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../services/firebase';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  SafeAreaView,
} from 'react-native';
import {Button, Icon} from '../../components';

import {home_video, logo} from '../../assets';
import Video from 'react-native-video';
import FirstStep from './Register/FirstStep';
import SecondStep from './Register/SecondStep';
import ThirdStep from './Register/ThirdStep';

interface RegisterProps {
  navigation: any;
}

const Register = ({navigation}: RegisterProps) => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    birth_date: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
    terms_accepted: false,
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleStep = () => {
    switch (step) {
      case 1:
        return <FirstStep user={user} setUser={setUser} />;
      case 2:
        return (
          <SecondStep
            avatar={avatar}
            setAvatar={setAvatar}
            user={user}
            setUser={setUser}
          />
        );
      case 3:
        return <ThirdStep user={user} setUser={setUser} />;
      default:
        return null;
    }
  };

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, user.email, user.password);
    } catch (error) {
      Alert.alert('Erreur', (error as Error).message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextDisabled = () => {
    if (step === 1) {
      return (
        !(user.first_name.length >= 3) ||
        !(user.last_name.length >= 3) ||
        !user.birth_date
      );
    } else if (step === 2) {
      return !user.terms_accepted;
    } else {
      return (
        !user.email ||
        !user.password ||
        !user.confirmPassword ||
        user.password !== user.confirmPassword
      );
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View onTouchEnd={() => navigation.goBack()} style={styles.flex1}>
                <Icon name="chevron-left" size={40} color="#4777EE" />
              </View>
              <View style={styles.brand}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>WeSail</Text>
              </View>
              <View style={styles.flex1} />
            </View>
            <Text style={styles.titleStep}>
              {step === 1
                ? 'Informations personnelles'
                : step === 2
                ? 'Avatar'
                : 'Informations de connexion'}
            </Text>
            <View style={styles.stepper}>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.step,
                  backgroundColor: step >= 1 ? '#4777EE' : '#EFEFEF',
                }}
              />
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.step,
                  backgroundColor: step >= 2 ? '#4777EE' : '#EFEFEF',
                }}
              />
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.step,
                  backgroundColor: step >= 3 ? '#4777EE' : '#EFEFEF',
                }}
              />
            </View>
          </View>
          <View style={styles.form}>{handleStep()}</View>
          <View style={styles.inputs}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <View style={styles.buttons}>
                {step !== 1 ? (
                  <Button
                    title="Retour"
                    accessibilityLabel="Button pour revenir à la page précédente"
                    color="#4777EE"
                    outlined={true}
                    width={100}
                    backgroundColor="transparent"
                    onPress={() => setStep(step - 1)}
                  />
                ) : (
                  <View />
                )}
                {step === 3 ? (
                  <Button
                    title="S'inscrire"
                    width={100}
                    disabled={handleNextDisabled()}
                    accessibilityLabel="Button pour s'inscrire"
                    onPress={handleRegister}
                  />
                ) : (
                  <Button
                    title="Suivant"
                    width={100}
                    disabled={handleNextDisabled()}
                    accessibilityLabel="Button pour passer à l'étape suivante"
                    onPress={() => setStep(step + 1)}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  video: {...StyleSheet.absoluteFillObject, opacity: 0.1},
  form: {
    flex: 2,
  },
  headerContainer: {
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
  },
  title: {
    fontSize: 30,
    color: '#4777EE',
    fontWeight: 'bold',
  },
  stepper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  titleStep: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4777EE',
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: 5,
  },
  logo: {width: 70, height: 70},
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  inputs: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
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
});

export default Register;
