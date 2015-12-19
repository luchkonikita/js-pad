import React from 'react'
import {connect} from 'react-redux'

import Notification from '../notification/index'
import Navbar from '../navbar/index'
import WelcomeScreen from '../welcome_screen/index'
import {initLogin, initLogout, hideNotification} from '../../actions/index'

class App extends React.Component {

  _renderWelcomeScreen() {
    if (!this.props.user.isLoggedIn) {
      return (
        <WelcomeScreen
          onLoginClick={() => { this.props.dispatch(initLogin()) }}
        />
      )
    }
  }

  _renderNotification() {
    if (this.props.notification.type) {
      return (
        <Notification
          notification={this.props.notification}
          onTimeout={() => { this.props.dispatch(hideNotification()) }}
        />
      )
    }
  }

  _renderNavbar() {
    if (this.props.user.isLoggedIn) {
      return (
        <Navbar
          user={this.props.user}
          onLogoutClick={() => { this.props.dispatch(initLogout()) }}
        />
      )
    }
  }

  render() {
    return (
      <div className='app'>
        {this._renderNotification()}
        {this._renderNavbar()}
        {this._renderWelcomeScreen()}
      </div>
    )
  }
}

export default connect((state) => state)(App)
