import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Conversations,
  Conversation,
  CreateConversation,
  UpdateConversation,
} from '../screens';
import {Icon} from '../components';
import {View} from 'react-native';
import {ConversationProps} from '../models';

const ConversationsStack = createNativeStackNavigator();
export interface ConversationRouteParams {
  conversation: ConversationProps;
  isAdmin: boolean;
}

const ConversationsRouter = () => {
  return (
    <ConversationsStack.Navigator initialRouteName="/conversations">
      <ConversationsStack.Screen
        name="/conversations"
        component={Conversations}
        options={{headerShown: false, title: ''}}
      />
      <ConversationsStack.Screen
        name="/conversations/show"
        component={Conversation}
        options={({navigation, route}) => ({
          title: (route.params as ConversationRouteParams).conversation.name,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () =>
            (route.params as ConversationRouteParams).isAdmin && (
              <View
                onTouchEnd={() =>
                  navigation.navigate('/conversations/update', {
                    conversation: (route.params as ConversationRouteParams)
                      .conversation,
                  })
                }>
                <Icon name="cog" size={30} color="#000" />
              </View>
            ),
        })}
      />
      <ConversationsStack.Screen
        name="/conversations/create"
        component={CreateConversation}
        options={{title: 'Nouvelle conversation'}}
      />
      <ConversationsStack.Screen
        name="/conversations/update"
        component={UpdateConversation}
        options={{title: ''}}
      />
    </ConversationsStack.Navigator>
  );
};

export default ConversationsRouter;
