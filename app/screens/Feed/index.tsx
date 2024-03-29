import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ImageBackground
} from 'react-native'
import { db } from '../../services/firebase'

import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

type EventProps = {
  id: string
  club_id: string
  name: string
  description: string
  start_date: string
  end_date: string
  created_at: string
  cover_url: string
  sponsor: string
  address: string
  city: string
  zipcode: string
  images: string[]
}

const Feed = ({ navigation }: any) => {
  const [events, setEvents] = useState<EventProps[]>([])
  const [clubs, setClubs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const getEvents = async () => {
    const eventsRef = collection(db, 'events')
    onSnapshot(eventsRef, snapshot => {
      const eventsList = snapshot.docs.map(res => ({
        id: res.id,
        club_id: res.data().club_id,
        name: res.data().name,
        description: res.data().description,
        start_date: res.data().start_date,
        end_date: res.data().end_date,
        created_at: res.data().created_at,
        cover_url: res.data().cover_url,
        sponsor: res.data().sponsor,
        address: res.data().address,
        city: res.data().city,
        zipcode: res.data().zipcode,
        images: res.data().images
      }))

      setEvents(eventsList)
    })
  }

  useEffect(() => {
    const getClub = async (clubId: string) => {
      const clubDoc = await getDoc(doc(db, 'clubs', clubId))
      if (clubDoc.exists()) {
        return { ...clubDoc.data(), id: clubDoc.id }
      }
    }

    const getClubs = async () => {
      const clubPromises = events.map(event => getClub(event.club_id))

      const clubsList = await Promise.all(clubPromises)
      return clubsList
    }

    getClubs().then(clubsList => {
      setClubs(clubsList)
      setLoading(false)
    })
  }, [events])

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            {events.map(event => (
              <View
                key={event.id}
                style={styles.card}
                onTouchEnd={() =>
                  navigation.navigate('/events/show', {
                    event,
                    club: clubs.find(club => club.id === event.club_id)
                  })
                }>
                <ImageBackground
                  source={{ uri: event?.cover_url }}
                  style={styles.image}>
                  <View style={styles.infos}>
                    <View>
                      <Text style={styles.title}>{event.name}</Text>
                      <Text style={styles.text}>
                        du{' '}
                        {format(new Date(event.start_date), 'dd', {
                          locale: fr
                        })}{' '}
                        au{' '}
                        {format(new Date(event.end_date), 'dd MMMM yyyy', {
                          locale: fr
                        })}
                      </Text>
                    </View>
                    <View style={styles.textsRight}>
                      <Text style={styles.text}>{event.sponsor}</Text>
                      <Text style={styles.text}>
                        {clubs.find(club => club.id === event.club_id)?.name}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    margin: 10
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: 200
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  textsRight: {
    alignItems: 'flex-end'
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    color: 'white'
  }
})

export default Feed
