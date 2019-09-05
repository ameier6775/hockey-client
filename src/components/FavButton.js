import React from 'react'
import { Button } from '@material-ui/core'

export default function FavButton(props) {
  return (
    <Button type="submit" color="primary" onClick={props.onClick}>
      Favorite
    </Button>
  )
}
