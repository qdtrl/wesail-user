import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../../services/firebase'
import { UserProps, BoatProps } from '../../models'
import { Avatar, Button, Icon } from '../../components'

const Profile = ({ navigation, route }: any) => {
  const [user, setUser] = useState<UserProps>()
  const [userBoats, setUserBoats] = useState<BoatProps[]>([])
  const [index, setIndex] = useState(0)

  const getUser = async (id: string) => {
    const userRef = doc(db, 'users', id)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      setUser({
        id: userSnap.id,
        ...userSnap.data()
      } as UserProps)
    }
  }

  const getUserBoats = async (id: string) => {
    const boatsRef = collection(db, 'boats')
    const q = query(boatsRef, where('crew', 'array-contains', id))
    const querySnapshot = await getDocs(q)
    const boats = querySnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data()
        } as BoatProps)
    )
    setUserBoats(boats)
    console.log(boats)
  }

  useEffect(() => {
    if (route.params?.user) {
      getUser(route.params.user)
      getUserBoats(route.params.user)
    } else {
      if (auth.currentUser) {
        getUser(auth.currentUser.uid)
        getUserBoats(auth.currentUser.uid)
      }
    }
  }, [route.params?.user])

  const showTabs = () => {
    switch (index) {
      case 0:
        return <Text>Calendar</Text>
      case 1:
        return (
          <View
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10
            }}>
            {user?.images?.map((img, i) => (
              <Image
                key={i}
                source={{ uri: img }}
                style={{ width: '32.2%', aspectRatio: 1, margin: 2 }}
              />
            ))}
          </View>
        )
      case 2:
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              margin: 10,
              gap: 4
            }}>
            {userBoats.map((boat, i) => (
              <View key={i} style={{ flex: 1 / 2, aspectRatio: 1 }}>
                <Image
                  source={{ uri: boat.image_url }}
                  style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
                />
                <Text>{boat.name}</Text>
              </View>
            ))}
          </View>
        )
    }
  }

  const handleCreateConversation = () => {
    addDoc(collection(db, 'conversations'), {
      name: user?.name,
      icon_url: user?.icon_url,
      users: [auth.currentUser?.uid, user?.id],
      admins: [auth.currentUser?.uid, user?.id],
      created_at: serverTimestamp()
    }).then(res => {
      navigation.navigate('/conversations/show', {
        conversation: {
          id: res.id,
          name: user?.name,
          icon_url: user?.icon_url,
          users: [auth.currentUser?.uid, user?.id],
          admins: [auth.currentUser?.uid, user?.id],
          created_at: serverTimestamp()
        }
      })
    })
  }

  const handleCreateFollow = () => {
    if (!user) return
    const id_user = auth.currentUser?.uid
    if (id_user === undefined) return

    const userRef = doc(db, 'users', user.id)
    updateDoc(userRef, {
      followers: arrayUnion(auth.currentUser?.uid)
    }).then(() => {
      setUser({
        ...user,
        followers: [...user.followers, id_user]
      })
    })

    const currentUserRef = doc(db, 'users', id_user)
    updateDoc(currentUserRef, {
      followings: arrayUnion(user?.id)
    })
  }

  const handleUnfollow = () => {
    if (!user) return
    const userRef = doc(db, 'users', user.id)
    updateDoc(userRef, {
      followers: arrayRemove(auth.currentUser?.uid)
    }).then(() => {
      setUser({
        ...user,
        followers: user.followers.filter(id => id !== auth.currentUser?.uid)
      })
    })

    if (!auth.currentUser) return
    const currentUserRef = doc(db, 'users', auth.currentUser.uid)
    updateDoc(currentUserRef, {
      followings: arrayRemove(user?.id)
    })
  }

  return (
    <SafeAreaView>
      {user && (
        <ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              {user.id !== auth.currentUser?.uid ? (
                <View
                  style={{ height: 50, width: 50 }}
                  onTouchEnd={() => navigation.goBack()}>
                  <Icon name="chevron-left" size={50} color="black" />
                </View>
              ) : (
                <View style={{ height: 50, width: 50 }} />
              )}
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {user?.name}
              </Text>
            </View>
            {user.id === auth.currentUser?.uid ? (
              <View
                onTouchEnd={() =>
                  navigation.navigate('/profile/settings', { user })
                }>
                <Icon name="cog" size={30} color="black" />
              </View>
            ) : (
              <View>
                <Icon name="dots-vertical" size={30} color="black" />
              </View>
            )}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
              alignItems: 'center'
            }}>
            <Avatar
              icon={user.icon_url}
              size={80}
              color="black"
              border="transparent"
            />
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{userBoats.length}</Text>
              <Text>équipages</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{user.followers.length}</Text>
              <Text>followers</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{user.followings.length}</Text>
              <Text>suivi(e)s</Text>
            </View>
          </View>
          <Text style={{ marginHorizontal: 10 }}>
            {user.first_name + ' ' + user.last_name}
          </Text>

          <Text style={{ marginHorizontal: 10 }}>{user.description}</Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 20
            }}>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Icon name="resistor" size={30} color="black" />
              <Text>Mon dernier résultat</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Icon name="trophy-award" size={30} color="black" />
              <Text>Mon meilleur résultat</Text>
            </View>
          </View>

          {user.id !== auth.currentUser?.uid && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 20
              }}>
              <Button
                title="Message"
                color="black"
                outlined
                width={120}
                backgroundColor="transparent"
                onPress={() => handleCreateConversation()}
              />
              {auth.currentUser &&
              user.followers.includes(auth.currentUser?.uid) ? (
                <Button
                  title="Ne plus suivre"
                  color="black"
                  outlined
                  width={120}
                  backgroundColor="transparent"
                  onPress={() => handleUnfollow()}
                />
              ) : (
                <Button
                  title="Suivre"
                  color="black"
                  outlined
                  width={120}
                  backgroundColor="transparent"
                  onPress={() => handleCreateFollow()}
                />
              )}
            </View>
          )}
          <View style={styles.iconsBar}>
            <View
              onTouchEnd={() => setIndex(0)}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.iconBar,
                borderColor: index === 0 ? 'red' : 'black'
              }}>
              <Icon
                name="calendar-blank-outline"
                size={24}
                color={index === 0 ? 'red' : 'black'}
              />
            </View>
            <View
              onTouchEnd={() => setIndex(1)}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.iconBar,
                borderColor: index === 1 ? 'red' : 'black'
              }}>
              <Icon
                name="camera-outline"
                size={24}
                color={index === 1 ? 'red' : 'black'}
              />
            </View>
            <View
              onTouchEnd={() => setIndex(2)}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.iconBar,
                borderColor: index === 2 ? 'red' : 'black'
              }}>
              <Icon
                name="sail-boat"
                size={24}
                color={index === 2 ? 'red' : 'black'}
              />
            </View>
          </View>
          {showTabs()}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconsBar: { flexDirection: 'row', gap: 10 },
  iconBar: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 2
  },
  cardUser: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 2,
    gap: 2
  },
  name: { fontWeight: 'bold' }
})

export default Profile
