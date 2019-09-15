import React from 'react'
import '../index.css'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import { Typography, Card, CardContent } from '@material-ui/core'
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
                    border: '4px orange solid',
                    padding: '10px',
                  }}
                >
                  <CardContent>
                    <Typography variant="h4">
                      <em>
                        <center>{player.fullName}</center>
                      </em>
                    </Typography>
                    <br />
                    <PlayerCardContent
                      header="Current Team: "
                      description={player.currentTeam.name}
                    ></PlayerCardContent>
                    <Link to={`/player/${player.id}`}>General Info</Link>
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
