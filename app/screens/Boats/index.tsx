import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {db} from '../../services/firebase';

import {collection, onSnapshot} from 'firebase/firestore';
import {Button} from '../../components';
import {BoatProps} from '../../models';

const Boats = ({navigation}: any) => {
  const [boats, setBoats] = useState<BoatProps[]>([]);
  const [loading, setLoading] = useState(true);

  const getBoats = async () => {
    const boatsRef = collection(db, 'boats');
    onSnapshot(boatsRef, snapshot => {
      const boatsList = snapshot.docs.map(res => ({
        id: res.id,
        name: res.data().name,
        club: res.data().club,
        created_at: res.data().created_at,
        images: res.data().images,
        crew: res.data().crew,
        owners: res.data().owners,
        sponsors: res.data().sponsors,
        type: res.data().type,
        number: res.data().number,
        image: res.data().image,
      }));

      setBoats(boatsList);
      setLoading(false);
    });
  };

  useEffect(() => {
    getBoats();
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            {boats.map(boat => (
              <>
                <View
                  key={boat.id}
                  style={styles.card}
                  onTouchEnd={() =>
                    navigation.navigate('/boats/show', {
                      boat,
                    })
                  }>
                  <Image
                    key={boat.id}
                    source={{uri: boat?.image}}
                    style={styles.image}
                  />
                  <View style={styles.infos}>
                    <View>
                      <Text style={styles.title}>{boat.name}</Text>
                      <Text>{boat.type}</Text>
                    </View>
                    <View style={styles.textsRight}>
                      <Text style={styles.number}>{boat.number}</Text>
                      <Text>{boat.crew.length} membres</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.line} />
              </>
            ))}
            <View style={styles.buttonCreateContainer}>
              <View>
                <Button
                  title="Nouveau Bateau +"
                  onPress={() => navigation.navigate('/boats/create')}
                  outlined
                  // width={50}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    gap: 15,
    width: '100%',
  },
  card: {
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    width: '100%',
    borderRadius: 10,
    height: 200,
    justifyContent: 'flex-end',
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 1,
  },
  textsRight: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    width: '35%',
    height: 1,
    backgroundColor: 'lightgray',
  },
  buttonCreateContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 50,
  },
});

export default Boats;
