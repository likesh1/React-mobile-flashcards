import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Modal, AlertIOS, Animated, Platform } from 'react-native'
import { white, gray, darkBlue, darkGray, black, red, lightGray, textGray } from '../utils/colors'
import { truncateText, addCardToDeck } from '../utils/helpers'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


class Card extends Component {
  state = {
    translateX: new Animated.Value(0),
    edit: false,
    touch: false
  }

  onSwipeLeft(gestureState) {
    Animated.timing(
      this.state.translateX,
      {
        toValue: -100,
        duration: 200,
      }
    ).start();
  }
  onSwipeRight(gestureState) {
    Animated.timing(
      this.state.translateX,
      {
        toValue: 0,
        duration: 200,
      }
    ).start();
  }

  removeCard = (deck, card) => {
    deck.questions.splice(card, 1)
    addCardToDeck(deck)
    this.props.refreshDeck(deck)
  }


  render() {
    const {card, deck, refreshDeck, index} = this.props
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    if (Platform.OS === 'ios') {
      return (
        <GestureRecognizer
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={config}>
          <Animated.View style={{flex: 1, flexDirection: 'row', transform: [{translateX:this.state.translateX}]}}>
            <View style={styles.card}>
              <View style={[styles.qa]}>
                <Text style={[styles.title]}>
                  { truncateText(card.question) }
                </Text>
                <Text>
                  { truncateText(card.answer) }
                </Text>
              </View>
            </View>
            <TouchableHighlight onPress={() => this.removeCard(deck, index)} underlayColor={red} style={styles.deleteBtn}>
              <View>
                <Text style={styles.deleteBtnText}>Delete</Text>
              </View>
            </TouchableHighlight>
          </Animated.View>
        </GestureRecognizer>
      )
    }

    return (
      <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Animated.View style={[styles.animated, {transform: [{translateX:this.state.translateX}]}]}>
            <View style={styles.card}>
              <View style={[styles.qa]}>
                <Text style={[styles.title]}>
                  { truncateText(card.question) }
                </Text>
                <Text>
                  { truncateText(card.answer) }
                </Text>
              </View>
            </View>
          </Animated.View>
          <TouchableHighlight onPress={() => this.removeCard(deck, index)} underlayColor={red} style={styles.deleteBtn}>
            <View>
              <Text style={styles.deleteBtnText}>Delete</Text>
            </View>
          </TouchableHighlight>
        </View>
      </GestureRecognizer>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gray
  },
  animated: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 1,
  },
  card: {
    ...Platform.select({
      ios: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: white,
        borderBottomWidth: 1,
        borderColor: gray,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        flexShrink: 0
      },
      android: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: white,
        borderBottomWidth: 1,
        borderColor: gray,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        flexShrink: 0
      }
    })
  },
  qa: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  title: {
    fontSize: 18,
    color: black
  },
  count: {
    fontSize: 18,
    textAlign: 'right',
    color: black
  },
  deleteBtn: {
    flex: 1,
    position: 'absolute',
    backgroundColor: red,
    width: 100,
    right: -100,
    paddingTop: 23,
    paddingBottom: 23,
    borderBottomWidth: 1,
    borderColor: red,
    margin: 0,

    ...Platform.select({
      android: {
        right: 0,
        paddingTop: 28,
        paddingBottom: 28,
      }
    })
  },
  deleteBtnText: {
    fontSize: 18,
    color: white,
    textAlign: 'center'
  },
  tabBar: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: white,
    padding: 10,
    paddingTop: 18,
    paddingBottom: 18
  }
})

export default Card
