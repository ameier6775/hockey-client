import React from 'react'
import { AppBar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default props => (
  <div>
    <AppBar className="orange">
      <Link className="nav-item" to="/">
        <Typography className="gray" gutterBottom variant="h6">
          Home
        </Typography>
      </Link>
      <Link className="nav-item" to="/teams">
        <Typography className="gray" gutterBottom variant="h6">
          Teams
        </Typography>
      </Link>
      <Link className="nav-item" to="/stats">
        <Typography className="gray" gutterBottom variant="h6">
          Stats
        </Typography>
      </Link>
      <Link className="nav-item" to="/login">
        <Typography className="gray" gutterBottom variant="h6">
          Login
        </Typography>
      </Link>
      <Link className="nav-item" to="/signup">
        <Typography className="gray" gutterBottom variant="h6">
          Sign Up
        </Typography>
      </Link>
    </AppBar>
    <div
      style={{
        background: '#696969',
        paddingTop: '70px',
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '600px',
      }}
    >
      {props.children}
    </div>
  </div>
)
