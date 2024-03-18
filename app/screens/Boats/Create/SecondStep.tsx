import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SearchUsers} from '../../../components';
import {UserProps} from '../../../models';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../services/firebase';

const SecondStep = ({boat, setBoat}: any) => {
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [crew, setCrew] = useState<string[]>([]);
  const [owners, setOwners] = useState<string[]>([]);
  const getUserData = async () => {
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    const usersList = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      first_name: doc.data().first_name,
      last_name: doc.data().last_name,
      icon_url: doc.data().icon_url,
      created_at: doc.data().created_at,
    }));

    setUserData(usersList);
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (!crew.length && !owners.length) {
      return;
    }
    if (crew === boat.crew && owners === boat.owners) {
      return;
    }

    const newCrew = [...new Set([...crew, ...owners])];
    setBoat({...boat, crew: newCrew, owners});
    setCrew(newCrew);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crew, owners]);

  return (
    <>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && (
        <View style={styles.inputs}>
          <SearchUsers
            label="Propriétaires"
            data={userData}
            values={boat.owners}
            setValues={setOwners}
          />
          <SearchUsers
            label="Equipage"
            data={userData}
            values={boat.crew}
            setValues={setCrew}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
});

export default SecondStep;
