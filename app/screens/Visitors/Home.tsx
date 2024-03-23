import React from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import { Button } from '../../components'
import { logo_white, home_video } from '../../assets'
import Video from 'react-native-video'

const Home = ({ navigation }: any) => {
  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <Video
        source={home_video}
        style={StyleSheet.absoluteFill}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
      <View style={styles.container}>
        <View style={styles.brand}>
          <Image source={logo_white} style={styles.logo} />
          <Text style={styles.title}>WeSail</Text>
        </View>
        <View style={styles.buttons}>
          <Button
            title="Se connecter"
            width={250}
            color="black"
            backgroundColor="#EFEFEF"
            onPress={() => navigation.navigate('/login')}
          />

          <Button
            title="S'inscrire"
            outlined={true}
            width={250}
            color="#EFEFEF"
            onPress={() => navigation.navigate('/register')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
    margin: 30
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 0
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  title: {
    fontSize: 50,
    color: '#EFEFEF',
    fontWeight: 'bold'
  },
  logo: { width: 200, height: 200 }
})

export default Home
