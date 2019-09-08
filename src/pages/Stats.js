import React from 'react'
import '../index.css'
import Layout from '../components/Layout'
import axios from 'axios'
import { Paper, Typography, Card, CardContent } from '@material-ui/core'
import Auth from '../components/Auth'
import PlayerCardContent from '../components/PlayerCardContent'

class Stats extends React.Component {
  constructor() {
    super()

    this.state = {
      favPlayers: [
        {
          userId: '',
          fullName: '',
          firstName: '',
          id: '',
          currentAge: '',
          primaryNumber: '',
          shootsCatches: '',
          birthDate: '',
          birthCity: '',
          currentTeam: {
            name: '',
            id: '',
          },
          nationality: '',
          primaryPosition: {
            name: '',
            abbreviation: '',
          },
          link: '',
          captain: false,
          alternateCaptain: false,
          height: '',
          weight: '',
        },
      ],
    }
  }

  async componentDidMount() {
    const userData = await axios.get(`http://localhost:8080/user/id/players`, {
      headers: { authorization: window.localStorage.getItem('auth') },
    })

    const favPlayers = []
    const userPlayers = userData.data

    await userPlayers.forEach(player => {
      const playerId = player.playerId
      const playersData = axios.get(
        `http://localhost:8080/team/player/${playerId}`,
        {
          headers: {
            authorization: window.localStorage.getItem('auth'),
          },
        }
      )
      playersData.then(response => {
        const player = response.data.people[0]
        favPlayers.push(player)
        this.setState({ favPlayers: favPlayers })
      })
    })
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
          {this.state.favPlayers &&
            this.state.favPlayers.map(player => {
              return (
                <Card
                  key={player.id}
                  style={{
                    width: '400px',
                    margin: '10px',
                    textAlign: 'left',
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">
                      <center>{player.fullName}</center>
                    </Typography>
                    <Typography
                      style={{
                        textAlign: 'center',
                        marginTop: '30px',
                      }}
                    >
                      <a href={player.link}>Website</a>
                    </Typography>
                    {/* <Link to={`/team/player/${player.id}`}>View Player</Link> */}
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </Layout>
    )
  }
}
export default Auth(Stats)
