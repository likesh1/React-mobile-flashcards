import React from 'react'
import { View, StyleSheet } from 'react-native'
import { darkGray, white } from '../utils/colors'

export default function TabBar ({ children, style = {} }) {
  return (
    <View style={styles.tabBar}>
      <View style={[{flex: 1, justifyContent: 'flex-end'}, style]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: white,
    padding: 10,
    paddingTop: 18,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderColor: darkGray
  }
})
