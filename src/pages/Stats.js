import React from 'react'
import '../index.css'
import Layout from '../components/Layout'
import axios from 'axios'
import { Typography, Card, CardContent } from '@material-ui/core'
import Auth from '../components/Auth'
import PlayerStat from '../components/PlayerStat'

class Stats extends React.Component {
  constructor() {
    super()
    this.state = {
      favPlayers: [
        {
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
        },
      ],
    }
  }

  async componentDidMount() {
    const favPlayers = await axios.get(
      `http://localhost:8080/user/id/players`,
      {
        headers: { authorization: window.localStorage.getItem('auth') },
      }
    )
    this.setState({
      favPlayers: favPlayers.data,
    })
    console.log(favPlayers.data)
  }

  render() {
    return (
      <Layout>
        {this.state.favPlayers &&
          this.state.favPlayers.map(player => {
            return (
              <Card
                key={player.id}
                style={{
                  margin: '10px',
                  display: 'flex',
                  marginTop: '10px',
                  marginBottom: '10px',
                  flexWrap: 'wrap',
                  width: '100vw',
                  height: 'auto',
                }}
              >
                <CardContent align="center">
                  <Typography align="center" variant="h5">
                    {player.fullName}
                  </Typography>
                  <PlayerStat
                    statName="Goals: "
                    stat={player.goals}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="Assists: "
                    stat={player.assists}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="Points: "
                    stat={player.points}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="+ / - : "
                    stat={player.goals}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="Shots: "
                    stat={player.shots}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="Shooting: "
                    stat={player.shotPct + '%'}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="TOI / Game: "
                    stat={player.timeOnIcePerGame}
                  ></PlayerStat>
                  <br />
                  <PlayerStat statName="Hits: " stat={player.hits}></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="Blocks: "
                    stat={player.blocks}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="Game Winning Goals: "
                    stat={player.gameWinningGoals}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="PP Points: "
                    stat={player.powerPlayPoints}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="PP Goals: "
                    stat={player.powerPlayGoals}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="SH Points: "
                    stat={player.shortHandedPoints}
                  ></PlayerStat>
                  <br />
                  <PlayerStat
                    statName="SH Goals: "
                    stat={player.shortHandedGoals}
                  ></PlayerStat>
                </CardContent>
              </Card>
            )
          })}
      </Layout>
    )
  }
}

export default Auth(Stats)
