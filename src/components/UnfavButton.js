import React from 'react'
import { Button } from '@material-ui/core'
import '../index.css'

export default function UnfavTeam(props) {
  return (
    <Button
      className="borderButton"
      border="1px solid orange"
      type="submit"
      color="inherit"
      onClick={props.onClick}
    >
      Unfavorite
    </Button>
  )
}
