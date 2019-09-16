import React from 'react'
import { Typography } from '@material-ui/core'

export default class PlayerCardContent extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Typography variant="overline">
        <em>{this.props.statName}</em>
        <br />
        <b>{this.props.stat}</b>
      </Typography>
    )
  }
}
