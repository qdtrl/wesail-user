import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { Icon } from '../../../components'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const FirstStep = ({ user, setUser }: any) => {
  const [open, setOpen] = useState(false)
  const maxDate = new Date().setFullYear(new Date().getFullYear() - 18)

  return (
    <View style={styles.inputs}>
      <View>
        <Text style={styles.label}>Prénom *</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            value={user.first_name}
            onChangeText={text => setUser({ ...user, first_name: text })}
            placeholder="Camille"
            autoCapitalize="words"
            autoComplete="given-name"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Nom *</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            value={user.last_name}
            onChangeText={text => setUser({ ...user, last_name: text })}
            placeholder="Doe"
            autoCapitalize="words"
            autoComplete="family-name"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Pseudonyme *</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-cowboy-hat-outline" size={20} color="#4777EE" />
          <TextInput
            value={user.name}
            onChangeText={text => setUser({ ...user, name: text })}
            placeholder="CamilleDoe"
            autoCapitalize="none"
            autoComplete="username"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View onTouchEnd={() => setOpen(!open)}>
        <Text style={styles.label}>Date de naissance *</Text>
        <View style={styles.inputGroup}>
          <Icon name="calendar" size={20} color="#4777EE" />
          <Text style={styles.input}>
            {format(user.birth_date, 'dd/MM/yyyy', { locale: fr })}
          </Text>
        </View>
      </View>

      <DatePicker
        modal
        mode="date"
        maximumDate={new Date(maxDate)}
        open={open}
        date={user.birth_date}
        onConfirm={date => {
          setOpen(false)
          setUser({ ...user, birth_date: date })
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 30
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
    width: 280,
    height: 50
  },
  input: {
    color: '#EFEFEF',
    width: 250
  }
})

export default FirstStep
