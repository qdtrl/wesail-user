import {View, Text, TextInput, StyleSheet, Image, Button} from 'react-native';
import React from 'react';
import {Icon} from '../../../components';
import {launchImageLibrary} from 'react-native-image-picker';

const FirstStep = ({boat, setBoat, image, setImage}: any) => {
  const handleButtonPress = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: false}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets) {
          setImage(response.assets[0]);
        }
      }
    });
  };

  return (
    <View style={styles.inputs}>
      <View>
        <Image source={{uri: image?.uri}} style={styles.image} />
        <Button
          title="Ajouter une image pour votre bateau"
          onPress={handleButtonPress}
          color="#4777EE"
        />
      </View>
      <View>
        <Text style={styles.label}>Nom *</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            value={boat.name}
            onChangeText={text => setBoat({...boat, name: text})}
            placeholder="La Mouette"
            autoCapitalize="words"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>
      <View>
        <Text style={styles.label}>Numéro *</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            value={boat.number}
            onChangeText={text => setBoat({...boat, number: text})}
            placeholder="1234"
            autoCapitalize="words"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>
      <View>
        <Text style={styles.label}>Type *</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            value={boat.boat_type}
            onChangeText={text => setBoat({...boat, boat_type: text})}
            placeholder="Classique"
            autoCapitalize="words"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  label: {
    color: '#4777EE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 15,
    borderLeftWidth: 1,
    borderColor: '#4777EE',
    width: '100%',
  },
  input: {
    color: '#4777EE',
    width: 250,
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'lightgray',
  },
});

export default FirstStep;
