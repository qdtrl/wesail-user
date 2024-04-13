import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserProps } from '../../models'
import { Avatar, Button, Icon } from '../../components'
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebase'

const Boat = ({ navigation, route }: any) => {
  const { boat } = route.params
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<UserProps[]>([])

  useEffect(() => {
    const getUser = async (user_id: string) => {
      const userDoc = await getDoc(doc(db, 'users', user_id))
      if (userDoc.exists()) {
        return { ...userDoc.data(), id: userDoc.id }
      }
    }

    const getUsers = async () => {
      setLoading(true)

      const usersPromises = boat.crew.map((user_id: string) => getUser(user_id))

      const usersList = await Promise.all(usersPromises)
      return usersList
    }

    getUsers().then(usersList => {
      setUsers(usersList)
      setLoading(false)
    })
  }, [boat.crew])

  const showTabs = () => {
    switch (index) {
      case 0:
        return (
          <ScrollView>
            {boat.events?.map((event: any, i: number) => (
              <View key={i} style={{ padding: 10 }}>
                <Text>{event.title}</Text>
                <Text>{event.date}</Text>
              </View>
            ))}
          </ScrollView>
        )
      case 1:
        return (
          <ScrollView>
            {boat.images?.map((image: string, i: number) => (
              <Image
                key={i}
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            ))}
          </ScrollView>
        )
      case 2:
        return (
          <ScrollView>
            {users.map((user: UserProps, i: number) => (
              <View
                key={i}
                style={styles.cardUser}
                onTouchEnd={() => {
                  navigation.navigate('/profile', {
                    user_id: user?.id
                  })
                }}>
                <Avatar
                  icon={user?.icon_url || ''}
                  size={25}
                  color="black"
                  border="transparent"
                />
                <Text style={styles.name}>{user?.name}</Text>
              </View>
            ))}
          </ScrollView>
        )
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 10
            }}>
            <Image
              key={boat.id}
              source={{ uri: boat?.image_url }}
              style={styles.image}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                flex: 1
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <Text style={{}}>{boat.number}</Text>
                <Text>{boat.boat_type}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <Text style={{}}>{boat.crew.length}</Text>
                <Text>membres</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 20
            }}>
            <Button
              title="Journal"
              color="black"
              outlined
              width={120}
              backgroundColor="transparent"
              onPress={() => navigation.navigate('/boats/logbook', { boat })}
            />
            <Button
              title="Conversations"
              color="black"
              outlined
              width={120}
              backgroundColor="transparent"
              onPress={() =>
                navigation.navigate('/boats/conversations', { boat })
              }
            />
          </View>
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
                name="account-group-outline"
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
  image: {
    width: 100,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    height: 80,
    justifyContent: 'flex-end'
  },
  name: { fontWeight: 'bold' }
})

export default Boat
