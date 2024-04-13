import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Icon } from '../../components'

const New = ({ navigation }: any) => {
  return (
    <View style={styles.section}>
      <View style={styles.container}>
        <View
          style={styles.card}
          onTouchEnd={() => navigation.navigate('/new/logbook')}>
          <Icon name="note-plus-outline" size={36} color="#EFEFEF" />
          <Text style={styles.text}>Journal</Text>
        </View>
        <View
          style={styles.card}
          onTouchEnd={() => navigation.navigate('/new/event')}>
          <Icon name="calendar-plus" size={36} color="#EFEFEF" />
          <Text style={styles.text}>Événement</Text>
        </View>
        <View
          style={styles.card}
          onTouchEnd={() => navigation.navigate('/new/post')}>
          <Icon name="forum-outline" size={36} color="#EFEFEF" />
          <Text style={styles.text}>Post</Text>
        </View>
        <View
          style={styles.card}
          onTouchEnd={() => navigation.navigate('/new/image')}>
          <Icon name="image-plus" size={36} color="#EFEFEF" />
          <Text style={styles.text}>Image</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5
  },
  card: {
    flexBasis: '40%',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#4777EE'
  },
  text: { color: '#EFEFEF', fontSize: 16, marginTop: 10 }
})

export default New
