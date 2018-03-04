import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { darkBlue, textGray, white } from '../utils/colors'
import { truncateText } from '../utils/helpers'

export default function HeaderTitle ({ title, subtitle }) {
  return (
    <View>
      <Text style={styles.headerTitle}>{truncateText(title)}</Text>
      <Text style={styles.headerSubtitle}>{truncateText(subtitle)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        color: darkBlue,
      },
      android: {
        color: white,
      }
    })

  },
  headerSubtitle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        color: textGray,
      },
      android: {
        color: white,
      }
    })
  }
})
