import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Conversations,
  Conversation,
  CreateConversation,
  UpdateConversation,
} from '../screens';

const ConversationsStack = createNativeStackNavigator();

const ConversationsRouter = () => {
  return (
    <ConversationsStack.Navigator initialRouteName="/conversations">
      <ConversationsStack.Screen
        name="/conversations"
        component={Conversations}
        options={{headerShown: false}}
      />
      <ConversationsStack.Screen
        name="/conversations/show"
        component={Conversation}
        options={{title: 'Conversation'}}
      />
      <ConversationsStack.Screen
        name="/conversations/create"
        component={CreateConversation}
        options={{headerShown: false}}
      />
      <ConversationsStack.Screen
        name="/conversations/update"
        component={UpdateConversation}
        options={{headerShown: false}}
      />
    </ConversationsStack.Navigator>
  );
};

export default ConversationsRouter;
