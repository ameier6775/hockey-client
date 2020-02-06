import React from 'react'
import { Typography, Button, TextField, CardActions } from '@material-ui/core'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import UserCard from '../components/UserCard'
import Layout from '../components/Layout'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const useStyles = () =>
  makeStyles({
    root: {
      color: 'rbg(234, 140, 0)',
    },
  })
class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      verifyPassword: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault()
    if (this.state.userName.length < 3 && this.state.password.length < 3) {
      window.alert('Username & password must be at least three characters long')
    } else if (this.state.userName.length < 3) {
      window.alert('Username must be at least three characters long')
    } else if (this.state.password.length < 3) {
      window.alert('Password must be at least three characters long')
    } else if (this.state.password !== this.state.verifyPassword) {
      window.alert('Passwords do not match')
    } else {
      await Axios.post(`http://localhost:8080/signup`, {
        userName: this.state.userName,
        password: this.state.password,
      })
      let path = '/login'
      this.props.history.push(path)
    }
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const classes = useStyles()
    return (
      <Layout>
        <UserCard header="SIGN UP">
          {' '}
          <TextField
            autoFocus
            className={classes.root}
            fullWidth
            margin="normal"
            label="Username"
            onChange={this.handleChange}
            name="userName"
            type="text"
            placeholder="userName"
            variant="outlined"
            color="inherit"
          ></TextField>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            onChange={this.handleChange}
            name="password"
            type="password"
            placeholder="password"
            variant="outlined"
            color="inherit"
          ></TextField>
          <TextField
            margin="normal"
            fullWidth
            label="Verify Password"
            onChange={this.handleChange}
            name="verifyPassword"
            type="password"
            placeholder="verify"
            variant="outlined"
            color="inherit"
            style={{
              paddingBottom: '10px',
            }}
          ></TextField>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              size="large"
              style={{
                justifyContent: 'center',
              }}
              variant="outlined"
              onClick={this.handleSubmit}
              color="inherit"
            >
              <b>
                <em>SIGN UP</em>
              </b>
              <PersonAddIcon
                style={{
                  paddingLeft: '10px',
                }}
              ></PersonAddIcon>
            </Button>
          </CardActions>
          <Typography align="center" style={{ paddingTop: '10px' }}>
            Already have an account?{' '}
            <Link className="orange" to={`/login`}>
              <b>
                <em>LOGIN</em>
              </b>
            </Link>
          </Typography>
        </UserCard>
      </Layout>
    )
  }
}
export default User
