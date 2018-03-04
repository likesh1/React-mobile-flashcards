import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import ActionButton from './ActionButton'
import { white } from '../utils/colors'
import { saveDeckTitle, getDeck } from '../utils/helpers'

class AddDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "New Deck",
    }
  }

  state = {
    title: ""
  }

  clearTitle = () => {
    this.setState({title: ""})
  }

  addDeck = () => {
    saveDeckTitle(this.state.title)
    getDeck(this.state.title).then((deck) => this.props.navigation.navigate('Deck', {deck, refreshDecks: this.props.navigation.state.params.refreshDecks}))
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Title</Text>
        <TextInput style={styles.input} onChangeText={(title) => this.setState({ title })} value={this.state.title} />
        <ActionButton onPress={this.addDeck} text="CREATE DECK">
        </ActionButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left'
  },
  input: {
    padding: 5
  }
})

export default AddDeck
