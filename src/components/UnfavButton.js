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
      style={{
        border: '1px solid rgb(234, 140, 0)',
        marginBottom: '25px',
      }}
    >
      Unfavorite
    </Button>
  )
}
