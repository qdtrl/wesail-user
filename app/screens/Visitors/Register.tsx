import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

import { auth, db } from '../../services/firebase'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native'
import { Button, Icon } from '../../components'

import { cover_video, home_video, logo } from '../../assets'
import Video from 'react-native-video'
import FirstStep from './Register/FirstStep'
import SecondStep from './Register/SecondStep'
import ThirdStep from './Register/ThirdStep'

const Register = ({ navigation }: any) => {
  const [step, setStep] = useState(1)
  const [user, setUser] = useState({
    name: '',
    first_name: '',
    last_name: '',
    birth_date: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
    terms_accepted: false,
    icon_url: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [avatar, setAvatar] = useState('')
  const [error, setError] = useState({
    email: false,
    password: false,
    text: ''
  })

  const handleStep = () => {
    switch (step) {
      case 1:
        return <FirstStep user={user} setUser={setUser} />
      case 2:
        return (
          <SecondStep
            avatar={avatar}
            setAvatar={setAvatar}
            user={user}
            setUser={setUser}
          />
        )
      case 3:
        return <ThirdStep user={user} setUser={setUser} error={error} />
      default:
        return null
    }
  }

  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)

    if (!handleSubmitDisabled()) {
      setLoading(false)
      return
    }

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async userCredential => {
        const usersRef = doc(db, 'users', userCredential.user.uid)

        await setDoc(usersRef, {
          name: user.name,
          icon_url: user.icon_url,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          birth_date: user.birth_date,
          terms_accepted: user.terms_accepted,
          followers: [],
          following: [],
          friends: [],
          blocked: [],
          created_at: serverTimestamp()
        })

        await updateProfile(userCredential.user, {
          displayName: user.name,
          photoURL: user.icon_url
        })
      })
      .catch(catchError => {
        if (catchError.code === 'auth/email-already-in-use') {
          setError({
            email: true,
            password: false,
            text: '* Cet email est déjà utilisé'
          })
        } else {
          setError({ email: true, password: false, text: catchError.message })
        }

        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleNextDisabled = () => {
    if (step === 1) {
      return (
        !(user.name.length >= 3) ||
        !(user.first_name.length >= 3) ||
        !(user.last_name.length >= 3) ||
        !user.birth_date
      )
    } else if (step === 2) {
      return !user.terms_accepted || (avatar && !user.icon_url)
    } else {
      return !user.email || !user.password || !user.confirmPassword
    }
  }

  const handleSubmitDisabled = () => {
    if (user.password !== user.confirmPassword) {
      setError({
        email: false,
        password: true,
        text: '* Les mots de passe ne correspondent pas'
      })
      return false
    }
    if (user.password.length < 6) {
      setError({
        email: false,
        password: true,
        text: '* Le mot de passe doit contenir au moins 6 caractères'
      })
      return false
    }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(user.email)) {
      setError({
        email: true,
        password: false,
        text: "* L'email n'est pas valide"
      })
      return false
    }
    setError({ email: false, password: false, text: '' })
    return true
  }

  return (
    <SafeAreaView
      style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black' }}>
      <ImageBackground
        source={cover_video}
        style={{ opacity: 0.2, backgroundColor: '#4778EE' }}>
        <Video
          source={home_video}
          style={styles.video}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
      </ImageBackground>
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
                  backgroundColor: step >= 1 ? '#4777EE' : '#EFEFEF'
                }}
              />
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.step,
                  backgroundColor: step >= 2 ? '#4777EE' : '#EFEFEF'
                }}
              />
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.step,
                  backgroundColor: step >= 3 ? '#4777EE' : '#EFEFEF'
                }}
              />
            </View>
          </View>
          <KeyboardAvoidingView style={styles.form}>
            {handleStep()}
            <View style={styles.inputs}>
              {loading ? (
                <View style={{ ...styles.buttons, justifyContent: 'flex-end' }}>
                  <ActivityIndicator size="large" />
                </View>
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
                      disabled={Boolean(handleNextDisabled())}
                      accessibilityLabel="Button pour s'inscrire"
                      onPress={handleRegister}
                    />
                  ) : (
                    <Button
                      title="Suivant"
                      width={100}
                      disabled={Boolean(handleNextDisabled())}
                      accessibilityLabel="Button pour passer à l'étape suivante"
                      onPress={() => setStep(step + 1)}
                    />
                  )}
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  flex1: {
    flex: 1
  },
  video: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    gap: 20
  },
  headerContainer: {
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  brand: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0
  },
  title: {
    fontSize: 30,
    color: '#4777EE',
    fontWeight: 'bold'
  },
  stepper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20
  },
  titleStep: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4777EE'
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: 5
  },
  logo: { width: 70, height: 70 },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 47
  }
})

export default Register
