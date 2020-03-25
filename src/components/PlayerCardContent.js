import React from 'react'
import { Typography } from '@material-ui/core'

export default class PlayerCardContent extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Typography variant="subtitle1">
        <em>{this.props.header}</em>{' '}
        <div className="player-card-content">
          <b>{this.props.description}</b>
        </div>
      </Typography>
    )
  }
}
