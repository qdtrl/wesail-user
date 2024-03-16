import React, {Suspense, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {User, onAuthStateChanged} from 'firebase/auth';
import {auth} from './app/services/firebase';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ActivityIndicator} from 'react-native';
import {Home, Login, Register, ForgotPassword} from './app/screens';
import {
  BoatsRouter,
  ConversationsRouter,
  FeedRouter,
  ProfileRouter,
} from './app/routing';

import {Icon} from './app/components';

const VisitorsStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

type TabIconProps = {
  name: string;
  color: string;
  size: number;
};

const TabIcon = ({name, color, size}: TabIconProps) => (
  <Icon name={name} color={color} size={size} />
);

export default function App(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const size = 30;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, res => {
      setUser(res);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {user ? (
        <Tab.Navigator
          initialRouteName="/feed-router"
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            tabBarInactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="/feed-router"
            component={FeedRouter}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({color}) => TabIcon({name: 'home', color, size}),
            }}
          />
          <Tab.Screen
            name="/boats-router"
            component={BoatsRouter}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({color}) =>
                TabIcon({name: 'sail-boat', color, size}),
            }}
          />
          <Tab.Screen
            name="/conversations-router"
            component={ConversationsRouter}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarBadge: 1,
              tabBarIcon: ({color}) => TabIcon({name: 'chat', color, size}),
            }}
          />
          <Tab.Screen
            name="/profile-router"
            component={ProfileRouter}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({color}) => TabIcon({name: 'account', color, size}),
            }}
          />
        </Tab.Navigator>
      ) : (
        <VisitorsStack.Navigator initialRouteName="/home">
          <VisitorsStack.Screen
            name="/home"
            component={Home}
            options={{headerShown: false}}
          />
          <VisitorsStack.Screen
            name="/login"
            component={Login}
            options={{headerShown: false}}
          />
          <VisitorsStack.Screen
            name="/register"
            component={Register}
            options={{headerShown: false}}
          />
          <VisitorsStack.Screen
            name="/forgot-password"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
        </VisitorsStack.Navigator>
      )}
    </NavigationContainer>
  );
}
