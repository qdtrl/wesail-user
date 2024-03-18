import {View, Text, TextInput, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {UserProps} from '../models';
import {Avatar, Icon} from '.';

interface SearchUsersParams {
  label: string;
  data: UserProps[];
  values: string[];
  setValues: any;
}
const SearchUsers = ({label, data, values, setValues}: SearchUsersParams) => {
  const [search, setSearch] = useState('');

  const handleSelect = (id: string) => {
    if (values.includes(id)) {
      setValues(values.filter(x => x !== id));
    } else {
      setValues([...values, id]);
    }
  };

  return (
    <View>
      <Text>Utilisateurs</Text>
      <TextInput
        style={styles.input}
        placeholder={`Rechercher des ${label}`}
        value={search}
        onChange={e => setSearch(e.nativeEvent.text)}
      />
      <ScrollView style={styles.scrollview}>
        {data
          .filter(
            x =>
              x?.name?.toLowerCase().includes(search.toLowerCase()) ||
              x?.first_name?.toLowerCase().includes(search.toLowerCase()) ||
              x?.last_name?.toLowerCase().includes(search.toLowerCase()) ||
              `${x?.first_name} ${x?.last_name}`
                .toLowerCase()
                .includes(search.toLowerCase()),
          )
          .map((user, index) => (
            <View
              key={index}
              onTouchEnd={() => handleSelect(user.id)}
              style={styles.card}>
              <View style={styles.containerUser}>
                <Avatar
                  icon={user.icon_url}
                  size={25}
                  color="black"
                  border={'transparent'}
                />
                <Text>{user.first_name + ' ' + user.last_name}</Text>
              </View>
              {values.includes(user.id) ? (
                <Icon name="circle" color="green" size={20} />
              ) : (
                <Icon name="circle-outline" color="black" size={20} />
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    height: 45,
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  scrollview: {
    maxHeight: 200,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    padding: 10,
  },
});

export default SearchUsers;
