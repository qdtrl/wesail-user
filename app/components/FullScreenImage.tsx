import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const FullScreenImage = ({ image }: any) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  }
})

export default FullScreenImage
