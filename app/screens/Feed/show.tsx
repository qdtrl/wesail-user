import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import {Avatar, Button, Icon} from '../../components';

const Event = ({navigation, route}: any) => {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const event = route.params.event;
  const club = route.params.club;
  console.log(event);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <ImageBackground
            source={{uri: event?.cover_url}}
            style={styles.coverImage}>
            <View style={styles.coverInfos}>
              <View onTouchEnd={() => navigation.goBack()}>
                <Icon name="arrow-left" size={30} color="white" />
              </View>
              <Text style={styles.title}>{event.name}</Text>
            </View>
          </ImageBackground>
          <View style={styles.container}>
            <Text>{event.description}</Text>
            <Text style={styles.textRight}>
              du{' '}
              {format(new Date(event.start_date), 'dd', {
                locale: fr,
              })}{' '}
              au{' '}
              {format(new Date(event.end_date), 'dd MMMM yyyy', {
                locale: fr,
              })}
            </Text>
            <View style={styles.row}>
              <Text>Sponsor: {event?.sponsor}</Text>
              <View
                onTouchEnd={() =>
                  navigation.navigate('/clubs/show', {
                    club,
                  })
                }
                style={styles.buttonClub}>
                <ImageBackground
                  source={{uri: club?.cover_url}}
                  style={styles.coverImageClub}>
                  <Avatar
                    icon={club?.icon_url}
                    size={30}
                    color="black"
                    border="transparent"
                  />
                  <Text style={styles.title}>{club?.name}</Text>
                </ImageBackground>
              </View>
            </View>
            <ScrollView horizontal={true}>
              {event?.images.map((image: string, i: number) => (
                <Image key={i} source={{uri: image}} style={styles.image} />
              ))}
            </ScrollView>

            <View style={styles.rowAround}>
              <Button title="Participer" outlined={true} width={100} />
              <Button title="Inviter" outlined={true} width={100} />
            </View>

            <View style={styles.iconsBar}>
              <View
                onTouchEnd={() => setIndex(0)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.iconBar,
                  borderColor: index === 0 ? 'red' : 'black',
                }}>
                <Icon
                  name="trophy-outline"
                  size={24}
                  color={index === 0 ? 'red' : 'black'}
                />
              </View>
              <View
                onTouchEnd={() => setIndex(1)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.iconBar,
                  borderColor: index === 1 ? 'red' : 'black',
                }}>
                <Icon
                  name="camera-outline"
                  size={24}
                  color={index === 1 ? 'red' : 'black'}
                />
              </View>
              <View
                onTouchEnd={() => setIndex(2)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.iconBar,
                  borderColor: index === 2 ? 'red' : 'black',
                }}>
                <Icon
                  name="sail-boat"
                  size={24}
                  color={index === 2 ? 'red' : 'black'}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  container: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    gap: 20,
    margin: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowAround: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonClub: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: 200,
  },
  coverImage: {
    width: '100%',
    height: 200,
    // justifyContent: 'flex-end',
    opacity: 1,
  },
  coverInfos: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  coverImageClub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 5,
    borderColor: 'white',
    borderRadius: 5,
  },
  textRight: {
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconsBar: {flexDirection: 'row', gap: 10},
  iconBar: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 2,
  },
  text: {
    color: 'white',
  },
  image: {width: 250, height: 200, margin: 2},
});

export default Event;
