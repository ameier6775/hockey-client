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
import PlayerCardContent from '../components/PlayerCardContent'

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
              padding: '15px',
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
                <PlayerCardContent
                  header="Position: "
                  description={this.state.position.shortName}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="Team: "
                  description={this.state.team.name}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="Age: "
                  description={this.state.age}
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
                  description={this.state.shoots}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="Nationality: "
                  description={this.state.nationality}
                ></PlayerCardContent>
                <PlayerCardContent
                  header="From: "
                  description={this.state.birthCity}
                ></PlayerCardContent>

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
