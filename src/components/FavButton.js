import React from 'react'
import { Button } from '@material-ui/core'

export default function FavButton(props) {
  return (
    <Button
      border="1px solid orange"
      type="submit"
      color="inherit"
      onClick={props.onClick}
      style={{
        border: '1px solid rgb(234, 140, 0)',
        marginBottom: '25px',
      }}
    >
      Favorite
    </Button>
  )
}
