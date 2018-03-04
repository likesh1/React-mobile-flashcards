import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import HeaderTitle from './HeaderTitle'
import { white, gray, green, red, darkGray, textGray, black, darkBlue } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import TabBar from './TabBar'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const {deck} = navigation.state.params

    return {
      headerTitle: <HeaderTitle title="Quiz" subtitle={deck.title} />,
    }
  }

  state = {
    questions: [],
    current: 0,
    answer: false,
    correct: 0,
    count: 0,
    complete: false
  }

  componentWillMount() {
    const {deck} = this.props.navigation.state.params
    const questions = deck.questions
    const count = questions.length
    this.setState({ questions, count })
  }

  toggleAnswer() {
    this.setState((state) => ({answer: !state.answer}))
  }

  hideAnswer() {
    this.setState({answer: false})
  }

  correctAnswer() {
    this.setState((state) => {
      correct: state.correct++
    })
    this.nextQuestion()
  }

  nextQuestion() {
    const current = this.state.current + 1
    if (current < this.state.count) {
      this.setState({current, answer: false})
    } else {
      this.setState({complete: true})
      clearLocalNotification()
      .then(setLocalNotification)
    }
  }

  getScore() {
    return ((this.state.correct / this.state.count) * 100).toFixed(1)
  }

  resetQuiz() {
    this.setState({current: 0, correct: 0, complete: false, answer: false})
  }


  render() {
    const card = this.state.questions[this.state.current]

    return (
      <View style={styles.container}>
        { !this.state.complete ? (
          <View style={{ flex: 1, justifyContent: 'flex-start'}}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Question {this.state.current+1} of {this.state.count} </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.question}>{card.question}</Text>
              { this.state.answer && (
                <Text style={styles.answer}>{card.answer}</Text>
              )}
            </View>


            <TabBar style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.nextQuestion()}>
                  <Feather name='x' size={30} color={red} />
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.toggleAnswer()}>
                  { this.state.answer ? (
                    <Text>Hide Answer</Text>
                  ) : (
                    <Text>Show Answer</Text>
                  )}
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.correctAnswer()}>
                  <Feather name='check' size={30} color={green} />
                </TouchableHighlight>
            </TabBar>

          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1, backgroundColor: white, paddingTop: 15}}>
              <Text style={styles.score}>Your Score</Text>
              <Text style={styles.score}>{ this.getScore() }%</Text>
            </View>
            <TabBar style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.props.navigation.goBack()}>
                  <Feather name='chevron-left' size={30} color={textGray} />
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.resetQuiz()}>
                  <Feather name='rotate-cw' size={30} color={textGray} />
                </TouchableHighlight>
            </TabBar>
          </View>
        )}
      </View>
    )
  }
}

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
      }
    })
  },
  header: {
    padding: 15,
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center'
  },
  deck: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 25,
    marginTop: 10,
    marginBottom: 10,
    flexShrink: 0
  },
  card: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    borderTopWidth: 1,
    borderColor: darkGray
  },

  text: {
    fontSize: 21,
    marginBottom: 15,
    textAlign: 'center'
  },
  answer: {
    fontSize: 21,
    fontStyle: 'italic',
    paddingBottom: 15,
    textAlign: 'center',
    color: textGray
  },
  question: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingBottom: 15,
    paddingTop: 15,
    textAlign: 'center',
    color: black
  },
  score: {
    fontSize: 48,
    marginBottom: 15,
    textAlign: 'center',
    color: green
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    color: 'grey'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5
  }
})


export default Quiz
