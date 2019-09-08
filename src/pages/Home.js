import React, { Component } from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import Axios from 'axios'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import Auth from '../components/Auth'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      teams: [
        {
          id: '',
          name: '',
          conference: {
            name: '',
          },
          division: {
            name: '',
            nameShort: '',
          },
          venue: {
            name: '',
          },
          officialSiteUrl: '',
        },
      ],
      favTeams: [
        {
          id: '',
        },
      ],
    }
  }

  async componentDidMount() {
    const data = await Axios.get('http://localhost:8080/teams', {
      headers: { authorization: window.localStorage.getItem('auth') },
    })
    const userData = await Axios.get(`http://localhost:8080/user/id/teams`, {
      headers: {
        authorization: window.localStorage.getItem('auth'),
      },
    })
    const favTeams = userData.data
    const teams = data.data.teams
    const userTeams = []
    // console.log(data.data)
    teams.forEach(team => {
      favTeams.forEach(favTeam => {
        if (team.id === favTeam.teamId) {
          userTeams.push(team)
        }
      })
    })
    this.setState({ teams: teams, favTeams: userTeams })
  }
  render() {
    return (
      <Layout>
        <div
          style={{
            marginTop: '100px',
            marginBottom: '100px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100vw',
            height: 'auto',
          }}
        >
          {this.state.teams &&
            this.state.favTeams &&
            this.state.favTeams.map(team => {
              // if (team.id === this.state.favTeams.id) {
              //   userTeams
              // }
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
                    <Typography variant="h4">
                      <center>
                        <b>{team.name}</b>
                      </center>
                    </Typography>
                    <br />
                    <Typography variant="overline">
                      Conference:
                      <center>
                        <em>{team.conference ? team.conference.name : ''}</em>
                      </center>
                    </Typography>
                    <Typography variant="overline">
                      Division:
                      <center>
                        <em>{team.division ? team.division.name : ''}</em>
                      </center>
                    </Typography>
                    <Typography variant="overline">
                      Venue:{' '}
                      <center>
                        <em>{team.venue ? team.venue.name : ''}</em>
                      </center>
                    </Typography>
                    <br />
                    <Typography
                      variant="overline"
                      style={{
                        textAlign: 'center',
                        marginTop: '30px',
                      }}
                    >
                      <a href={team.officialSiteUrl}>
                        <center>
                          <b>Website</b>
                        </center>
                      </a>
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

export default Auth(Home)
