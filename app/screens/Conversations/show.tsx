import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {auth, db, rtdb} from '../../services/firebase';
import {
  ref,
  push,
  onValue,
  serverTimestamp,
  set,
  remove,
} from 'firebase/database';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';

import {doc, getDoc} from 'firebase/firestore';
import {Avatar, Icon} from '../../components';
import {ConversationParams, MessageProps, UserProps} from '../../models';

const Conversation = ({navigation, route}: ConversationParams) => {
  const {conversation} = route.params;
  const [users, setUsers] = useState<UserProps[]>([]);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(true);

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY + 30 >= event.nativeEvent.layoutMeasurement.height) {
      remove(
        ref(
          rtdb,
          `notifications/${auth.currentUser?.uid}/conversations/${conversation.id}`,
        ),
      );
    }
  };

  useEffect(() => {
    if (messages && messages.length > 0 && !loading) {
      scrollToBottom();
    }
  }, [messages, loading, conversation.id]);

  useEffect(() => {
    const getUser = async (user_id: string) => {
      const userDoc = await getDoc(doc(db, 'users', user_id));
      if (userDoc.exists()) {
        return {...userDoc.data(), id: userDoc.id};
      }
      const clubDoc = await getDoc(doc(db, 'clubs', user_id));
      if (clubDoc.exists()) {
        return {...clubDoc.data(), id: clubDoc.id};
      }
    };

    const getUsersConversation = async () => {
      setLoading(true);
      const userPromises = conversation.users.map((user_id: string) =>
        getUser(user_id),
      );
      const usersList = await Promise.all(userPromises);
      return usersList;
    };

    getUsersConversation().then((usersList: UserProps[]) => {
      setUsers(usersList);
      setLoading(false);
    });
  }, [conversation.users]);

  useEffect(() => {
    const convRef = ref(rtdb, `conversations/${conversation.id}/messages`);

    onValue(convRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, [conversation.id]);

  const handlePostMessage = async () => {
    const message_clean = message.trim();
    if (message_clean) {
      push(ref(rtdb, `conversations/${conversation.id}/messages`), {
        content: message_clean,
        created_at: serverTimestamp(),
        user_id: auth.currentUser?.uid,
        images: [],
      });
      conversation.users.forEach((user_id: string) => {
        if (user_id !== auth.currentUser?.uid) {
          set(
            ref(
              rtdb,
              `notifications/${user_id}/conversations/${conversation.id}`,
            ),
            {
              user_id: auth.currentUser?.uid,
              created_at: serverTimestamp(),
            },
          );
        }
      });
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
          style={styles.container}>
          <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <ScrollView
              style={styles.container}
              ref={scrollViewRef}
              onScroll={handleScroll}
              scrollEventThrottle={300}>
              <View style={styles.containerMessages}>
                {messages.map((m: MessageProps, i: number) => {
                  const isMe = m.user_id === auth.currentUser?.uid;
                  const user = users.find(u => u.id === m.user_id);

                  const messageDate = new Date(m.created_at);

                  const today = new Date();

                  let date = '';
                  if (today.getDate() === messageDate.getDate()) {
                    date = format(messageDate, 'HH:mm', {locale: fr});
                  } else {
                    date = format(messageDate, 'dd/MM/yyyy', {locale: fr});
                  }

                  return (
                    <View
                      key={i}
                      style={
                        isMe
                          ? styles.containerMyMessage
                          : styles.containerMessage
                      }>
                      {isMe ? (
                        <>
                          <View style={styles.cardMyMessage}>
                            <Text>{m.content}</Text>
                          </View>
                          <Text style={styles.myDate}>{date}</Text>
                        </>
                      ) : (
                        <>
                          <View
                            style={styles.cardUser}
                            onTouchEnd={() => {
                              navigation.navigate('/profile', {
                                user_id: user?.id,
                              });
                            }}>
                            <Avatar
                              icon={user?.icon_url || ''}
                              size={25}
                              color="black"
                              border="transparent"
                            />
                            <Text style={styles.name}>{user?.name}</Text>
                          </View>
                          <View style={styles.cardMessage}>
                            <Text>{m.content}</Text>
                          </View>
                          <Text style={styles.date}>{date}</Text>
                        </>
                      )}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View style={styles.containerInputs}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Message"
                multiline
                style={styles.textInput}
              />
              <View onTouchEnd={handlePostMessage}>
                <Icon name="send" size={30} color="#000" />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMessages: {justifyContent: 'flex-end', minHeight: '100%'},
  containerMyMessage: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-end',
  },
  containerMessage: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
  },
  cardMyMessage: {
    maxWidth: '80%',
    marginHorizontal: 10,
    marginVertical: 0,
    padding: 10,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    backgroundColor: 'lightgreen',
  },
  cardMessage: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    maxWidth: '80%',
    marginHorizontal: 10,
    marginVertical: 0,
    padding: 10,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    backgroundColor: 'lightblue',
  },
  cardUser: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 2,
    gap: 2,
  },
  name: {fontWeight: 'bold'},
  myDate: {marginRight: 10, fontSize: 10},
  date: {marginLeft: 10, fontSize: 10},
  containerInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
  textInput: {
    minHeight: 60,
    maxHeight: 200,
    borderWidth: 0.2,
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default Conversation;
