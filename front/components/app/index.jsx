import './index.sass'

import React from 'react'
import {connect} from 'react-redux'

import Notification from '../notification/index'
import Navbar from '../navbar/index'
import WelcomeScreen from '../welcome_screen/index'
import Editor from '../editor/index'
import TasksModal from '../tasks_modal/index'
import actions from '../../actions/index'

class App extends React.Component {

  _renderWelcomeScreen() {
    if (!this.props.user.isLoggedIn) {
      return (
        <WelcomeScreen
          onLoginClick={() => { this.props.dispatch(actions.initLogin()) }}
        />
      )
    }
  }

  _renderNotification() {
    if (this.props.notification.type) {
      return (
        <Notification
          notification={this.props.notification}
          onTimeout={() => { this.props.dispatch(actions.hideNotification()) }}
        />
      )
    }
  }

  _renderTasksModal() {
    if (this.props.user.isLoggedIn && this.props.tasks.show) {
      return (
        <TasksModal
          tasks={this.props.tasks.list}
          onTaskSelect={(task) => { this.props.dispatch(actions.selectTask(task)) }}
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
            onSelectTaskClick={() => { this.props.dispatch(actions.showTasks()) }}
            onLogoutClick={() => { this.props.dispatch(actions.initLogout()) }}
          />
          <Editor
            results={this.props.results}
            onEditorChange={(code) => { this.props.dispatch(actions.runCode(code)) }}
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
        {this._renderTasksModal()}
        {this._renderWorkarea()}
      </div>
    )
  }
}

export default connect((state) => state)(App)
