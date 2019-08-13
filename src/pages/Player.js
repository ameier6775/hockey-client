import React from 'react'
import '../index.css'
import Layout from '../components/Layout'
import axios from 'axios'
import { Paper, Typography, Card, CardContent } from '@material-ui/core'

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
  }

  async componentDidMount() {
    const playersData = await axios.get(
      `http://localhost:8080/team/player/${this.props.match.params.id}`
    )
    console.log(playersData)
    const player = playersData.data.people[0]
    // const player = playersData.data.people[0]

    // console.log(playersData.data.people[0].fullName)

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
              color: 'orange',
              backgroundColor: 'black',
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
                backgroundColor: 'black',
                border: '5px solid orange',
              }}
              key={this.state.fullName}
            >
              <CardContent
                style={{
                  textAlign: 'left',
                }}
              >
                <Typography className="orange" variant="h3">
                  <center>
                    <b>#{this.state.number}</b>
                  </center>
                </Typography>
                <Typography className="orange" variant="h6">
                  <center>
                    <b>
                      {this.state.captain ? 'Captain' : ''}
                      {this.state.alternate ? 'Assistant Captain' : ''}
                    </b>
                  </center>
                </Typography>
                <Typography className="orange" variant="subtitle1">
                  <b>Position: </b>{' '}
                  <div className="player-card-content">
                    <em>{this.state.position.shortName}</em>
                  </div>
                </Typography>
                <Typography className="orange" variant="subtitle1">
                  <b>Team:</b>
                  <div className="player-card-content">
                    <em>{this.state.team.name}</em>
                  </div>
                </Typography>
                <Typography className="orange" variant="subtitle1">
                  <b>Age:</b>{' '}
                  <div className="player-card-content">
                    <em>{this.state.age}</em>
                  </div>
                </Typography>
                <Typography className="orange" variant="subtitle1">
                  <b>Physicality: </b>
                  <div className="player-card-content">
                    <em>
                      {this.state.height} {this.state.weight}
                    </em>
                  </div>
                </Typography>
                <Typography className="orange">
                  <b>Shoots: </b>
                  <div className="player-card-content">
                    <em>{this.state.shoots}</em>
                  </div>
                </Typography>
                <Typography className="orange" variant="subtitle1">
                  <b>Nationality:</b>{' '}
                  <div className="player-card-content">
                    <em>{this.state.nationality}</em>
                  </div>
                </Typography>
                <Typography className="orange" variant="subtitle1">
                  <b>From: </b>{' '}
                  <div className="player-card-content">
                    <em>{this.state.birthCity}</em>
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </center>
        </div>
      </Layout>
    )
  }
}

export default Player
