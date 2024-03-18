import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Boats, Boat} from '../screens';
import {View} from 'react-native';
import {Icon} from '../components';
import {BoatProps} from '../models';

const BoatsStack = createNativeStackNavigator();

const BoatsRouter = () => {
  return (
    <BoatsStack.Navigator initialRouteName="/boats">
      <BoatsStack.Screen
        name="/boats"
        component={Boats}
        options={{headerShown: false, title: ''}}
      />
      <BoatsStack.Screen
        name="/boats/show"
        component={Boat}
        options={({navigation, route}) => ({
          title: (route.params as {boat: any}).boat.name,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <View
              onTouchEnd={() =>
                navigation.navigate('/boats/update', {
                  boat: (route.params as {boat: BoatProps}).boat,
                })
              }>
              <Icon name="cog" size={30} color="#000" />
            </View>
          ),
        })}
      />
      <BoatsStack.Screen
        name="/boats/create"
        component={Boat}
        options={{title: 'Nouveau bateau'}}
      />
      <BoatsStack.Screen
        name="/boats/update"
        component={Boat}
        options={{title: ''}}
      />
    </BoatsStack.Navigator>
  );
};

export default BoatsRouter;
