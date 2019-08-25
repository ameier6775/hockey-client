import React from 'react'
import '../index.css'
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
import Auth from '../components/Auth'

class Player extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      firstName: '',
      playerId: '',
      age: '',
      number: '',
      shoots: '',
      birthDate: '',
      birthCity: '',
      team: {
        name: '',
        id: '',
      },
      nationality: '',
      position: {
        name: '',
        shortName: '',
      },
      link: '',
      captain: false,
      alternate: false,
      height: '',
      weight: '',
      season: '',
    }
    this.favorite = this.favorite.bind(this)
  }
  favorite(e) {
    this.setState({
      favorite: !this.state.favorite,
    })
  }

  async componentDidMount() {
    const playersData = await axios.get(
      `http://localhost:8080/team/player/${this.props.match.params.id}`,
      {
        headers: { authorization: window.localStorage.getItem('auth') },
      }
    )
    console.log(playersData)
    const player = playersData.data.people[0]

    this.setState({
      name: player.fullName,
      firstName: player.firstName,
      playerId: player.id,
      age: player.currentAge,
      shoots: player.shootsCatches,
      number: player.primaryNumber,
      birthDate: player.birthDate,
      birthCity: player.birthCity,
      team: {
        name: player.currentTeam.name,
        id: player.currentTeam.id,
      },
      nationality: player.nationality,
      position: {
        name: player.primaryPosition.name,
        shortName: player.primaryPosition.abbreviation,
      },
      link: player.link,
      captain: player.captain,
      alternate: player.alternateCaptain,
      height: player.height,
      weight: player.weight,
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
              marginTop: 15,
              border: '4px solid orange',
              backgroundColor: 'white',
            }}
            elevation={10}
          >
            <Typography variant="h3">
              <center>
                <b>{this.state.name}'s Stats</b>
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
                <Typography align="center">
                  {this.state.favorite && (
                    <Icon fontSize="large" color="primary">
                      star
                    </Icon>
                  )}
                </Typography>
                <Typography variant="h3">
                  <center>
                    <b>#{this.state.number}</b>
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
                <Typography variant="subtitle1">
                  <b>Position: </b>{' '}
                  <div className="player-card-content">
                    <em>{this.state.position.shortName}</em>
                  </div>
                </Typography>
                <Typography variant="subtitle1">
                  <b>Team:</b>
                  <div className="player-card-content">
                    <em>{this.state.team.name}</em>
                  </div>
                </Typography>
                <Typography variant="subtitle1">
                  <b>Age:</b>{' '}
                  <div className="player-card-content">
                    <em>{this.state.age}</em>
                  </div>
                </Typography>
                <Typography variant="subtitle1">
                  <b>Physicality: </b>
                  <div className="player-card-content">
                    <em>
                      {this.state.height} {this.state.weight}
                    </em>
                  </div>
                </Typography>
                <Typography>
                  <b>Shoots: </b>
                  <div className="player-card-content">
                    <em>{this.state.shoots}</em>
                  </div>
                </Typography>
                <Typography variant="subtitle1">
                  <b>Nationality:</b>{' '}
                  <div className="player-card-content">
                    <em>{this.state.nationality}</em>
                  </div>
                </Typography>
                <Typography variant="subtitle1">
                  <b>From: </b>{' '}
                  <div className="player-card-content">
                    <em>{this.state.birthCity}</em>
                  </div>
                </Typography>
                <Typography align="center">
                  <Button color="primary" onClick={this.favorite}>
                    Favorite
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </center>
        </div>
      </Layout>
    )
  }
}

export default Auth(Player)
