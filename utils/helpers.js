import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Notifications, Permissions } from 'expo'

const FLASHCARDS_STORAGE_KEY = 'Flashcards:decks'
const FLASHCARDS_USER_KEY = 'Flashcards:users'
const NOTIFICATION_KEY = 'Flashcards:notifications'

const defaultDecks = {
  French: {
    title: "French",
    questions: [
      {
        question: "Hola",
        answer: "Hello"
      },
      {
        question: "Gracias",
        answer: "Thanks"
      },
      {
        question: "Buenas noches",
        answer: "Goodnight"
      },
      {
        question: "¿Dónde está el baño?",
        answer: "Where is the bathroom?"
      },
      {
        question: "te amo",
        answer: "I love you"
      }
    ]
  },
  React: {
    title: "React",
    questions: [
      {
        question: "What React function allows you to render the content to be displayed?",
        answer: "render()"
      }
    ]
  }
}


export function initApp() {
  return AsyncStorage.getItem(FLASHCARDS_USER_KEY).then((result) => {
    if (!result) {
      return createUser('User')
    } else {
      return getDecks()
    }
  })
}

function setDefaultDecks() {
  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(defaultDecks))
}

function createUser(name) {
  const user = {
    name: name,
    history: []
  }

  return AsyncStorage.setItem(FLASHCARDS_USER_KEY, JSON.stringify({[name]: user}))
    .then(() => {
      return AsyncStorage.getItem(FLASHCARDS_USER_KEY)
        .then((result) => {
          setDefaultDecks()
          return getDecks()
        })
    })
}


export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then( (result) => {
      return JSON.parse(result)
  })
}

export function getDeck(title) {
  return getDecks().then((decks) => decks[title])
}

export function saveDeckTitle(title) {
  const deck = {
    title: title,
    questions: []
  }

  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({[title]:deck}))
}

export function removeDeck(title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      delete decks[title]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
    })
}

export function addCardToDeck(deck) {
  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({[deck.title]:deck}))
}

function createNotification () {
  return {
    title: 'Complete a quiz!',
    body: "Don't forget to complete a quiz today!",
    ios: {
      sound: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(9)
              tomorrow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function truncateText(text) {
  const max = 35
  return (text.length > max ? text.substring(0, max-3) + '...' : text)
}
