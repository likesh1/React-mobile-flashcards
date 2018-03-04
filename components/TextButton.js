import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center'
  }
})
