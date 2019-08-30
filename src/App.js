import Routes from './Routes'
import React from 'react'
import {
  responsiveFontSizes,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import { red, grey, orange } from '@material-ui/core/colors'

export const AuthContext = React.createContext({ auth: '', setAuth: () => {} })
const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        light: grey[300],
        main: orange[700],
        dark: grey[900],
      },
      secondary: {
        light: red[300],
        main: red[500],
        dark: red[700],
      },
    },
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MuiPaper: {
        root: {},
      },
      MuiAppBar: {
        root: {
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          fontSize: '36px',
          color: grey[500],
          fontWeight: 800,
        },
      },
    },
  })
)
export default () => (
  <MuiThemeProvider theme={theme}>
    <Routes />
  </MuiThemeProvider>
)
