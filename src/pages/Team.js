import React from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import {
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Icon,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Auth from '../components/Auth'

class Team extends React.Component {
  constructor() {
    super()
    this.state = {
      favTeam: '',
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

    this.favorite = this.favorite.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  favorite(e) {
    this.setState({
      favorite: !this.state.favorite,
    })
    // console.log(this.state)
  }

  async componentDidMount() {
    const data = await axios.get(
      `http://localhost:8080/team/${this.props.match.params.id}`,
      {
        headers: { authorization: window.localStorage.getItem('auth') },
      }
    )

    const team = data.data.teams[0]

    const playerData = await axios.get(
      `http://localhost:8080/team/${this.props.match.params.id}/roster`,
      {
        headers: { authorization: window.localStorage.getItem('auth') },
      }
    )

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
      // <Auth>
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
              <Typography>
                {this.state.favorite && (
                  <Icon fontSize="large" color="primary">
                    star
                  </Icon>
                )}
              </Typography>
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
              <Typography align="center">
                <Button
                  type="submit"
                  color="primary"
                  onClick={this.favorite && this.handleSubmit}
                >
                  Favorite
                </Button>
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
                    <Typography align="center" variant="h5">
                      {' '}
                      {player.fullName}
                    </Typography>
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
      // </Auth>
    )
  }
}

export default Auth(Team)
