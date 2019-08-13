import React from 'react'
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
} from '@material-ui/core'
import Layout from '../components/Layout'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { orange } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
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
    this.state = { user: '', password: '', verifyPassword: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(e) {
    console.log('here')
    e.preventDefault()
    const response = await Axios.post(`http://localhost:8080/signup`, {
      userName: this.state.user,
      password: this.state.password,
    })
    console.log(response)
    console.log(this.state)
    // console.log(this.state.user.)
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const classes = useStyles()
    return (
      <Layout>
        <div
          style={{
            color: 'gold',
          }}
        >
          <form>
            <Card
              style={{
                margin: '10px',
                marginTop: '100px',
                marginBottom: '100px',
                marginLeft: '18%',
                display: 'flex',
                flexWrap: 'wrap',
                width: '58%',
                height: 'auto',
              }}
            >
              <CardContent>
                <Typography variant="h3">
                  <b>Sign Up</b>
                </Typography>
                <TextField
                  className={classes.root}
                  fullWidth
                  margin="normal"
                  label="Username"
                  onChange={this.handleChange}
                  name="user"
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
              </CardContent>
            </Card>
          </form>
        </div>
      </Layout>
    )
  }
}
export default User
