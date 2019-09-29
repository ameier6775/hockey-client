import React from 'react'
import '../index.css'
import Layout from '../components/Layout'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import Auth from '../components/Auth'

class Stats extends React.Component {
  constructor() {
    super()
    this.state = {
      favTeams: [
        {
          division: '',
          faceOffsRank: '',
          favorite: false,
          firstYearOfPlay: '',
          goalsAgainstPerGameNums: '',
          goalsAgainstPerGameRank: '',
          goalsPerGameNums: '',
          goalsPerGameRank: '',
          id: '',
          lossNums: '',
          lossesRank: '',
          name: '',
          otNums: '',
          powerPlayPct: '',
          powerPlayRank: '',
          penaltyKillPct: '',
          penaltyKillRank: '',
          ptsNums: '',
          ptsRank: '',
          savePctgRank: '',
          roster: [
            {
              id: '',
              fullName: '',
              link: '',
            },
          ],
          shotsAllowedPerGameNums: '',
          shotsPerGameNums: '',
          shotsPerGameRank: '',
          venue: '',
          winNums: '',
          winsRank: '',
        },
      ],
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
    const userData = await axios.get(`http://localhost:8080/user/id/teams`, {
      headers: {
        authorization: window.localStorage.getItem('auth'),
      },
    })
    const favTeams = userData.data
    this.setState({ favTeams: favTeams })

    const favPlayers = await axios.get(
      `http://localhost:8080/user/id/players`,
      {
        headers: { authorization: window.localStorage.getItem('auth') },
      }
    )
    this.setState({
      favPlayers: favPlayers.data,
    })
  }

  render() {
    return (
      <Layout>
        <div>
          <Table
            style={{
              width: '100%',
              marginTop: '10px',
              overflowX: 'auto',
            }}
            key={this.state.favTeams}
          >
            <TableHead component="h2">
              <b>Favorite Teams</b>
            </TableHead>
            <TableRow>
              <TableCell>
                <em>Team</em>
              </TableCell>
              <TableCell>
                <em>Division</em>
              </TableCell>
              <TableCell>
                <em>Record</em>
              </TableCell>
              <TableCell>
                <em>Points</em>
              </TableCell>
              <TableCell>
                <em>Goals/Game</em>
              </TableCell>
              <TableCell>
                <em>Goals Against/Game</em>
              </TableCell>
              <TableCell>
                <em>Shots/Game</em>
              </TableCell>
              <TableCell>
                <em>Shots Against/Game</em>
              </TableCell>
              <TableCell>
                <em>Power Play</em>
              </TableCell>
              <TableCell>
                <em>Penalty Kill</em>
              </TableCell>
            </TableRow>
            {this.state.favTeams &&
              this.state.favTeams.map(team => {
                return (
                  <TableRow>
                    <TableCell>
                      <a href={`/team/${team.id}`}>{team.name}</a>
                    </TableCell>
                    <TableCell>{team.division}</TableCell>
                    <TableCell>
                      {team.winNums}-{team.lossNums}-{team.otNums}
                    </TableCell>
                    <TableCell>
                      {team.ptsNums} ({team.ptsRank})
                    </TableCell>
                    <TableCell>
                      {team.goalsPerGameNums} ({team.goalsAgainstPerGameRank})
                    </TableCell>
                    <TableCell>
                      {team.goalsAgainstPerGameNums}(
                      {team.goalsAgainstPerGameRank})
                    </TableCell>
                    <TableCell>{team.shotsPerGameNums}</TableCell>
                    <TableCell>{team.shotsAllowedPerGameNums}</TableCell>
                    <TableCell>
                      {team.powerPlayPct} ({team.powerPlayRank})
                    </TableCell>
                    <TableCell>
                      {team.penaltyKillPct} ({team.penaltyKillRank})
                    </TableCell>
                  </TableRow>
                )
              })}
          </Table>
          <br />
          <Table
            key={this.state.favPlayers}
            style={{
              marginTop: '10px',
            }}
          >
            <TableHead component="h2">Favorite Players</TableHead>
            <TableBody align="center">
              <TableRow>
                <TableCell>
                  <em>Name</em>
                </TableCell>
                <TableCell>
                  <em>Goals</em>
                </TableCell>
                <TableCell>
                  <em>Assists</em>
                </TableCell>
                <TableCell>
                  <em>Points</em>
                </TableCell>
                <TableCell>
                  <em>+ / -</em>
                </TableCell>
                <TableCell>
                  <em>Shoots</em>
                </TableCell>
                <TableCell>
                  <em>Shooting %</em>
                </TableCell>
                <TableCell>
                  <em>TOI</em>
                </TableCell>
                <TableCell>
                  <em>Hits</em>
                </TableCell>
                <TableCell>
                  <em>Blocks</em>
                </TableCell>
                <TableCell>
                  <em>GWG</em>
                </TableCell>
                <TableCell>
                  <em>PPP</em>
                </TableCell>
                <TableCell>
                  <em>PPG</em>
                </TableCell>
              </TableRow>
              {this.state.favPlayers &&
                this.state.favPlayers.map(player => {
                  return (
                    <TableRow>
                      <TableCell>
                        <a href={`/player/${player.id}`}>{player.fullName}</a>
                      </TableCell>
                      <TableCell>{player.goals}</TableCell>
                      <TableCell>{player.assists}</TableCell>
                      <TableCell>{player.points}</TableCell>
                      <TableCell>{player.plusMinus}</TableCell>
                      <TableCell>{player.shootsCatches}</TableCell>
                      <TableCell>{player.shotPct}%</TableCell>
                      <TableCell>{player.timeOnIcePerGame}</TableCell>
                      <TableCell>{player.hits}</TableCell>
                      <TableCell>{player.blocks}</TableCell>
                      <TableCell>{player.gameWinningGoals}</TableCell>
                      <TableCell>{player.powerPlayPoints}</TableCell>
                      <TableCell>{player.powerPlayGoals}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
      </Layout>
    )
  }
}

export default Auth(Stats)
