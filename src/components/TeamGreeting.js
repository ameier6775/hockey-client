import React from 'react'
import FavGreeting from './FavGreeting'
import UnfavGreeting from './UnfavGreeting'

export default function TeamGreeting(props) {
  const isFavorited = props.isFavorited

  if (isFavorited) {
    return <UnfavGreeting />
  }
  return <FavGreeting />
}
