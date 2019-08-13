import Routes from './Routes'
import React from 'react'

// export const AuthContext = React.createContext({ auth: '', setAuth: () => {} })

export default class App extends React.Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   auth: '',
    // }

    // this.handleAuthUpload = this.handleAuthUpload.bind(this)
  }

  //   handleAuthUpload(token) {
  //     this.setState({
  //       auth: token,
  //     })
  //   }

  render() {
    return (
      //   <AuthContext.Provider
      //     value={{ auth: this.state.auth, setAuth: this.handleAuthUpload }}
      //   >
      <Routes />
      //   </AuthContext.Provider>
    )
  }
}
