import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon } from '.'

const AddSponsors = ({ boat, setBoat }: any) => {
  const [string, setString] = useState('')
  return (
    <View>
      <Text style={styles.label}>Sponsors</Text>
      <View style={styles.inputGroup}>
        <Icon name="account-edit" size={20} color="#4777EE" />
        <TextInput
          value={string}
          onChangeText={text => setString(text)}
          placeholder="Ajouter un sponsor"
          style={styles.input}
          placeholderTextColor="#4777EE"
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            flex: 1,
            borderBlockColor: 'yellow'
          }}>
          <Button
            title="+"
            outlined
            width={20}
            onPress={() => {
              if (string.trim() === '') {
                return
              }
              setBoat({
                ...boat,
                sponsors: [...boat.sponsors, string.trim()]
              })
              setString('')
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {boat.sponsors.map((sponsor: string, index: number) => (
          <Text
            key={index}
            style={styles.button}
            onPress={() => {
              setBoat({
                ...boat,
                sponsors: boat.sponsors.filter((s: string) => s !== sponsor)
              })
            }}>
            {sponsor}
          </Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    gap: 20
  },
  label: {
    color: '#4777EE',
    fontSize: 16,
    fontWeight: 'bold'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    borderLeftWidth: 1,
    borderColor: '#4777EE',
    width: '100%',
    height: 50
  },
  input: {
    color: '#4777EE',
    width: 180
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10
  },
  button: {
    borderWidth: 1,
    padding: 10
  }
})

export default AddSponsors
