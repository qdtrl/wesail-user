import { View, Text } from 'react-native'
import React from 'react'

const BoatConversations = ({ navigation, route }: any) => {
  const { boat } = route.params

  console.log(boat)

  return (
    <View>
      <Text>BoatConversations</Text>
    </View>
  )
}

export default BoatConversations
