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
        <b>{this.props.header}</b>{' '}
        <div className="player-card-content">
          <em>{this.props.description}</em>
        </div>
      </Typography>
    )
  }
}
