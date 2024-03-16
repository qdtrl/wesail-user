import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Conversations} from '../screens';

const ConversationsStack = createNativeStackNavigator();

const ConversationsRouter = () => {
  return (
    <ConversationsStack.Navigator initialRouteName="/conversations">
      <ConversationsStack.Screen
        name="/conversations"
        component={Conversations}
        options={{headerShown: false}}
      />
    </ConversationsStack.Navigator>
  );
};

export default ConversationsRouter;
