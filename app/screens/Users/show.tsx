import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../../services/firebase'
import { UserProps } from '../../models'
import { Avatar, Icon } from '../../components'

const Profile = ({ navigation, route }: any) => {
  const [user, setUser] = useState<UserProps>()

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
  useEffect(() => {
    if (route.params?.user) {
      getUser(route.params.user)
    } else {
      if (auth.currentUser) {
        getUser(auth.currentUser.uid)
      }
    }
  }, [route.params?.user])

  return (
    <SafeAreaView>
      {user && (
        <ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center'
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
                <Icon name="cog" size={40} color="black" />
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
              margin: 20,
              alignItems: 'center'
            }}>
            <View>
              <Avatar
                icon={user.icon_url}
                size={80}
                color="black"
                border="transparent"
              />
              <Text>{user.first_name + ' ' + user.last_name}</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{user.following.length}</Text>
              <Text>équipages</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{user.followers.length}</Text>
              <Text>followers</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{user.following.length}</Text>
              <Text>suivi(e)s</Text>
            </View>
          </View>
          <Text>{user.description}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default Profile
