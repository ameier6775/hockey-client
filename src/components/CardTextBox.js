import React from 'react'
import { TextField } from '@material-ui/core'

export default class CardTextBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      label: '',
      type: '',
      placeholder: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        color="inherit"
        name={this.props.name}
        type={this.props.type}
        label={this.props.label}
        placeholder={this.props.placeholder}
      >
        {this.props.children}
      </TextField>
    )
  }
}
