import React from 'react'
import { Typography, Button, TextField } from '@material-ui/core'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { orange } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import UserCard from '../components/UserCard'
import Layout from '../components/Layout'

const useStyles = () =>
  makeStyles({
    root: {
      '& MuiFormLabel-root.Mui-focused': {
        color: orange[500],
      },
    },
  })
class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault()
    await Axios.post(`http://localhost:8080/signup`, {
      userName: this.state.userName,
      password: this.state.password,
    })
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
            className={classes.root}
            fullWidth
            margin="normal"
            label="Username"
            onChange={this.handleChange}
            name="userName"
            type="text"
            placeholder="userName"
            variant="outlined"
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
          ></TextField>
          <Typography component="label">
            <Button onClick={this.handleSubmit} color="primary">
              <em>SIGN UP</em>
            </Button>
          </Typography>
          Already have an account?{' '}
          <Link color="primary" to={`/login`}>
            <em>LOGIN</em>
          </Link>
        </UserCard>
      </Layout>
    )
  }
}
export default User
