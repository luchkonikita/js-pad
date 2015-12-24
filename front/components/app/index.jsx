import './index.sass'

import React from 'react'
import {connect} from 'react-redux'

import Notification from '../notification/index'
import Navbar from '../navbar/index'
import WelcomeScreen from '../welcome_screen/index'
import Editor from '../editor/index'
import {initLogin, initLogout, hideNotification, runCode} from '../../actions/index'

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

  _renderWorkarea() {
    if (this.props.user.isLoggedIn) {
      return (
        <div className='app-workarea'>
          <Navbar
            user={this.props.user}
            onLogoutClick={() => { this.props.dispatch(initLogout()) }}
          />
          <Editor
            results={this.props.results}
            onEditorChange={(code) => { this.props.dispatch(runCode(code)) }}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <div className='app'>
        {this._renderNotification()}
        {this._renderWelcomeScreen()}
        {this._renderWorkarea()}
      </div>
    )
  }
}

export default connect((state) => state)(App)
