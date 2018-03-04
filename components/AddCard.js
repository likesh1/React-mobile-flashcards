import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { white, gray, darkGray, textGray, black, darkBlue } from '../utils/colors'
import HeaderTitle from './HeaderTitle'
import ActionButton from './ActionButton'
import DisabledButton from './DisabledButton'
import { addCardToDeck } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const {deck, refreshDeck, goBack} = navigation.state.params

    addCard = () => {
      deck.questions.push({
        question: navigation.state.params.question,
        answer: navigation.state.params.answer
      })

      addCardToDeck(deck)
      refreshDeck(deck)
      setTimeout(function() {
        navigation.goBack()
      }, 100)
    }

    return {
      headerTitle: <HeaderTitle title="New Card" subtitle={deck.title} />,
      headerRight: <View>{navigation.state.params.question && navigation.state.params.answer ? (
        ( Platform.OS === 'ios') ? (
          <TextButton onPress={() => addCard()}><Feather name='check' size={30} color={darkBlue} /></TextButton>
        ) : (
          <TextButton onPress={() => addCard()}><Feather name='check' size={30} color={white} /></TextButton>
        )

      ) : (
        ( Platform.OS === 'ios') ? (
          <Text style={[styles.disabled, styles.headerRight]}><Feather name='check' size={30} color={textGray} /></Text>
        ) : (
          <Text style={[styles.disabled, styles.headerRight]}><Feather name='check' size={30} color={white} /></Text>
        )

      )}</View>
    }
  }

  updateQuestion(question) {
    const {navigation} = this.props
    navigation.setParams({question})
  }

  updateAnswer(answer) {
    const {navigation} = this.props
    navigation.setParams({answer})
  }

  componentDidMount() {
    this.props.navigation.setParams({goBack: this.props.navigation.goBack})
  }


  render() {
    const {state} = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Provide a question and answer</Text>
          <TextInput placeholder="Question" autoFocus={true}  placeholderTextColor={textGray} style={styles.input} onChangeText={(question) => this.updateQuestion( question)} value={state.params.question} />
          <TextInput placeholder="Answer" placeholderTextColor={textGray} style={[styles.input]} onChangeText={(answer) => this.updateAnswer( answer)} value={state.params.answer} />
        </View>
      </View>
    )
  }
}

export default AddCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    ...Platform.select({
      ios: {
        backgroundColor: gray,
      },
      android: {
        backgroundColor: white,
        padding: 15
      }
    })

  },
  form: {

  },
  label: {
    ...Platform.select({
      ios: {
        padding: 15
      },
      android: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5,
      }
    })
  },
  input: {
    ...Platform.select({
      ios: {
        fontSize:14,
        backgroundColor: white,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: darkGray,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        marginBottom: 15
      },
      android: {
        fontSize: 16,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5,
        marginBottom: 15,
      }
    })
  },
  white: {
    color: white
  },
  darkBlue: {
    color: darkBlue
  },
  disabled: {
    fontSize: 16,
    opacity: 0.6,
    paddingRight: 20
  }
})
