import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Modal, Animated, Platform } from 'react-native'
import { white, gray, darkBlue, darkGray, black, red, lightGray, textGray } from '../utils/colors'
import { getDecks, saveDeckTitle, truncateText } from '../utils/helpers'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


class DeckListRow extends Component {
  state = {
    translateX: new Animated.Value(0),
    edit: false,
    touch: false,
    rowBackground: white
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

  onShowUnderlay() {
    this.setState({touch: true, rowBackground: lightGray})
  }
  onHideUnderlay() {
    this.setState({touch: false, rowBackground: white})
  }

  render() {
    const {deck, navigate, removeDeck, refreshDecks} = this.props
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
            <TouchableHighlight style={{flex: 1 }} underlayColor='transparent' onShowUnderlay={() => {this.onShowUnderlay()}} onHideUnderlay={() => {this.onHideUnderlay()}} activeOpacity={1} onPress={() => navigate('Deck', {deck, refreshDecks})}>
              <View style={[styles.deck, {backgroundColor: this.state.rowBackground}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.title]}>
                      { truncateText(deck.title) }
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.count]}>{
                      deck.questions.length
                    }</Text>
                    <Entypo name='chevron-small-right' size={24} color={black} />
                  </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => removeDeck(deck.title)} underlayColor={red} style={styles.deleteBtn}>
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
          <Animated.View style={{flex: 1, flexDirection: 'row', zIndex: 1, transform: [{translateX:this.state.translateX}]}}>
            <TouchableHighlight style={{flex: 1 }} underlayColor='transparent' onShowUnderlay={() => {this.onShowUnderlay()}} onHideUnderlay={() => {this.onHideUnderlay()}} activeOpacity={1} onPress={() => navigate('Deck', {deck, refreshDecks})}>
              <View style={[styles.deck, {backgroundColor: this.state.rowBackground}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  { Platform.OS === 'android' && (
                    <MaterialCommunityIcons name='cards' size={30} color={textGray} />
                  )}
                  <Text style={[styles.title]}>
                    { truncateText(deck.title) }
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.count]}>{
                    deck.questions.length
                  }</Text>
                  <Entypo name='chevron-small-right' size={24} color={black} />
                </View>
              </View>
            </TouchableHighlight>
          </Animated.View>
          <TouchableHighlight onPress={() => removeDeck(deck.title)} underlayColor={red} style={styles.deleteBtn}>
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
  deck: {
    ...Platform.select({
      ios: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
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
  title: {
    fontSize: 18,
    color: black,
    paddingLeft: 20
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
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderColor: red,
    margin: 0,

    ...Platform.select({
      android: {
        right: 0,
        paddingTop: 23,
        paddingBottom: 23,
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

export default DeckListRow
