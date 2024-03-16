import {collection, getDocs} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';
import {db} from '../../services/firebase';

import {serverTimestamp} from 'firebase/firestore';

type ConversationProps = {
  id: string;
  name: string;
  created_at: typeof serverTimestamp;
  icon_url: string;
  users: string[];
  admins: string[];
};

const Conversations = ({navigation}: any) => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<ConversationProps[]>([]);

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
      <View>
        <Text>Conversations</Text>
        <Button
          title="Create Conversation"
          onPress={() => navigation.navigate('/conversations/create')}
        />
      </View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          conversations.map(conversation => (
            <View key={conversation.id}>
              <Text>{conversation.name}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Conversations;
