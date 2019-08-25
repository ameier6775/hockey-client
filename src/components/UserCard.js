import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import Layout from './Layout'
import { grey } from '@material-ui/core/colors'

export default class UserCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = { username: '', password: '' }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div>
        <form>
          <Card
            style={{
              margin: '10px',
              marginTop: '100px',
              marginBottom: '100px',
              marginLeft: '18%',
              display: 'flex',
              flexWrap: 'wrap',
              width: '58%',
              height: 'auto',
              boxShadow: '0px 0px 30px #F79238',
            }}
          >
            <CardContent>
              <Typography variant="h3">
                <b>{this.props.header}</b>
              </Typography>
              {this.props.children}
            </CardContent>
          </Card>
        </form>
      </div>
    )
  }
}
