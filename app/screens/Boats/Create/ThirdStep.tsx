import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { AddSponsors, Icon } from '../../../components'

const ThirdStep = ({ boat, setBoat }: any) => {
  return (
    <View style={styles.inputs}>
      <View>
        <Text style={styles.label}>Club Nautique *</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            value={boat.club}
            onChangeText={text => setBoat({ ...boat, club: text })}
            placeholder="Club"
            autoCapitalize="words"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <AddSponsors boat={boat} setBoat={setBoat} />

      <View>
        <Text style={styles.label}>Année du bateau *</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            value={boat.year}
            onChangeText={text => setBoat({ ...boat, year: text })}
            placeholder="Année de construction"
            keyboardType="numeric"
            autoCapitalize="words"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Longueur *</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            inputMode="numeric"
            value={boat.length === 0 ? '' : Number(boat.length).toString()}
            onChangeText={text => setBoat({ ...boat, length: Number(text) })}
            placeholder="Longueur de la coque"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Largeur</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            inputMode="numeric"
            value={boat.width === 0 ? '' : Number(boat.width).toString()}
            onChangeText={text => setBoat({ ...boat, width: Number(text) })}
            placeholder="Largeur de la coque"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Tirant d'eau *</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            inputMode="numeric"
            value={boat.draft === 0 ? '' : Number(boat.draft).toString()}
            onChangeText={text => setBoat({ ...boat, draft: Number(text) })}
            placeholder="Tirant d'eau"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Poids</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            inputMode="numeric"
            value={boat.weight === 0 ? '' : Number(boat.weight).toString()}
            onChangeText={text => setBoat({ ...boat, weight: Number(text) })}
            placeholder="Poids du bateau"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Surface de voile</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            inputMode="numeric"
            value={
              boat.sail_area === 0 ? '' : Number(boat.sail_area).toString()
            }
            onChangeText={text => setBoat({ ...boat, sail_area: Number(text) })}
            placeholder="Surface de voile totale"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Fuel</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            value={boat.fuel}
            onChangeText={text => setBoat({ ...boat, fuel: text })}
            placeholder="Type de carburant"
            autoCapitalize="words"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Moteur</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            value={boat.engine}
            onChangeText={text => setBoat({ ...boat, engine: text })}
            placeholder="Puisance moteur"
            autoCapitalize="words"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Eau</Text>
        <View style={styles.inputGroup}>
          <Icon name="account-edit" size={20} color="#4777EE" />
          <TextInput
            inputMode="numeric"
            value={boat.water === 0 ? '' : Number(boat.water).toString()}
            onChangeText={text => setBoat({ ...boat, water: Number(text) })}
            placeholder="Capacité d'eau"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#4777EE"
          />
        </View>
      </View>
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
    width: '100%',
    height: 50
  },
  input: {
    color: '#4777EE',
    width: 250
  }
})

export default ThirdStep
