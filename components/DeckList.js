import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, AlertIOS, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { white, gray, darkBlue, darkGray, translucent, textGray } from '../utils/colors'
import { initApp, getDecks, saveDeckTitle, removeDeck, truncateText } from '../utils/helpers'
import { Entypo } from '@expo/vector-icons'
import DeckListRow from './DeckListRow'
import TextButton from './TextButton'
import TabBar from './TabBar'

class DeckList extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: "Decks",
      ...Platform.select({
        android: {
          headerRight: <TextButton onPress={() => navigation.state.params.newDeck()}><Feather name='plus' size={30} color={white} /></TextButton>
        }
      })
    }
  }

  state = {
    decks: {}
  }

  refreshDecks = () => {
    getDecks().then((decks) => this.setState({decks}))
  }

  componentWillMount() {
    initApp().then((decks) => this.setState({decks}))
  }

  componentDidMount() {
    //this.refreshDecks()
    this.props.navigation.setParams({newDeck: this.newDeck})
  }

  addDeckToState = (deck) => {
    this.setState((state) => ({
      decks: {
        ...state['decks'],
        deck
      }
    }))
  }

  addDeck = (title) => {
    const deck = {
      title,
      questions: []
    }
    this.addDeckToState(deck)
    saveDeckTitle(title)
    this.props.navigation.navigate('Deck', {deck, refreshDecks: this.refreshDecks})
  }

  removeDeckFromState = (title) => {
    this.setState((state) => {
      delete state['decks'][title]

      return {
        ...state
      }

    })
  }

  removeDeck = (title) => {
    this.removeDeckFromState(title)
    removeDeck(title)
  }

  newDeck = () => {
      if (Platform.OS === 'ios') {
          this.openAlert()
      } else {
          this.openView()
      }
  }

  openAlert = () => {
    AlertIOS.prompt(
      'Enter new deck title',
      null,
      text => this.addDeck(text)
    )
  }

  openView = () => {
      this.props.navigation.navigate('AddDeck', {refreshDecks: this.refreshDecks})
  }


  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
        <View style={styles.container}>
        { this.state.decks && Object.keys(this.state.decks).length ? (
          <ScrollView style={styles.container}>
              { Object.keys(this.state.decks).map((key) => {
                return (
                  <DeckListRow key={key} deck={this.state.decks[key]} navigate={this.props.navigation.navigate}
                  removeDeck={this.removeDeck} refreshDecks={this.refreshDecks} />
                )
              })}
          </ScrollView>
        ) : (
          <View style={styles.msgContainer}>
            <Text style={styles.msg}>No Decks</Text>
          </View>
        )}
          { Platform.OS === 'ios' && (
            <TabBar>
              <TouchableHighlight underlayColor='transparent' onPress={() => { this.newDeck()}}>
                <Text style={{ color: darkBlue, textAlign: 'right', fontSize: 18}}>Add Deck</Text>
              </TouchableHighlight>
            </TabBar>
          )}

        </View>
    )
  }
}

export default DeckList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  msgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  msg: {
    color: textGray,
    fontSize: 32,
    textAlign: 'center',
  }
})
