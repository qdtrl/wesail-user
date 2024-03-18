import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Button, Input} from '../../components';
import {UserProps, ConversationProps} from '../../models';
import {addDoc, collection, getDocs, serverTimestamp} from 'firebase/firestore';
import {db} from '../../services/firebase';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import SearchUsers from '../../components/SearchUsers';
import {launchImageLibrary} from 'react-native-image-picker';
const CreateConversation = () => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchAdmin, setSearchAdmin] = useState('');
  const [users, setUsers] = useState<string[]>([]);
  const [admins, setAdmins] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserProps[]>([]);

  const handleButtonPress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé la prise de photo");
      } else if (response.error) {
        console.log('Erreur imagePicker : ', response.error);
      } else {
        const source = {uri: response.uri};
        console.log(source);
        // Vous pouvez maintenant utiliser l'image source dans votre application
      }
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    uploadIcon();
  };

  const uploadIcon = async () => {
    const storageRef = ref(storage, `conversations/icons/${conversation.name}`);
    const uploadTask = uploadBytesResumable(storageRef, icon);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      error => {
        toast.error(error.message);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setConversation(prev => {
            return {
              ...prev,
              icon_url: downloadURL,
            };
          });
        });
      },
    );
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.scrollView}>
          <Input
            placeholder="Nom de la conversation"
            value={name}
            setValue={setName}
          />

          <Text onPress={handleButtonPress}>Choisir une icone</Text>

          <SearchUsers
            label="utilisateurs"
            data={userData}
            values={users}
            setValues={setUsers}
          />

          <SearchUsers
            label="admins"
            data={userData}
            values={admins}
            setValues={setAdmins}
          />

          <Button title="Créer" onPress={handleSubmit} width={150} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});

export default CreateConversation;
