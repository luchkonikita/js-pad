import './index.sass'
import React from 'react'

export default class WelcomeScreen extends React.Component {

  render() {
    return (
      <div className='welcome_screen'>
        <h1 className='welcome_screen-title'>JS Pad</h1>
        <a className='welcome_screen-link' href='#' onClick={this.props.onLoginClick}>Login wih GitHub</a>
      </div>
    )
  }
}

WelcomeScreen.propTypes = {
  onLoginClick: React.PropTypes.func.isRequired
}
