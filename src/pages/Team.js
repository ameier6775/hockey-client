import React from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Paper, Typography, Card, CardContent, Icon } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Auth from '../components/Auth'
import FavButton from '../components/FavButton'
import UnfavButton from '../components/UnfavButton'
import '../index.css'

class Team extends React.Component {
  constructor(props) {
    super(props)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleUnfavorite = this.handleUnfavorite.bind(this)

    this.state = {
      faceOffsRank: '',
      goalsAgainstPerGame: '',
      goalsAgainstPerGameRank: '',
      goalsPerGame: '',
      goalsPerGameRank: '',
      losses: '',
      lossesRank: '',
      otl: '',
      penaltyKillRank: '',
      powerPlayRank: '',
      points: '',
      pointsRank: '',
      shotsAllowedPerGame: '',
      shotsPerGame: '',
      venue: '',
      wins: '',
      winsRank: '',
      favorite: '',
      id: '',
      userId: '',
      division: '',
      teamStart: '',
      name: '',
      location: '',
      roster: [
        {
          id: '',
          fullName: '',
          jerseyNumber: '',
          person: {
            fullName: '',
            id: '',
            link: '',
          },
          position: {
            abbreviation: '',
            code: '',
            name: '',
            type: '',
          },
        },
      ],
    }
  }

  async handleFavorite(e) {
    e.preventDefault()
    this.setState({
      favorite: true,
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
  }
  async handleUnfavorite(e) {
    e.preventDefault()
    this.setState({
      favorite: false,
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
  }

  async componentDidMount() {
    const userData = await axios.get(`http://localhost:8080/user/id`, {
      headers: { authorization: window.localStorage.getItem('auth') },
    })
    const userId = userData.data.userId
    this.setState({
      userId: userId,
    })

    const data = await axios.get(
      `http://localhost:8080/team/${this.props.match.params.id}`,
      {
        headers: { authorization: window.localStorage.getItem('auth') },
      }
    )
    const team = data.data
    console.log(team)

    this.setState({
      favorite: team.favorite,
      faceOffsRank: team.faceOffsRank,
      goalsAgainstPerGame: team.goalsAgainstPerGameNums,
      goalsAgainstPerGameRank: team.goalsAgainstPerGameRank,
      goalsPerGame: team.goalsPerGameNums,
      goalsPerGameRank: team.goalsPerGameRank,
      losses: team.lossNums,
      lossesRank: team.lossesRank,
      otl: team.otNums,
      penaltyKillRank: team.penaltyKillRank,
      powerPlayRank: team.powerPlayRank,
      points: team.ptsNums,
      pointsRank: team.ptsRank,
      shotsAllowedPerGame: team.shotsAllowedPerGameNums,
      shotsPerGame: team.shotsPerGameNums,
      venue: team.venue,
      wins: team.winNums,
      winsRank: team.winsRank,
      id: team.id,
      division: team.division,
      teamStart: team.firstYearOfPlay,
      name: team.name,
      roster: team.roster,
    })
  }

  render() {
    const favorite = this.state.favorite
    let Button

    if (favorite) {
      Button = <UnfavButton onClick={this.handleUnfavorite} />
    } else {
      Button = <FavButton onClick={this.handleFavorite} />
    }

    const data = [{ gf: 1, ga: 13000 }, { gf: 2, ga: 19000 }]

    return (
      // <Auth>
      <Layout>
        <div>
          <Paper
            style={{
              position: '-webkit-sticky',
              top: 0,
              color: 'rgb(234, 140, 0)',
              backgroundColor: '#696969',
            }}
            elevation={10}
          >
            <center>
              <Typography name="favoriteTeam">
                {this.state.favorite && <Icon fontSize="large">star</Icon>}
              </Typography>
              <br />
              <Typography variant="h2">
                <b>{this.state.name.toUpperCase()}</b>
              </Typography>
              <br />
              <Typography variant="h4">
                <em>{this.state.division} Division</em>
              </Typography>
              <Typography variant="h6">
                <b>EST: {this.state.teamStart}</b>
              </Typography>

              <Typography variant="overline">
                <b>
                  <em>{this.state.venue}</em>
                </b>
              </Typography>

              <br />
              <Typography variant="h5">
                <b>
                  {this.state.wins} - {this.state.losses} - {this.state.otl} ,{' '}
                  {this.state.points} points
                </b>
              </Typography>
              <br />
              <Typography favorite={favorite}>{Button}</Typography>
            </center>
          </Paper>
          <Paper
            elevation={4}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              backgroundColor: '#696969',
              border: '4px solid rgb(234, 140, 0)',
            }}
          >
            {this.state.roster.map(player => {
              return (
                <Card
                  style={{
                    width: '400px',
                    margin: '10px',
                    textAlign: 'left',
                    backgroundColor: '#696969',
                    border: '2px solid rgb(234, 140, 0)',
                    color: 'rgb(234, 140, 0)',
                  }}
                  key={player.person.id}
                >
                  <CardContent>
                    <Typography align="center" variant="h5">
                      {' '}
                      <b>{player.person.fullName}</b>
                    </Typography>
                    <Typography variant="h5" align="center">
                      <b>#{player ? player.jerseyNumber : ''}</b>
                    </Typography>
                    <Typography>
                      <Link to={`/player/${player.person.id}`}>Stats</Link>
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

export default Auth(Team)
