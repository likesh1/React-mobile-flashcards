import React from 'react';
import {View, StatusBar, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { white, darkBlue, lightGray, black, translucent, textGray} from './utils/colors'
import { setLocalNotification } from './utils/helpers'

function FlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ height: Constants.statusBarHeight, backgroundColor }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList
  },
  AddDeck: {
    screen: AddDeck,
  },
  Deck: {
    screen: Deck,
  },
  AddCard: {
    screen: AddCard,
  },
  Quiz: {
    screen: Quiz,
  }
}, {
  navigationOptions: {
    ...Platform.select({
      ios: {
        headerTintColor: textGray,
      },
      android: {
        headerTintColor: white,
      }
    }),

    headerStyle: {
      ...Platform.select({
        ios: {
          backgroundColor: white,
          borderBottomWidth: 1,
          borderColor: lightGray
        },
        android: {
          backgroundColor: darkBlue,
          height: 75
        }
      })
    },
    headerTitleStyle: {
      ...Platform.select({
        ios: {
          fontSize: 18,
          fontWeight: 'bold',
          color: darkBlue
        },
        android: {
          fontSize: 21,
          fontWeight: 'normal',
          color: white,
        },
      }),
    },
    headerBackTitleStyle: {
      ...Platform.select({
        ios: {
          color: textGray,
          fontWeight: 'normal'
        },
        android: {
          color: white,
          fontWeight: 'normal'
        }
      })

    }
  }
})

export default class App extends React.Component {

  componentWillMount() {
    setLocalNotification()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { (Platform.OS === 'ios') ? (
          <FlashcardsStatusBar backgroundColor={white} barStyle="dark-content" />
        ) : (
          <FlashcardsStatusBar backgroundColor={darkBlue} barStyle="light-content" />
        )}

        <MainNavigator />
      </View>
    );
  }
}
