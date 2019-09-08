import React, { Component } from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import Axios from 'axios'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import Auth from '../components/Auth'

class Teams extends Component {
  constructor() {
    super()
    this.state = {
      data: [
        {
          id: '',
          name: '',
          conference: {
            name: '',
          },
          venue: {
            name: '',
          },
          officialSiteUrl: '',
        },
      ],
    }
  }

  async componentDidMount() {
    const data = await Axios.get('http://localhost:8080/teams', {
      headers: { authorization: window.localStorage.getItem('auth') },
    })
    this.setState({ data: data.data.teams })
    // console.log(this.state.data)
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
          {this.state.data &&
            this.state.data.map(team => {
              return (
                <Card
                  key={team.id}
                  style={{
                    width: '400px',
                    margin: '10px',
                    textAlign: 'left',
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">
                      <center>{team.name}</center>
                    </Typography>
                    <Typography
                      style={{
                        textAlign: 'center',
                        marginTop: '30px',
                      }}
                    >
                      <a href={team.officialSiteUrl}>Website</a>
                    </Typography>
                    <Link to={`/team/${team.id}`}>View Team</Link>
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </Layout>
    )
  }
}

export default Auth(Teams)
