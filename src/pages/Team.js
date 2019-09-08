import React from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Paper, Typography, Card, CardContent, Icon } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Auth from '../components/Auth'
import FavButton from '../components/FavButton'
import UnfavButton from '../components/UnfavButton'

class Team extends React.Component {
  constructor(props) {
    super(props)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleUnfavorite = this.handleUnfavorite.bind(this)

    this.state = {
      isFavorited: '',
      userId: '',
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
      statsSingleSeason: [
        {
          gamesPlayed: '',
          wins: '',
          losses: '',
          ot: '',
          pts: '',
        },
      ],
      teamStatsRanking: [
        {
          goalsFor: '',
          goalsAgainst: '',
        },
      ],
    }
  }

  async handleFavorite(e) {
    e.preventDefault()
    this.setState({
      isFavorited: true,
    })
    await axios.post(
      `http://localhost:8080/user/team`,
      {
        userId: this.state.userId,
        teamId: this.state.id,
      },
      { headers: { authorization: window.localStorage.getItem('auth') } },
      console.log('favorited')
    )
    // let path = '/teams'
    // this.props.history.push(path)
  }
  async handleUnfavorite(e) {
    e.preventDefault()
    this.setState({
      isFavorited: false,
    })
    await axios.patch(
      `http://localhost:8080/user/team/delete`,
      {
        userId: this.state.userId,
        teamId: this.state.id,
      },
      { headers: { authorization: window.localStorage.getItem('auth') } },
      console.log('unfavorited')
    )
    // let path = '/teams'
    // this.props.history.push(path)
  }

  async componentDidMount() {
    const userData = await axios.get(`http://localhost:8080/user/id`, {
      headers: { authorization: window.localStorage.getItem('auth') },
    })
    const userId = userData.data.userId

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

    const teamData = await axios.get(
      `http://localhost:8080/team/stats/${this.props.match.params.id}`,
      {
        headers: { authorization: window.localStorage.getItem('auth') },
      }
    )
    const statsSingleSeason = teamData.data.stats[0].splits[0].stat
    const teamStatsRanking = teamData.data.stats[1].splits[0].stat

    console.log(teamStatsRanking)

    this.setState({
      userId: userId,
      statsSingleSeason: statsSingleSeason,
      wins: statsSingleSeason.wins,
      losses: statsSingleSeason.losses,
      teamStatsRanking: teamStatsRanking,
      goalsPerGame: teamStatsRanking.goalsPerGame,
      goalsAgainstPerGame: teamStatsRanking.goalsAgainstPerGame,
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
    const isFavorited = this.state.isFavorited
    let Button

    if (isFavorited) {
      Button = <UnfavButton onClick={this.handleUnfavorite} />
    } else {
      Button = <FavButton onClick={this.handleFavorite} />
    }
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
              <Typography name="favoriteTeam">
                {this.state.isFavorited && (
                  <Icon fontSize="large" color="primary">
                    star
                  </Icon>
                )}
              </Typography>
              <Typography variant="h2">
                <b>Home of the {this.state.name}</b>
              </Typography>
              <Typography variant="h4">
                <em>
                  {this.state.conference} Conference, {this.state.division}{' '}
                  Division
                </em>
              </Typography>
              <Typography variant="h6">
                <b>Ever Since Time: {this.state.teamStart}</b>
              </Typography>
              <Typography variant="subtitle1">
                <em>
                  Currently residing at the {this.state.venue} in{' '}
                  {this.state.location}
                </em>
              </Typography>
              <Typography variant="caption">
                <b>
                  Check Out The Official Team Site{' '}
                  <a href={this.state.website}> Here</a>
                </b>
              </Typography>
              <br />
              <br />
              <Typography variant="h4">
                {/* <em>Season Statistics:</em>{' '} */}
                <em>
                  {this.state.statsSingleSeason.wins} -{' '}
                  {this.state.statsSingleSeason.losses} -{' '}
                  {this.state.statsSingleSeason.ot} ,{' '}
                  {this.state.statsSingleSeason.pts} points
                </em>
              </Typography>
              <br />
              <Typography variant="inherit">
                Goals / Game: <b>{this.state.teamStatsRanking.goalsPerGame}</b>{' '}
                - Goals Against / Game:{' '}
                <b>{this.state.teamStatsRanking.goalsAgainstPerGame}</b>
              </Typography>
              <br />
              <br />
              <Typography isFavorited={isFavorited}>{Button}</Typography>
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
