import React from 'react'
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
} from '@material-ui/core'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import Axios from 'axios'
// import { AuthContext } from '../App'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = { userName: '', password: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async componentDidMount() {}
  render() {
    return (
      // <AuthContext.Consumer>
      // {auth => (
      <Layout>
        <div>
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
                  <b>Login</b>
                </Typography>
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
                  <Button
                    onClick={async e => {
                      e.preventDefault()
                      const response = await Axios.post(
                        `http://localhost:8080/login`,
                        {
                          userName: this.state.userName,
                          password: this.state.password,
                        }
                      )
                      console.log(response)

                      // auth.setAuth(response.headers.authorization)

                      window.localStorage.setItem(
                        'auth',
                        response.headers.authorization
                      )

                      // console.log(auth.auth)
                    }}
                    color="primary"
                  >
                    <em>LOGIN</em>
                  </Button>
                </Typography>
                Don't have an account?{' '}
                <Link color="primary" to={`/signup`}>
                  <em>SIGN UP</em>
                </Link>
              </CardContent>
            </Card>
          </form>
        </div>
      </Layout>
      // )}
      // </AuthContext.Consumer>
    )
  }
}
export default Login
