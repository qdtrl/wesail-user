import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'
import { AddSponsors } from '../app/components'

test('renders correctly', () => {
  const { getByText } = render(
    <AddSponsors boat={{ sponsors: [] }} setBoat={() => {}} />
  )
  expect(getByText('Sponsors')).toBeDefined()
})

test('adds a sponsor', () => {
  const setBoatMock = jest.fn()
  const { getByPlaceholderText, getByText } = render(
    <AddSponsors boat={{ sponsors: [] }} setBoat={setBoatMock} />
  )
  const input = getByPlaceholderText('Ajouter un sponsor')
  const addButton = getByText('+')

  fireEvent.changeText(input, 'Sponsor 1')
  fireEvent.press(addButton)

  expect(setBoatMock).toHaveBeenCalledWith({ sponsors: ['Sponsor 1'] })
})

test('removes a sponsor', () => {
  const setBoatMock = jest.fn()
  const { getByText } = render(
    <AddSponsors
      boat={{ sponsors: ['Sponsor 1', 'Sponsor 2'] }}
      setBoat={setBoatMock}
    />
  )
  const removeButton = getByText('Sponsor 1')

  fireEvent.press(removeButton)

  expect(setBoatMock).toHaveBeenCalledWith({ sponsors: ['Sponsor 2'] })
})
