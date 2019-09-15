import React from 'react'
import '../index.css'
import Layout from '../components/Layout'
import axios from 'axios'
import { Paper, Typography, Card, CardContent, Icon } from '@material-ui/core'
import Auth from '../components/Auth'
import PlayerCardContent from '../components/PlayerCardContent'
import FavButton from '../components/FavButton'
import UnfavButton from '../components/UnfavButton'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.handleUnfavorite = this.handleUnfavorite.bind(this)

    this.state = {
      favorite: false,
      userId: '',
      alternateCaptain: '',
      assists: '',
      birthCity: '',
      birthDate: '',
      birthCountry: '',
      birthStateProvince: '',
      blocks: '',
      captain: '',
      currentAge: '',
      currentTeam: '',
      fullName: '',
      gameWinningGoals: '',
      games: '',
      goals: '',
      height: '',
      hits: '',
      id: '',
      nationality: '',
      overTimeGoals: '',
      penaltyMinutes: '',
      pim: '',
      plusMinus: '',
      points: '',
      position: '',
      primaryNumber: '',
      powerPlayGoals: '',
      powerPlayPoints: '',
      rookie: '',
      shootsCatches: '',
      shortHandedGoals: '',
      shortHandedPoints: '',
      shotPct: '',
      shots: '',
      timeOnIcePerGame: '',
      weight: '',
    }
  }
  async handleFavorite(e) {
    e.preventDefault()
    this.setState({
      favorite: true,
    })
    await axios.post(
      `http://localhost:8080/user/player`,
      {
        userId: this.state.userId,
        playerId: this.state.id,
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
      `http://localhost:8080/user/player/delete`,
      {
        userId: this.state.userId,
        playerId: this.state.id,
      },
      { headers: { authorization: window.localStorage.getItem('auth') } },
      console.log('unfavorited')
    )
    // let path = '/teams'
    // this.props.history.push(path)
  }

  async componentDidMount() {
    const playerData = await axios.get(
      `http://localhost:8080/user/player/${this.props.match.params.id}/stats`,
      {
        headers: { authorization: window.localStorage.getItem('auth') },
      }
    )
    const userData = await axios.get(`http://localhost:8080/user/id`, {
      headers: { authorization: window.localStorage.getItem('auth') },
    })
    const userId = userData.data.userId

    const player = playerData.data

    console.log(player)

    this.setState({
      userId: userId,
      favorite: player.favorite,
      alternateCaptain: player.alternateCaptain,
      assists: player.assists,
      birthCity: player.birthCity,
      birthDate: player.birthDate,
      birthCountry: player.birthCountry,
      birthStateProvince: player.birthStateProvince,
      blocks: player.blocks,
      captain: player.captain,
      currentAge: player.currentAge,
      currentTeam: player.currentTeam,
      fullName: player.fullName,
      gameWinningGoals: player.gameWinningGoals,
      games: player.games,
      goals: player.goals,
      height: player.height,
      hits: player.hits,
      id: player.id,
      nationality: player.nationality,
      overTimeGoals: player.overTimeGoals,
      penaltyMinutes: player.penaltyMinutes,
      pim: player.pim,
      plusMinus: player.plusMinus,
      points: player.points,
      position: player.position,
      primaryNumber: player.primaryNumber,
      powerPlayGoals: player.powerPlayGoals,
      powerPlayPoints: player.powerPlayPoints,
      rookie: player.rookie,
      shootsCatches: player.shootsCatches,
      shortHandedGoals: player.shortHandedGoals,
      shortHandedPoints: player.shortHandedPoints,
      shotPct: player.shotPct,
      shots: player.shots,
      timeOnIcePerGame: player.timeOnIcePerGame,
      weight: player.weight,
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

    return (
      <Layout>
        <div>
          <Paper
            style={{
              position: '-webkit-sticky',
              top: 0,
              marginTop: 15,
              border: '4px solid orange',
              backgroundColor: 'white',
              padding: '15px',
            }}
            elevation={10}
          >
            <Typography variant="h3">
              <center>
                <b>{this.state.fullName}'s Stats</b>
              </center>
            </Typography>
          </Paper>
          <center>
            <Card
              style={{
                width: '400px',
                margin: '10px',
                backgroundColor: 'white',
                border: '5px solid orange',
              }}
              key={this.state.fullName}
            >
              <CardContent
                style={{
                  textAlign: 'left',
                }}
              >
                <Typography align="center" name="favoritePlayer">
                  {this.state.favorite && (
                    <Icon fontSize="large" color="primary">
                      star
                    </Icon>
                  )}
                </Typography>
                <Typography variant="h3">
                  <center>
                    <b>#{this.state.primaryNumber}</b>
                  </center>
                </Typography>
                <Typography variant="h6">
                  <center>
                    <b>
                      {this.state.captain ? 'Captain' : ''}
                      {this.state.alternate ? 'Assistant Captain' : ''}
                    </b>
                  </center>
                </Typography>
                <PlayerCardContent
                  header="Position: "
                  description={this.state.position}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="Team: "
                  description={this.state.currentTeam}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="Age: "
                  description={this.state.currentAge}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="Height: "
                  description={this.state.height}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="Weight: "
                  description={this.state.weight}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="Shoots: "
                  description={this.state.shootsCatches}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="Nationality: "
                  description={this.state.nationality}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="From: "
                  description={this.state.birthCity}
                ></PlayerCardContent>
                <br />
                <center>{Button}</center>
              </CardContent>
            </Card>
          </center>
        </div>
      </Layout>
    )
  }
}
export default Auth(Player)
