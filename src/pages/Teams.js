import React, { Component } from 'react'
import { Typography, Card, CardContent, Icon } from '@material-ui/core'
import Axios from 'axios'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import Auth from '../components/Auth'

class Teams extends Component {
  constructor() {
    super()
    this.state = {
      data: [
        {
          id: '',
          name: '',
          officialSiteUrl: '',
          favorite: false,
        },
      ],
    }
  }

  async componentDidMount() {
    const data = await Axios.get('http://localhost:8080/teams', {
      headers: { authorization: window.localStorage.getItem('auth') },
    })
    this.setState({ data: data.data })
    // console.log(this.state.data)
  }
  render() {
    return (
      <Layout>
        <div
          style={{
            marginTop: '100px',
            marginBottom: '100px',

            display: 'flex',
            flexWrap: 'wrap',
            width: '100vw',
            height: 'auto',
          }}
        >
          {this.state.data &&
            this.state.data.map(team => {
              return (
                <Card
                  key={team.id}
                  style={{
                    width: '400px',
                    margin: '10px',
                    textAlign: 'left',
                  }}
                >
                  <CardContent>
                    <Typography align="center" name="favoriteTeam">
                      {team.favorite && (
                        <Icon fontSize="large" color="primary">
                          star
                        </Icon>
                      )}
                    </Typography>
                    <Typography variant="h4">
                      <center>{team.name}</center>
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: '"Apple Color Emoji"',
                        textAlign: 'center',
                        marginTop: '30px',
                      }}
                    >
                      <a href={team.officialSiteUrl}>WEBSITE</a>
                    </Typography>
                    <Typography variant="overline">
                      <Link to={`/team/${team.id}`}>View Team</Link>
                    </Typography>
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </Layout>
    )
  }
}

export default Auth(Teams)
