import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '../../components'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'

const Settings = ({ navigation, route }: any) => {
  const { user } = route.params

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      // Utilisateur déconnecté, vous pouvez rediriger vers la page de connexion
    } catch (error) {
      console.error(error)
      // Une erreur s'est produite
    }
  }

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Button
          color="black"
          backgroundColor="red"
          title="Déconnexion"
          onPress={handleSignOut}
        />
      </View>
    </SafeAreaView>
  )
}

export default Settings
