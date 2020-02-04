import React from 'react'
import { Button } from '@material-ui/core'

export default function FavButton(props) {
  return (
    <Button
      border="1px solid orange"
      type="submit"
      color="inherit"
      onClick={props.onClick}
    >
      Favorite
    </Button>
  )
}
