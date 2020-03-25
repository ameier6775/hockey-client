import React from 'react'
import { TableCell } from '@material-ui/core'

export default class TableSection extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TableCell
        onClick={this.props.sortBy}
        align="center"
        style={{ color: 'rgb(234, 140, 0)' }}
      >
        <b>
          <em>{this.props.description}</em>
        </b>
      </TableCell>
    )
  }
}
