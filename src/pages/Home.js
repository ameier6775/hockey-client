import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import Axios from 'axios'
import Layout from '../components/Layout'
import Auth from '../components/Auth'

class Home extends Component {
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
      divisons: [
        {
          division: {
            name: '',
            shortName: '',
          },
          teamRecords: {
            divisionRank: '',
            conferenceRank: '',
            leagueRank: '',
            leagueL10Rank: '',
            leagueHomeRank: '',
            leagueRoadRank: '',
            streak: {
              streakCode: '',
            },
            wildCardRank: '',
          },
        },
      ],
    }
  }

  async componentDidMount() {
    const userData = await Axios.get(`http://localhost:8080/user/id/teams`, {
      headers: {
        authorization: window.localStorage.getItem('auth'),
      },
    })
    const favTeams = userData.data
    this.setState({ favTeams: favTeams })

    const standingsData = await Axios.get(`http://localhost:8080/standings`, {
      headers: {
        authorization: window.localStorage.getItem('auth'),
      },
    })
    this.setState({ divisions: standingsData.data.records })
    console.log(this.state.divisions)
  }

  render() {
    return (
      <Layout>
        <div>
          {this.state.divisions &&
            this.state.divisions.map(division => {
              return (
                <Table
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    overflowX: 'auto',
                  }}
                  key={division.division.id}
                >
                  <TableHead
                    style={{ color: 'rgb(234, 140, 0)' }}
                    align="left"
                    component="h2"
                  >
                    <b>{division.division.name}</b>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      align="center"
                      style={{ color: 'rgb(234, 140, 0)' }}
                    >
                      <TableCell
                        align="center"
                        style={{ color: 'rgb(234, 140, 0)' }}
                      >
                        <b>
                          <em>#</em>
                        </b>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: 'rgb(234, 140, 0)' }}
                      >
                        <b>
                          <em>Team</em>
                        </b>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: 'rgb(234, 140, 0)' }}
                      >
                        <b>
                          <em>Points</em>
                        </b>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: 'rgb(234, 140, 0)' }}
                      >
                        <b>
                          <em>Games Played</em>
                        </b>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: 'rgb(234, 140, 0)' }}
                      >
                        <b>
                          <em>Goal Differential</em>
                        </b>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: 'rgb(234, 140, 0)' }}
                      >
                        <b>
                          <em>Streak</em>
                        </b>
                      </TableCell>
                    </TableRow>
                    {division.teamRecords.map(record => {
                      return (
                        <TableRow key={record.team.id} variant="body2">
                          <TableCell
                            align="center"
                            style={{ color: 'rgb(234, 140, 0)' }}
                          >
                            <b>{record.divisionRank}</b>
                          </TableCell>
                          <TableCell align="center">
                            <a
                              style={{ color: 'rgb(234, 140, 0)' }}
                              href={`/team/${record.team.id}`}
                            >
                              <b>{record.team.name}</b>
                            </a>
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: 'rgb(234, 140, 0)' }}
                          >
                            <b>{record.points}</b>
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: 'rgb(234, 140, 0)' }}
                          >
                            <b>{record.gamesPlayed}</b>
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: 'rgb(234, 140, 0)' }}
                          >
                            <b>{record.goalsScored - record.goalsAgainst}</b>
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ color: 'rgb(234, 140, 0)' }}
                          >
                            <b>{record.streak.streakCode}</b>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )
            })}
        </div>
      </Layout>
    )
  }
}

export default Auth(Home)
