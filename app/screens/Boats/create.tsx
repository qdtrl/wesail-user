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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from '../../components';
import FirstStep from './Create/FirstStep';
import SecondStep from './Create/SecondStep';
import ThirdStep from './Create/ThirdStep';

const CreateBoat = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
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
    year: 0,
  });

  useEffect(() => {
    console.log(boat);
  }, [boat]);

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
        );
      case 2:
        return <SecondStep boat={boat} setBoat={setBoat} />;
      case 3:
        return <ThirdStep boat={boat} setBoat={setBoat} />;
      default:
        return null;
    }
  };

  const handleNextDisabled = () => {
    if (step === 1) {
      return (
        !(boat.name.length >= 3) ||
        !(boat.boat_type.length >= 3) ||
        !(boat.number.length >= 3) ||
        !image
      );
    } else if (step === 2) {
      return !(boat.crew.length > 0) || !(boat.owners.length > 0);
    } else {
      return !boat.club || !boat.length || !boat.year;
    }
  };

  const handleCreate = async () => {};

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
          <KeyboardAvoidingView
            style={styles.stepsContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={150}>
            <View style={styles.form}>{handleStep()}</View>

            <View style={styles.buttonsContainer}>
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
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '80%',
    gap: 20,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
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
    marginTop: 20,
    fontWeight: 'bold',
    color: '#4777EE',
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: 5,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
});

export default CreateBoat;
