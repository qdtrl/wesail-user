import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image
} from 'react-native'
import { auth, db, rtdb } from '../../services/firebase'
import { Icon } from '../../components'
import { User } from 'firebase/auth'
import { ConversationProps } from '../../models'
import { onValue, ref } from 'firebase/database'

const Conversations = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState<ConversationProps[]>([])
  const [notifications, setNotifications] = useState<String[]>([])
  const user = auth.currentUser ? (auth.currentUser as User) : ''

  const getConversations = async () => {
    const conversationsRef = collection(db, 'conversations')
    onSnapshot(conversationsRef, snapshot => {
      const conversationsList = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        created_at: doc.data().created_at,
        icon_url: doc.data().icon_url,
        users: doc.data().users,
        admins: doc.data().admins
      }))

      setConversations(conversationsList)
      setLoading(false)
    })
  }

  const getNotfications = async () => {
    const notificationsRef = ref(
      rtdb,
      `notifications/${auth.currentUser?.uid}/conversations`
    )

    onValue(notificationsRef, snapshot => {
      const data = snapshot.val()
      if (data) {
        setNotifications(Object.keys(data))
      } else {
        setNotifications([])
      }
    })
  }

  useEffect(() => {
    getNotfications()
    getConversations()
  }, [])

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversations</Text>
        <View onTouchEnd={() => navigation.navigate('/conversations/create')}>
          <Icon name="plus-circle" color="black" size={30} />
        </View>
      </View>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          {conversations.map(conversation => (
            <View
              style={styles.card}
              key={conversation.id}
              onTouchEnd={() =>
                navigation.navigate('/conversations/show', {
                  conversation: conversation,
                  isAdmin: user && conversation.admins.includes(user.uid)
                })
              }>
              <Image
                source={{ uri: conversation.icon_url }}
                style={styles.image}
              />
              <View style={styles.centerCard}>
                <Text>{conversation.name}</Text>
                <Text>{conversation.users.length} participants</Text>
              </View>
              {notifications.includes(conversation.id) && (
                <Icon name="circle" color="green" size={20} />
              )}
              <Icon name="chevron-right" color="black" size={30} />
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loader: {
    height: '88%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  card: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1
  },
  centerCard: {
    flex: 1
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
})

export default Conversations
