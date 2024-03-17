import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  Text,
  Switch,
} from 'react-native';
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from '../../../components';

const SecondStep = ({avatar, setAvatar, user, setUser}: any) => {
  console.log(avatar);

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
  return (
    <KeyboardAvoidingView>
      <View style={styles.inputs}>
        <View style={styles.center}>
          <Avatar icon={avatar.uri} size={100} color="#4777EE" />
          <Button
            title="Ajouter une photo"
            onPress={handleButtonPress}
            color="#4777EE"
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
          <Text style={{width: '75%'}}>
            J'ai lu et j'accepte les conditions générales d'utilisation et la
            politique de confidentialité
          </Text>
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
    gap: 60,
  },
  label: {
    color: '#4777EE',
    fontSize: 16,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 45,
    width: 276,
    padding: 10,
    borderLeftWidth: 1,
    // borderRadius: 10,
    borderColor: '#4777EE',
    color: '#4777EE',
  },
});

export default SecondStep;
