import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

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
              backgroundColor: '#696969',
              margin: '10px',
              marginTop: '100px',
              marginBottom: '100px',
              marginLeft: '18%',
              display: 'flex',
              flexWrap: 'wrap',
              width: '58%',
              height: 'auto',
              boxShadow: '0px 0px 25px rgb(234, 140, 0)',
              color: 'rgb(234, 140, 0)',
            }}
          >
            <CardContent
              style={{
                border: '1px solid rgb(234, 140, 0)',
                textAlign: 'lef',
              }}
            >
              <Typography align="center" variant="h3">
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
