import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  Platform,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components'
import FirstStep from './Create/FirstStep'
import SecondStep from './Create/SecondStep'
import ThirdStep from './Create/ThirdStep'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { auth, db, storage } from '../../services/firebase'

const CreateBoat = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(1)
  const [image, setImage] = useState({ uri: '' })
  const [boat, setBoat] = useState({
    image_url: '',
    name: '',
    number: '',
    boat_type: '',
    owners: [],
    crew: [],
    club: '',
    sponsors: [],
    length: 0,
    width: 0,
    draft: 0,
    weight: 0,
    sail_area: 0,
    engine: '',
    fuel: '',
    water: 0,
    year: 0
  })

  const handleStep = () => {
    switch (step) {
      case 1:
        return (
          <FirstStep
            image={image}
            setImage={setImage}
            boat={boat}
            setBoat={setBoat}
          />
        )
      case 2:
        return <SecondStep boat={boat} setBoat={setBoat} />
      case 3:
        return <ThirdStep boat={boat} setBoat={setBoat} />
      default:
        return null
    }
  }

  const handleNextDisabled = () => {
    if (step === 1) {
      return (
        !(boat.name.length >= 3) ||
        !(boat.boat_type.length >= 3) ||
        !(boat.number.length >= 3) ||
        !image
      )
    } else if (step === 2) {
      return !(boat.crew.length > 0) || !(boat.owners.length > 0)
    } else {
      return !boat.club || !boat.length || !boat.year || !boat.draft
    }
  }

  useEffect(() => {
    const crew = [...boat.crew, auth?.currentUser?.uid]
    const owners = [...boat.owners, auth?.currentUser?.uid]

    addDoc(collection(db, 'boats'), {
      ...boat,
      owners: crew,
      crew: owners,
      created_at: serverTimestamp()
    })
      .then(res => {
        addDoc(collection(db, 'conversations'), {
          name: boat.name,
          boat_id: res.id,
          icon_url: boat.image_url,
          users: crew,
          admins: owners,
          created_at: serverTimestamp()
        })
      })
      .finally(() => {
        setLoading(false)
        navigation.navigate('/boats')
      })
  }, [boat, navigation])

  const handleCreate = async () => {
    setLoading(true)
    const storageRef = ref(storage, `boats/image/${boat.name}`)
    const load = await fetch(image.uri)
    const blob = await load.blob()
    const uploadTask = uploadBytesResumable(storageRef, blob)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const ratio = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(ratio)
      },
      error => {
        Alert.alert(
          error.code,
          "Une erreur est survenue lors de l'envoi de votre image de profil"
        )
        setLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setBoat({ ...boat, image_url: downloadURL })
        })
      }
    )
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleStep}>
              {step === 1
                ? 'Informations Générales'
                : step === 2
                ? 'Administrateurs & Équipage'
                : 'Détails'}
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
          <KeyboardAvoidingView
            style={styles.stepsContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={150}>
            <ScrollView style={styles.form}>
              {handleStep()}

              <View style={styles.buttonsContainer}>
                {loading ? (
                  <View>
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
                        title="Créer"
                        width={100}
                        disabled={handleNextDisabled()}
                        accessibilityLabel="Button pour créer le bateau"
                        onPress={handleCreate}
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
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  stepsContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginVertical: 20,
    paddingHorizontal: 20
  },
  form: {
    minHeight: '100%'
  },
  headerContainer: {
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20
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
    marginTop: 20,
    fontWeight: 'bold',
    color: '#4777EE'
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: 5
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default CreateBoat
