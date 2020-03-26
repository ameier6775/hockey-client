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
import { VictoryPie, VictoryContainer } from 'victory'
import '../index.css'

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
          lastYearGoals: '',
          lastYearAssists: '',
          lastYearPoints: '',
          lastYearPowerPlayPoints: '',
          lastYearShotsOnGoal: '',
          lastYearPlusMinus: '',
          lastYearHits: '',
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
    console.log(favPlayers)
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
                  <TableCell
                    align="center"
                    style={{ color: 'rgb(234, 140, 0)' }}
                    onClick={e => this.sortTeam('name')}
                  >
                    <b>
                      <em>Name</em>
                    </b>
                  </TableCell>
                  {/* <TableCell
                    align="center"
                    style={{ color: 'rgb(234, 140, 0)' }}
                    onClick={e => this.sortTeam('division')}
                  >
                    <b>
                      <em>Division</em>
                    </b>
                  </TableCell> */}
                  <TableCell
                    align="center"
                    style={{ color: 'rgb(234, 140, 0)' }}
                    onClick={e => this.sortTeam('winNums')}
                  >
                    <b>
                      <em>Record</em>
                    </b>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: 'rgb(234, 140, 0)' }}
                    onClick={e => this.sortTeam('ptsNums')}
                  >
                    <b>
                      <em>Points</em>
                    </b>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: 'rgb(234, 140, 0)' }}
                    onClick={e => this.sortTeam('goalsPerGameNums')}
                  >
                    <b>
                      <em>Goals/Game</em>
                    </b>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: 'rgb(234, 140, 0)' }}
                    onClick={e => this.sortTeam('goalsAgainstPerGameNums')}
                  >
                    <b>
                      <em>Goals Against/Game</em>
                    </b>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: 'rgb(234, 140, 0)' }}
                    onClick={e => this.sortTeam('shotsPerGameNums')}
                  >
                    <b>
                      <em>Shots/Game</em>
                    </b>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: 'rgb(234, 140, 0)' }}
                    onClick={e => this.sortTeam('shotsAllowedPerGameNums')}
                  >
                    <b>
                      <em>Shots Against/Game</em>
                    </b>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: 'rgb(234, 140, 0)' }}
                    onClick={e => this.sortTeam('powerPlayPct')}
                  >
                    <b>
                      <em>Power Play</em>
                    </b>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: 'rgb(234, 140, 0)' }}
                    onClick={e => this.sortTeam('penaltyKillPct')}
                  >
                    <b>
                      <em>Penalty Kill</em>
                    </b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="center">
                {this.state.favTeams &&
                  this.state.favTeams.map(team => {
                    return (
                      <TableRow key={team.id}>
                        <TableCell align="center">
                          <b>
                            <a
                              style={{ color: 'rgb(234, 140, 0)' }}
                              href={`/team/${team.id}`}
                            >
                              {team.name}
                            </a>
                          </b>
                        </TableCell>
                        {/* <TableCell
                          align="center"
                          style={{ color: 'rgb(234, 140, 0)' }}
                        >
                          <b>{team.division}</b>
                        </TableCell> */}
                        <TableCell
                          align="center"
                          style={{ color: 'rgb(234, 140, 0)' }}
                        >
                          <b>
                            {team.winNums}-{team.lossNums}-{team.otNums}
                          </b>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: 'rgb(234, 140, 0)' }}
                        >
                          <b>
                            {team.ptsNums} ({team.ptsRank})
                          </b>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: 'rgb(234, 140, 0)' }}
                        >
                          <b>
                            {team.goalsPerGameNums} ({team.goalsPerGameRank})
                          </b>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: 'rgb(234, 140, 0)' }}
                        >
                          <b>
                            {team.goalsAgainstPerGameNums} (
                            {team.goalsAgainstPerGameRank})
                          </b>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: 'rgb(234, 140, 0)' }}
                        >
                          <b>{team.shotsPerGameNums}</b>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: 'rgb(234, 140, 0)' }}
                        >
                          <b>{team.shotsAllowedPerGameNums}</b>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: 'rgb(234, 140, 0)' }}
                        >
                          <b>
                            {team.powerPlayPct} ({team.powerPlayRank})
                          </b>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: 'rgb(234, 140, 0)' }}
                        >
                          <b>
                            {team.penaltyKillPct} ({team.penaltyKillRank})
                          </b>
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
                <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('fullName')}
                >
                  <b>
                    <em>Name</em>
                  </b>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('goals')}
                >
                  <b>
                    <em>Goals</em>
                  </b>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('assists')}
                >
                  <b>
                    <em>Assists</em>
                  </b>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('points')}
                >
                  <b>
                    <em>Points</em>
                  </b>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('plusMinus')}
                >
                  <b>
                    <em>+ / -</em>
                  </b>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('shots')}
                >
                  <b>
                    <em>Shots On Goal</em>
                  </b>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('timeOnIcePerGame')}
                >
                  <b>
                    <em>TOI</em>
                  </b>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('hits')}
                >
                  <b>
                    <em>Hits</em>
                  </b>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('blocks')}
                >
                  <b>
                    <em>Blocks</em>
                  </b>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('powerPlayPoints')}
                >
                  <b>
                    <em>PPP</em>
                  </b>
                </TableCell>
                {/* <TableCell
                  align="center"
                  style={{ color: 'rgb(234, 140, 0)' }}
                  onClick={e => this.sortPlayer('powerPlayGoals')}
                >
                  <b>
                    <em>PPG</em>
                  </b>
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody align="center">
              {this.state.favPlayers &&
                this.state.favPlayers.map(player => {
                  return (
                    // <div>
                    <TableRow style={{}} key={player.id}>
                      <TableCell align="center">
                        <a
                          style={{ color: 'rgb(234, 140, 0)' }}
                          href={`/player/${player.id}`}
                        >
                          <b>{player.fullName}</b>
                        </a>
                      </TableCell>
                      <TableCell
                        style={{ color: 'rgb(234, 140, 0)', align: 'center' }}
                      >
                        <b>{player.goals}</b>
                      </TableCell>
                      <TableCell
                        style={{ color: 'rgb(234, 140, 0)', align: 'center' }}
                      >
                        <b>{player.assists}</b>
                      </TableCell>
                      <TableCell
                        style={{ color: 'rgb(234, 140, 0)', align: 'center' }}
                      >
                        <b>{player.points}</b>
                      </TableCell>
                      <TableCell
                        style={{ color: 'rgb(234, 140, 0)', align: 'center' }}
                      >
                        <b>{player.plusMinus}</b>
                      </TableCell>
                      <TableCell style={{ color: 'rgb(234, 140, 0)' }}>
                        <b>{player.shots}</b>
                      </TableCell>
                      <TableCell style={{ color: 'rgb(234, 140, 0)' }}>
                        <b>{player.timeOnIcePerGame}</b>
                      </TableCell>
                      <TableCell style={{ color: 'rgb(234, 140, 0)' }}>
                        <b>{player.hits}</b>
                      </TableCell>
                      <TableCell style={{ color: 'rgb(234, 140, 0)' }}>
                        <b>{player.blocks}</b>
                      </TableCell>
                      <TableCell style={{ color: 'rgb(234, 140, 0)' }}>
                        <b>{player.powerPlayPoints}</b>
                      </TableCell>
                      <b>
                        <em></em>
                      </b>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
          {this.state.favPlayers &&
            this.state.favPlayers.map(player => {
              return (
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
                      <TableCell
                        align="right"
                        style={{ color: 'rgb(234, 140, 0)' }}
                        onClick={e => this.sortPlayer('fullName')}
                      >
                        <b>{player.fullName}</b>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ color: 'rgb(234, 140, 0)' }}>
                        <VictoryPie
                          // innerRadius={({ datum }) => datum.y * 0.8}
                          // cornerRadius={({ datum }) => datum.y * 0.35}
                          style={{
                            // width: '20%',
                            data: {
                              fillOpacity: 0.9,
                              stroke: '#f57c00',
                              strokeWidth: 3,
                            },
                            labels: {
                              fontSize: 15,
                              fill: '#f57c00',
                              fontWeight: 'bold',
                            },
                          }}
                          containerComponent={
                            <VictoryContainer
                              // padding={50}
                              width="300px"
                              height="250px"
                            />
                          }
                          colorScale={['696969']}
                          data={[
                            {
                              x: 1,
                              y: player.goals,
                              label: `${player.goals} G`,
                            },
                            {
                              x: 2,
                              y: player.assists,
                              label: `${player.assists} A`,
                            },
                            {
                              x: 3,
                              y: player.blocks,
                              label: `${player.blocks} B`,
                            },
                            {
                              x: 4,
                              y: player.hits,
                              label: `${player.hits} H`,
                            },
                            {
                              x: 5,
                              y: player.powerPlayPoints,
                              label: `${player.powerPlayPoints} PPP`,
                            },
                          ]}
                          events={[
                            {
                              childName: 'all',
                              target: 'data',
                              eventHandlers: {
                                onClick: () => {
                                  return [
                                    {
                                      target: 'data',
                                      mutation: ({ style }) => {
                                        return style.fill === '#f57c00'
                                          ? null
                                          : {
                                              style: {
                                                fill: '#f57c00',
                                              },
                                            }
                                      },
                                    },
                                    {
                                      target: 'labels',
                                      mutation: ({ text }) => {
                                        return text === 'selected'
                                          ? null
                                          : { text: 'selected' }
                                      },
                                    },
                                  ]
                                },
                              },
                            },
                          ]}
                        />
                      </TableCell>
                      <TableCell style={{ color: 'rgb(234, 140, 0)' }}>
                        <VictoryPie
                          // innerRadius={({ datum }) => datum.y * 0.8}
                          // cornerRadius={({ datum }) => datum.y * 0.35}
                          style={{
                            // width: '20%',
                            data: {
                              fillOpacity: 0.9,
                              stroke: '#f57c00',
                              strokeWidth: 3,
                            },
                            labels: {
                              fontSize: 15,
                              fill: '#f57c00',
                              fontWeight: 'bold',
                            },
                          }}
                          containerComponent={
                            <VictoryContainer
                              // padding={50}
                              width="300px"
                              height="250px"
                            />
                          }
                          colorScale={['696969']}
                          data={[
                            {
                              x: 1,
                              y: player.goals,
                              label: `${player.goals} G`,
                            },
                            {
                              x: 2,
                              y: player.assists,
                              label: `${player.assists} A`,
                            },
                            {
                              x: 3,
                              y: player.blocks,
                              label: `${player.blocks} B`,
                            },
                            {
                              x: 4,
                              y: player.hits,
                              label: `${player.hits} H`,
                            },
                            {
                              x: 5,
                              y: player.powerPlayPoints,
                              label: `${player.powerPlayPoints} PPP`,
                            },
                          ]}
                          events={[
                            {
                              childName: 'all',
                              target: 'data',
                              eventHandlers: {
                                onClick: () => {
                                  return [
                                    {
                                      target: 'data',
                                      mutation: ({ style }) => {
                                        return style.fill === '#f57c00'
                                          ? null
                                          : {
                                              style: {
                                                fill: '#f57c00',
                                              },
                                            }
                                      },
                                    },
                                    {
                                      target: 'labels',
                                      mutation: ({ text }) => {
                                        return text === 'selected'
                                          ? null
                                          : { text: 'selected' }
                                      },
                                    },
                                  ]
                                },
                              },
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              )
            })}
        </div>
      </Layout>
    )
  }
}

export default Auth(Stats)
