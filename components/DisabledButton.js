import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { darkBlue, white } from '../utils/colors'

export default function ActionButton ({ children, style = {} }) {
  return (
    <View style={[styles.button]}>
      <Text style={styles.buttonText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: darkBlue,
    opacity: 0.5,
    padding: 15,
    margin: 10,
    borderRadius: 8
  },
  buttonText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  }
})
