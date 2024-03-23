import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Profile, Settings } from '../screens'

const ProfileStack = createNativeStackNavigator()

const ProfileRouter = () => {
  return (
    <ProfileStack.Navigator initialRouteName="/profile">
      <ProfileStack.Screen
        name="/profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="/profile/settings"
        component={Settings}
        options={{ title: 'Paramètres' }}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileRouter
