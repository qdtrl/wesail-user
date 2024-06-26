import React, { Suspense, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth, rtdb } from './app/services/firebase'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Home, Login, Register, ForgotPassword } from './app/screens'
import {
  BoatsRouter,
  ConversationsRouter,
  FeedRouter,
  NewRouter,
  ProfileRouter
} from './app/routing'

import { Avatar, Icon } from './app/components'
import { onValue, ref } from 'firebase/database'

const VisitorsStack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

type IconProfileProps = {
  color: string
  size: number
  url: string | null
}

type TabIconProps = {
  name: string
  color: string
  size: number
}

const TabIcon = ({ name, color, size }: TabIconProps) => (
  <Icon name={name} color={color} size={size} />
)

const IconProfile = ({ color, size, url }: IconProfileProps) => {
  if (url) {
    return <Avatar icon={url} size={size} color={color} border={color} />
  } else {
    return TabIcon({ name: 'account', color, size })
  }
}

export default function App(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState({
    boats: 0,
    conversations: 0,
    profile: 0
  })

  const size = 30

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, res => {
      setUser(res)

      setLoading(false)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (user) {
      const notificationsRef = ref(rtdb, `notifications/${user.uid}`)

      onValue(notificationsRef, snapshot => {
        const data = snapshot.val()
        if (data) {
          setNotifications({
            boats: data.boats ? Object.values(data.boats).length : 0,
            conversations: data.conversations
              ? Object.values(data.conversations).length
              : 0,
            profile: data.profile ? Object.values(data.profile).length : 0
          })
        } else {
          setNotifications({ boats: 0, conversations: 0, profile: 0 })
        }
      })
    }
  }, [user])

  return (
    <NavigationContainer>
      <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />} />
      {loading ? (
        <View style={styles.section}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : user ? (
        <Tab.Navigator
          initialRouteName="/feed-router"
          screenOptions={{
            tabBarActiveTintColor: '#4777EE',
            tabBarInactiveTintColor: 'gray'
          }}>
          <Tab.Screen
            name="/feed-router"
            component={FeedRouter}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color }) => TabIcon({ name: 'home', color, size })
            }}
          />
          <Tab.Screen
            name="/boats-router"
            component={BoatsRouter}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarBadge:
                notifications.boats !== 0 ? notifications.boats : undefined,
              tabBarIcon: ({ color }) =>
                TabIcon({ name: 'sail-boat', color, size })
            }}
          />
          <Tab.Screen
            name="/add-router"
            component={NewRouter}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color }) =>
                TabIcon({ name: 'plus-circle', color, size })
            }}
          />
          <Tab.Screen
            name="/conversations-router"
            component={ConversationsRouter}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarBadge:
                notifications.conversations !== 0
                  ? notifications.conversations
                  : undefined,
              tabBarIcon: ({ color }) => TabIcon({ name: 'chat', color, size })
            }}
          />
          <Tab.Screen
            name="/profile-router"
            component={ProfileRouter}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarBadge:
                notifications.profile !== 0 ? notifications.profile : undefined,
              tabBarIcon: ({ color }) =>
                IconProfile({ color, size, url: user.photoURL })
            }}
          />
        </Tab.Navigator>
      ) : (
        <VisitorsStack.Navigator initialRouteName="/home">
          <VisitorsStack.Screen
            name="/home"
            component={Home}
            options={{ headerShown: false }}
          />
          <VisitorsStack.Screen
            name="/login"
            component={Login}
            options={{ headerShown: false }}
          />
          <VisitorsStack.Screen
            name="/register"
            component={Register}
            options={{ headerShown: false }}
          />
          <VisitorsStack.Screen
            name="/forgot-password"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
        </VisitorsStack.Navigator>
      )}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  section: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})
