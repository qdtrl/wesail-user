import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Boats} from '../screens';

const BoatsStack = createNativeStackNavigator();

const BoatsRouter = () => {
  return (
    <BoatsStack.Navigator initialRouteName="/boats">
      <BoatsStack.Screen
        name="/boats"
        component={Boats}
        options={{headerShown: false}}
      />
    </BoatsStack.Navigator>
  );
};

export default BoatsRouter;
