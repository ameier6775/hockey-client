import React from 'react'
import '../index.css'
import Layout from '../components/Layout'
import { Paper, Typography } from '@material-ui/core'

// const homeStyle = {
//   border: '5px dashed yellow;',
// }

export default () => {
  return (
    <Layout>
      <Paper className="home-sweet-home">
        <center>
          <Typography variant="h2">HOME PAGE</Typography>
        </center>
      </Paper>
    </Layout>
  )
}
