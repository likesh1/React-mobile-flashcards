import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { darkBlue, white } from '../utils/colors'

export default function ActionButton ({ children, text, onPress, style = {} }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: darkBlue,
    margin: 10,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  buttonText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})
