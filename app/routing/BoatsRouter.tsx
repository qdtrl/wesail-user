import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Boats, Boat, CreateBoat, UpdateBoat, JoinWaitingList, Logbook, BoatConversations} from '../screens';
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
        name="/boats/logbook"
        component={Logbook}
        options={{title: 'Journal de bord'}}
      />
      <BoatsStack.Screen
        name="/boats/conversations"
        component={BoatConversations}
        options={{title: 'Conversations'}}
      />
      <BoatsStack.Screen
        name="/boats/create"
        component={CreateBoat}
        options={{title: 'Nouveau bateau'}}
      />
      <BoatsStack.Screen
        name="/boats/update"
        component={UpdateBoat}
        options={{title: ''}}
      />
      <BoatsStack.Screen
        name="/boats/update/join-waiting-list"
        component={JoinWaitingList}
        options={{title: ''}}
      />
    </BoatsStack.Navigator>
  );
};

export default BoatsRouter;
