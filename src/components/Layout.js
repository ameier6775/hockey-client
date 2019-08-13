import React from 'react'
import { AppBar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default props => (
  <div>
    <AppBar>
      <ul className="nav-bar">
        <li className="nav-item">
          <Link className="nav-item" to="/">
            <Typography gutterBottom variant="body1">
              Home
            </Typography>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-item" to="/teams">
            <Typography gutterBottom variant="body1">
              Teams
            </Typography>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-item" to="/stats">
            <Typography gutterBottom variant="body1">
              Stats
            </Typography>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-item" to="/login">
            <Typography gutterBottom variant="body1">
              Login
            </Typography>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-item" to="/signup">
            <Typography gutterBottom variant="body1">
              Sign Up
            </Typography>
          </Link>
        </li>
      </ul>
    </AppBar>
    <div
      style={{
        height: '85%',
        width: '100%',
        overflow: 'auto',
        position: 'fixed',
        bottom: 0,
      }}
    >
      {props.children}
    </div>
  </div>
)
