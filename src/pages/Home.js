import React, { Component } from 'react'
import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import Axios from 'axios'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
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
                  <TableHead align="left" component="h2">
                    <b>{division.division.name}</b>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <em>#</em>
                      </TableCell>
                      <TableCell>
                        <em>Team</em>
                      </TableCell>
                      <TableCell>
                        <em>Points</em>
                      </TableCell>
                      <TableCell>
                        <em>Games Played</em>
                      </TableCell>
                      <TableCell>
                        <em>Goal Differential</em>
                      </TableCell>
                      <TableCell>
                        <em>Streak</em>
                      </TableCell>
                    </TableRow>
                    {division.teamRecords.map(record => {
                      return (
                        <TableRow key={record.team.id} variant="body2">
                          <TableCell>{record.divisionRank}</TableCell>
                          <TableCell>
                            <a href={`/team/${record.team.id}`}>
                              {record.team.name}
                            </a>
                          </TableCell>
                          <TableCell>{record.points}</TableCell>
                          <TableCell>{record.gamesPlayed}</TableCell>
                          <TableCell>
                            {record.goalsScored - record.goalsAgainst}
                          </TableCell>
                          <TableCell>{record.streak.streakCode}</TableCell>
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
