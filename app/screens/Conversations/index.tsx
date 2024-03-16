import {collection, getDocs} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import {auth, db} from '../../services/firebase';

import {Icon} from '../../components';
import {User} from 'firebase/auth';
import ConversationProps from '../../models/conversation';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  centerCard: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

const Conversations = ({navigation}: any) => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const user = auth.currentUser ? (auth.currentUser as User) : '';

  const getConversations = async () => {
    const conversationsRef = collection(db, 'conversations');
    const conversationsSnapshot = await getDocs(conversationsRef);

    const conversationsList: ConversationProps[] =
      conversationsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        created_at: doc.data().created_at,
        icon_url: doc.data().icon_url,
        users: doc.data().users,
        admins: doc.data().admins,
      }));

    setConversations(conversationsList);
    setLoading(false);
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text>Conversations</Text>
        <View onTouchEnd={() => navigation.navigate('/conversations/create')}>
          <Icon name="plus-circle" color="black" size={30} />
        </View>
      </View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          conversations.map(conversation => (
            <View
              style={styles.card}
              key={conversation.id}
              onTouchEnd={() =>
                navigation.navigate('/conversations/show', {
                  conversation: conversation,
                  isAdmin: user && conversation.admins.includes(user.uid),
                })
              }>
              <Image
                source={{uri: conversation.icon_url}}
                style={styles.image}
              />
              <View style={styles.centerCard}>
                <Text>{conversation.name}</Text>
                <Text>{conversation.users.length} participants</Text>
              </View>

              <Icon name="chevron-right" color="black" size={30} />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Conversations;
