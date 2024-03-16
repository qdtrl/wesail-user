import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Feed} from '../screens';

const FeedStack = createNativeStackNavigator();

const FeedRouter = () => {
  return (
    <FeedStack.Navigator initialRouteName="/feed">
      <FeedStack.Screen
        name="/feed"
        component={Feed}
        options={{headerShown: false}}
      />
    </FeedStack.Navigator>
  );
};

export default FeedRouter;
