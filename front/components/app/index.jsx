import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

class App extends React.Component {

  render() {
    return <span>I am the application</span>
  }
}

// Replace this in future this is if unneccessary
function select(state) {
  return {}
}

export default connect(select)(App)
