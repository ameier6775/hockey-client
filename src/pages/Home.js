import React from 'react'
import '../index.css'
import Layout from '../components/Layout'
import { Paper, Typography } from '@material-ui/core'
import Auth from '../components/Auth'

const Home = () => {
  return (
    <Layout>
      <Paper>
        <center>
          <Typography variant="h1">HOME PAGE</Typography>
        </center>
      </Paper>
    </Layout>
  )
}

export default Auth(Home)
