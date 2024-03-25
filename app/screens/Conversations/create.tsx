import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { Avatar, Button, Input } from '../../components'
import { UserProps, ConversationProps } from '../../models'
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp
} from 'firebase/firestore'
import { db, storage } from '../../services/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import SearchUsers from '../../components/SearchUsers'
import { launchImageLibrary } from 'react-native-image-picker'
const CreateConversation = () => {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState({} as any)
  const [searchUser, setSearchUser] = useState('')
  const [searchAdmin, setSearchAdmin] = useState('')
  const [users, setUsers] = useState<string[]>([])
  const [admins, setAdmins] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<UserProps[]>([])
  const [iconUrl, setIconUrl] = useState('')

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
            setIcon(response.assets[0])
          }
        }
      }
    )
  }

  const handleSubmit = () => {
    setLoading(true)
    uploadIcon()
  }

  const uploadIcon = async () => {
    const storageRef = ref(storage, `conversations/icons/${name}`)
    const image = await fetch(icon.uri)
    const blob = await image.blob()
    const uploadTask = uploadBytesResumable(storageRef, blob)

    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        setLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setIconUrl(downloadURL)
          createConversation()
        })
      }
    )
  }

  const getUserData = async () => {
    const usersRef = collection(db, 'users')
    const usersSnapshot = await getDocs(usersRef)
    const usersList = usersSnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data()
        } as UserProps)
    )

    setUserData(usersList)
    setLoading(false)
  }

  const createConversation = async () => {}

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.scrollView}>
          <Input
            placeholder="Nom de la conversation"
            value={name}
            setValue={setName}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
            <Avatar
              icon={icon.uri}
              size={50}
              color="#4777EE"
              border="transparent"
            />
            <Text onPress={handleButtonPress}>Choisir une icone</Text>
          </View>

          <SearchUsers
            label="utilisateurs"
            data={userData}
            values={users}
            setValues={setUsers}
          />

          <SearchUsers
            label="admins"
            data={userData}
            values={admins}
            setValues={setAdmins}
          />

          <Button title="Créer" onPress={handleSubmit} width={150} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  }
})

export default CreateConversation
