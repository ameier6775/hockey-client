import React from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Paper, Typography, Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'

class Team extends React.Component {
  constructor() {
    super()
    this.state = {
      id: '',
      conference: '',
      division: '',
      teamStart: '',
      name: '',
      location: '',
      website: '',
      venue: '',
      roster: [
        {
          id: '',
          fullName: null,
          jerseyNumber: null,
          position: null,
        },
      ],
    }
  }

  async componentDidMount() {
    const data = await axios.get(
      `http://localhost:8080/team/${this.props.match.params.id}`
    )

    const team = data.data.teams[0]

    console.log(data.data.teams[0])
    // console.log(playerData.data.teams[0].roster.roster)

    const playerData = await axios.get(
      `http://localhost:8080/team/${this.props.match.params.id}/roster`
    )
    console.log(playerData)

    const roster = playerData.data.teams[0].roster.roster

    const mappedFromApi = roster.map(player => {
      return {
        id: player.person.id,
        fullName: player.person.fullName,
        jerseyNumber: player.jerseyNumber,
        position: player.position.name,
      }
    })

    this.setState({
      id: team.id,
      conference: team.conference.name,
      division: team.division.name,
      teamStart: team.firstYearOfPlay,
      name: team.name,
      location: team.venue.city,
      website: team.officialSiteUrl,
      venue: team.venue.name,
      roster: mappedFromApi,
    })
  }

  render() {
    return (
      <Layout>
        <div>
          <Paper
            style={{
              position: '-webkit-sticky',
              top: 0,
            }}
            elevation={10}
          >
            <center>
              <Typography variant="h3">
                Home of the {this.state.name}
              </Typography>
              <Typography variant="h4">
                {this.state.conference} Conference, {this.state.division}{' '}
                Division
              </Typography>
              <Typography variant="h6">
                Ever Since Time: {this.state.teamStart}
              </Typography>
              <Typography variant="subtitle1">
                Currently residing at {this.state.venue} in{' '}
                {this.state.location}
              </Typography>
              <Typography variant="subtitle2">
                Check Out The Official Team Site{' '}
                <a href={this.state.website}> Here</a>
              </Typography>
            </center>
          </Paper>

          <Paper
            elevation={4}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            {this.state.roster.map(player => {
              return (
                <Card
                  style={{
                    width: '400px',
                    margin: '10px',
                    textAlign: 'left',
                  }}
                  key={player.fullName}
                >
                  <CardContent>
                    <Typography variant="h5"> {player.fullName}</Typography>
                    <Typography variant="subtitle2">
                      Position:
                      {player ? player.position : ''}
                    </Typography>
                    <Typography>
                      Jersey #:
                      {player ? player.jerseyNumber : ''}
                    </Typography>
                    <Typography>
                      <Link to={`/player/${player.id}`}>Stats</Link>
                    </Typography>
                  </CardContent>
                </Card>
              )
            })}
          </Paper>
        </div>
      </Layout>
    )
  }
}

export default Team
