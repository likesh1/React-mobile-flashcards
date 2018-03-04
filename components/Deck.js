import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { white, gray, textGray, darkBlue } from '../utils/colors'
import HeaderTitle from './HeaderTitle'
import ActionButton from './ActionButton'
import DisabledButton from './DisabledButton'
import TextButton from './TextButton'
import { NavigationActions } from 'react-navigation'
import Card from './Card'
import TabBar from './TabBar'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck, navigate, refreshDeck } = navigation.state.params

    return {
      headerTitle: <HeaderTitle title={deck.title} subtitle={`${deck.questions.length} Cards`} />,
      title: "Deck",
      ...Platform.select({
        ios: {
          headerRight: <TextButton onPress={() => navigate('AddCard', {deck, refreshDeck})}><Feather name='plus' size={30} color={darkBlue} /></TextButton>
        },
        android: {
          headerRight: <TextButton onPress={() => navigate('AddCard', {deck, refreshDeck})}><Feather name='plus' size={30} color={white} /></TextButton>
        }
      })

    }
  }

  state = {
    deck: this.props.navigation.state.params.deck
  }

  refreshDeck = deck => {
    this.setState({deck})
    this.props.navigation.setParams({ deck })
    this.props.navigation.state.params.refreshDecks()
  }



  componentDidMount() {
   this.props.navigation.setParams({ refreshDeck: this.refreshDeck, navigate: this.props.navigation.navigate, deck: this.props.navigation.state.params.deck });
 }


  render() {
    const {deck} = this.state

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
            { deck.questions.map((card, index) => {
              return (
                <Card key={deck.title+`-card-`+index} index={index} deck={deck} card={card} refreshDeck={this.refreshDeck} />
              )
            })}
        </ScrollView>
        <TabBar>
          {deck.questions.length ? (
          <TouchableHighlight underlayColor='transparent' onPress={() => { this.props.navigation.navigate('Quiz', {deck})}}>
            <Text style={{ color: darkBlue, textAlign: 'right', fontSize: 18}}>Take Quiz</Text>
          </TouchableHighlight>
          ) : (
            <Text style={{ color: darkBlue, textAlign: 'right', fontSize: 18, opacity: 0.6}}>Take Quiz</Text>
          )}
        </TabBar>
      </View>
    )
  }
}

export default Deck

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  title: {
    fontSize: 48,
    marginBottom: 15,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    color: 'grey'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: darkBlue,
    textAlign: 'center'
  },
  headerSubtitle: {
    color: textGray,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5
  }
})
