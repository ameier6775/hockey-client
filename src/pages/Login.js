import React from 'react'
import { Typography, Button, TextField, CardActions } from '@material-ui/core'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import UserCard from '../components/UserCard'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = { userName: '', password: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  async handleLogin(e) {
    e.preventDefault()
    const response = await Axios.post(`http://localhost:8080/login`, {
      userName: this.state.userName,
      password: this.state.password,
    })
    window.localStorage.setItem('auth', response.headers.authorization)
    let path = '/teams'
    this.props.history.push(path)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Layout>
        <UserCard header="LOGIN">
          {' '}
          <TextField
            color="blue"
            autoFocus
            fullWidth
            margin="normal"
            label="Username"
            name="userName"
            type="text"
            onChange={this.handleChange}
            placeholder="userName"
            variant="outlined"
          ></TextField>
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            onChange={this.handleChange}
            placeholder="password"
            variant="outlined"
            style={{
              paddingBottom: '10px',
            }}
          ></TextField>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              size="large"
              variant="outlined"
              onClick={this.handleLogin}
              color="inherit"
            >
              <b>
                <em>LOGIN</em>
              </b>
              <ArrowForwardIosIcon
                style={{
                  paddingLeft: '10px',
                }}
              ></ArrowForwardIosIcon>
            </Button>
          </CardActions>
          <Typography align="center" style={{ paddingTop: '10px' }}>
            Don't have an account?{' '}
            <Link className="orange" to={`/signup`}>
              <b>
                <em>SIGN UP</em>
              </b>
            </Link>
          </Typography>
        </UserCard>
      </Layout>
    )
  }
}
export default Login
