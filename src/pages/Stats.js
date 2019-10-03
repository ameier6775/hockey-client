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
import sortBy from 'lodash/sortBy'

class Stats extends React.Component {
  constructor() {
    super()
    this.handleSortTeam = this.handleSortTeam.bind(this)
    this.handleSortPlayer = this.handleSortPlayer.bind(this)
    this.state = {
      currentSortedBy: '',
      reversed: false,
      favTeams: [
        {
          division: '',
          favorite: false,
          goalsAgainstPerGameNums: '',
          goalsAgainstPerGameRank: '',
          goalsPerGameNums: '',
          goalsPerGameRank: '',
          id: '',
          lossNums: '',
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
          winNums: '',
        },
      ],
      favPlayers: [
        {
          favorite: false,
          assists: '',
          blocks: '',
          currentAge: '',
          fullName: '',
          gameWinningGoals: '',
          games: '',
          goals: '',
          hits: '',
          overTimeGoals: '',
          plusMinus: '',
          points: '',
          position: '',
          powerPlayGoals: '',
          powerPlayPoints: '',
          rookie: '',
          shootsCatches: '',
          shotPct: '',
          shots: '',
          timeOnIcePerGame: '',
        },
      ],
    }
  }

  handleSortTeam(e) {
    e.preventDefault()
    console.log(e.target)
    this.setState({
      favTeams: sortBy(this.state.favTeams, [e.target]),
    })
  }
  handleSortPlayer(e) {
    e.preventDefault()
    console.log(e.target)
    this.setState({
      favPlayers: sortBy(this.state.favPlayers, [e.target]),
    })
  }

  sortTeam(field) {
    switch (field) {
      case 'division':
      case 'favorite':
      case 'goalsAgainstPerGameNum':
      case 'goalsAgainstPerGameRank':
      case 'goalsPerGameNums':
      case 'goalsPerGameRank':
      case 'id':
      case 'lossNums':
      case 'name':
      case 'otNums':
      case 'powerPlayPct':
      case 'powerPlayRank':
      case 'penaltyKillPct':
      case 'penaltyKillRank':
      case 'ptsNums':
      case 'ptsRank':
      case 'savePctgRank':
      case 'shotsAllowedPerGameNums':
      case 'shotsPerGameNums':
      case 'winNums':
      default:
    }

    if (this.state.currentSortedBy && this.state.currentSortedBy === field) {
      if (!this.state.reversed) {
        this.setState({
          favTeams: sortBy(this.state.favTeams, field).reverse(),
          currentSortedBy: field,
          reversed: true,
        })
      } else {
        this.setState({
          favTeams: sortBy(this.state.favTeams, field),
          currentSortedBy: field,
          reversed: false,
        })
      }
    } else {
      this.setState({
        favTeams: sortBy(this.state.favTeams, field),
        currentSortedBy: field,
        reversed: false,
      })
    }
  }

  sortPlayer(field) {
    switch (field) {
      case 'assists':
      case 'blocks':
      case 'currentAge':
      case 'fullName:':
      case 'gameWinningGoals':
      case 'games':
      case 'goals':
      case 'hits':
      case 'overTimeGoals':
      case 'plusMinus':
      case 'points':
      case 'position':
      case 'powerPlayGoals':
      case 'powerPlayPoints':
      case 'rookie':
      case 'shootsCatches':
      case 'shotPct':
      case 'shots':
      case 'timeOnIcePerGame':
      default:
    }

    if (this.state.currentSortedBy && this.state.currentSortedBy === field) {
      if (!this.state.reversed) {
        this.setState({
          favPlayers: sortBy(this.state.favPlayers, field).reverse(),
          currentSortedBy: field,
          reversed: true,
        })
      } else {
        this.setState({
          favPlayers: sortBy(this.state.favPlayers, field),
          currentSortedBy: field,
          reversed: false,
        })
      }
    } else {
      this.setState({
        favPlayers: sortBy(this.state.favPlayers, field),
        currentSortedBy: field,
        reversed: false,
      })
    }
  }

  async componentDidMount() {
    const userData = await axios.get(`http://localhost:8080/user/id/teams`, {
      headers: {
        authorization: window.localStorage.getItem('auth'),
      },
    })
    this.setState({ favTeams: userData.data })

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
          {this.state.favTeams[0].id && (
            <Table
              key={this.state.favTeams}
              style={{
                width: '100%',
                marginTop: '10px',
                overflowX: 'auto',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell onClick={e => this.sortTeam('name')}>
                    <em>Name</em>
                  </TableCell>
                  <TableCell onClick={e => this.sortTeam('division')}>
                    <em>Division</em>
                  </TableCell>
                  <TableCell onClick={e => this.sortTeam('winNums')}>
                    <em>Record</em>
                  </TableCell>
                  <TableCell onClick={e => this.sortTeam('ptsNums')}>
                    <em>Points</em>
                  </TableCell>
                  <TableCell onClick={e => this.sortTeam('goalsPerGameNums')}>
                    <em>Goals/Game</em>
                  </TableCell>
                  <TableCell
                    onClick={e => this.sortTeam('goalsAgainstPerGameNums')}
                  >
                    <em>Goals Against/Game</em>
                  </TableCell>
                  <TableCell onClick={e => this.sortTeam('shotsPerGameNums')}>
                    <em>Shots/Game</em>
                  </TableCell>
                  <TableCell
                    onClick={e => this.sortTeam('shotsAllowedPerGameNums')}
                  >
                    <em>Shots Against/Game</em>
                  </TableCell>
                  <TableCell onClick={e => this.sortTeam('powerPlayPct')}>
                    <em>Power Play</em>
                  </TableCell>
                  <TableCell onClick={e => this.sortTeam('penaltyKillPct')}>
                    <em>Penalty Kill</em>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="center">
                {this.state.favTeams &&
                  this.state.favTeams.map(team => {
                    return (
                      <TableRow key={team.id}>
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
                          {team.goalsPerGameNums} ({team.goalsPerGameRank})
                        </TableCell>
                        <TableCell>
                          {team.goalsAgainstPerGameNums} (
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
              </TableBody>
            </Table>
          )}
          <br />
          <Table
            key={this.state.favPlayers}
            style={{
              width: '100%',
              marginTop: '10px',
              overflowX: 'auto',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell onClick={e => this.sortPlayer('fullName')}>
                  <em>Name</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('goals')}>
                  <em>Goals</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('assists')}>
                  <em>Assists</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('points')}>
                  <em>Points</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('plusMinus')}>
                  <em>+ / -</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('shootsCatches')}>
                  <em>Shoots</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('shotPct')}>
                  <em>Shooting %</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('timeOnIcePerGame')}>
                  <em>TOI</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('hits')}>
                  <em>Hits</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('blocks')}>
                  <em>Blocks</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('gameWinningGoals')}>
                  <em>GWG</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('powerPlayPoints')}>
                  <em>PPP</em>
                </TableCell>
                <TableCell onClick={e => this.sortPlayer('powerPlayGoals')}>
                  <em>PPG</em>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody align="center">
              {this.state.favPlayers &&
                this.state.favPlayers.map(player => {
                  return (
                    <TableRow key={player.id}>
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
