import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  Switch,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from '../../../components';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from '../../../services/firebase';
import {Alert} from 'react-native';

const SecondStep = ({avatar, setAvatar, user, setUser}: any) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleButtonPress = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: false}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets) {
          setAvatar(response.assets[0]);
        }
      }
    });
  };

  const uploadAvatar = async () => {
    const storageRef = ref(storage, `users/avatars/${user.name}`);
    const image = await fetch(avatar.uri);
    const blob = await image.blob();
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const ratio = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(ratio);
      },
      error => {
        Alert.alert(
          error.code,
          "Une erreur est survenue lors de l'envoi de votre image de profil",
        );
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setUser({...user, icon_url: downloadURL});
          setLoading(false);
        });
      },
    );
  };

  useEffect(() => {
    if (avatar) {
      setLoading(true);
      uploadAvatar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  return (
    <KeyboardAvoidingView>
      <View style={styles.inputs}>
        <View style={styles.center}>
          <Avatar
            icon={avatar.uri}
            size={100}
            color="#4777EE"
            border="transparent"
          />
          <View style={styles.fixedHeight}>
            {loading ? (
              <Text style={styles.processing}>{Math.round(progress)}%</Text>
            ) : (
              !avatar && (
                <Button
                  title="Ajouter une image de profil"
                  onPress={handleButtonPress}
                  color="#4777EE"
                />
              )
            )}
          </View>
        </View>
        <View style={styles.termsContainer}>
          <View style={styles.terms}>
            <Text>
              J'ai lu et j'accepte les
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                }>
                {' '}
                conditions générales d'utilisation{' '}
              </Text>
              et la{' '}
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                }>
                politique de confidentialité
              </Text>
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={user.terms_accepted ? '#4777EE' : '#EFEFEF'}
            ios_backgroundColor="#767577"
            onValueChange={value => setUser({...user, terms_accepted: value})}
            value={user.terms_accepted}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 80,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedHeight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 100,
  },
  processing: {
    color: '#4777EE',
    fontSize: 20,
  },
  link: {color: '#4777EE', textDecorationLine: 'underline'},
  terms: {width: '75%'},
  termsContainer: {flexDirection: 'row', alignItems: 'center', gap: 20},
});

export default SecondStep;
