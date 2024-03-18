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
        image_url: res.data().image_url,
        name: res.data().name,
        boat_type: res.data().boat_type,
        number: res.data().number,
        owners: res.data().owners,
        crew: res.data().crew,
        club: res.data().club,
        created_at: res.data().created_at,
        images: res.data().images,
        sponsors: res.data().sponsors,
        length: res.data().length,
        width: res.data().width,
        draft: res.data().draft,
        weight: res.data().weight,
        sail_area: res.data().sail_area,
        engine: res.data().engine,
        fuel: res.data().fuel,
        water: res.data().water,
        year: res.data().year,
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
                  style={styles.card}
                  onTouchEnd={() =>
                    navigation.navigate('/boats/show', {
                      boat,
                    })
                  }>
                  <Image
                    key={boat.id}
                    source={{uri: boat?.image_url}}
                    style={styles.image}
                  />
                  <View style={styles.infos}>
                    <View>
                      <Text style={styles.title}>{boat.name}</Text>
                      <Text>{boat.boat_type}</Text>
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
    backgroundColor: 'lightgray',
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
