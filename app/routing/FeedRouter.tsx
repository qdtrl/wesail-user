import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Feed, Event} from '../screens';

const FeedStack = createNativeStackNavigator();

const FeedRouter = () => {
  return (
    <FeedStack.Navigator initialRouteName="/feed">
      <FeedStack.Screen
        name="/feed"
        component={Feed}
        options={{headerShown: false, title: ''}}
      />
      <FeedStack.Screen
        name="/events/show"
        component={Event}
        options={({route}) => ({
          title: (route.params as {event: any}).event.name,
          headerShown: false,
        })}
      />
    </FeedStack.Navigator>
  );
};

export default FeedRouter;
