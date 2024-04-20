import { View, Text, Alert, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../../services/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Asset, launchImageLibrary } from 'react-native-image-picker'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Button } from '../../components'

const NewImage = ({ navigation }: any) => {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<Asset>({ uri: '' , fileName: ''})

  const handleButtonPress = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: false },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage)
        } else {
          if (response.assets) {
            setImage(response.assets[0])
          }
        }
      }
    )
  }

  const uploadImage = async () => {
    if (!image.uri) {
      Alert.alert('Veuillez sélectionner une image')
      return
    }
    const userId = auth.currentUser?.uid

    if (!userId) {
      Alert.alert('Utilisateur non connecté')
      return
    }

    const storageRef = ref(storage, `users/images/${userId}/${image.fileName}`)
    const userRef = doc(db, 'users', userId)
    const img = await fetch(image.uri)
    const blob = await img.blob()
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
          updateDoc(userRef, {
            images: arrayUnion(downloadURL)
          })
          setLoading(false)
          setImage({ uri: '' })
          navigation.navigate('/profile-router')
        })
      }
    )
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        padding: 10
      }}>
      <Image source={{ uri: image.uri }} style={styles.image} />
      <Text onPress={handleButtonPress}>Ajouter une image</Text>
      <View style={{ width: '100%', alignItems: 'flex-end', marginTop: 40 }}>
        {loading ? (
          <Text>{Math.round(progress)}%</Text>
        ) : (
          <Button
            disabled={image.uri ? false : true}
            title="Poster l'image"
            onPress={uploadImage}
            color="#EFEFEF"
            width={200}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    backgroundColor: 'lightgray'
  }
})

export default NewImage
