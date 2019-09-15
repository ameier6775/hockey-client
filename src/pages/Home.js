import React, { Component } from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
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
          penaltyKillRank: '',
          powerPlayRank: '',
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
    }
  }

  async componentDidMount() {
    const userData = await Axios.get(`http://localhost:8080/user/id/teams`, {
      headers: {
        authorization: window.localStorage.getItem('auth'),
      },
    })
    const favTeams = userData.data
    console.log(favTeams)
    this.setState({ favTeams: favTeams })
  }
  render() {
    return (
      <Layout>
        <div>
          {this.state.favTeams &&
            this.state.favTeams.map(team => {
              return (
                <Card
                  style={{
                    width: '400px',
                    margin: '10px',
                    textAlign: 'left',
                  }}
                  key={team.id}
                >
                  <CardContent align="center">
                    <Typography variant="h4">{team.name}</Typography>
                    <Typography variant="overline">{team.division}</Typography>
                    <br />
                    <Typography variant="body1">
                      <b>
                        {team.winNums} - {team.lossNums} - {team.otNums}
                        <br /> {team.ptsNums} points
                      </b>{' '}
                      <em>({team.ptsRank})</em>
                    </Typography>
                    <Typography variant="caption">
                      <br />
                      Goals/Game: <b>+ {team.goalsPerGameNums}</b> (
                      <em>{team.goalsPerGameRank}</em>){' '}
                      <b>- {team.goalsAgainstPerGameNums}</b> (
                      <em>{team.goalsAgainstPerGameRank}</em>)
                    </Typography>
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </Layout>
    )
  }
}

export default Auth(Home)
