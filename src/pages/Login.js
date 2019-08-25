import React from 'react'
import { Typography, Button, TextField } from '@material-ui/core'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import UserCard from '../components/UserCard'

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
          ></TextField>
          <Typography component="label">
            <Button onClick={this.handleLogin} color="primary">
              <em>LOGIN</em>
            </Button>
          </Typography>
          Don't have an account?{' '}
          <Link color="primary" to={`/signup`}>
            <em>SIGN UP</em>
          </Link>
        </UserCard>
      </Layout>
    )
  }
}
export default Login
