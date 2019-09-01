import React from 'react'
import { Paper, Card, CardContent, Typography } from '@material-ui/core'

export default class Succes extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }
  render() {
    return (
      <Paper>
        <Card>
          <CardContent>
            <Typography variant="h1">Successful add!</Typography>
          </CardContent>
        </Card>
      </Paper>
    )
  }
}
