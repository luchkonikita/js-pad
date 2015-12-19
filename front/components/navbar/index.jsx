import './index.sass'
import React from 'react'

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className='navbar'>
        <div className='navbar-logo'>JS Pad</div>
        <div className='navbar-user'>
          <div className='navbar-user_name'>
            {this.props.user.name}
            <br />
            <a
              className='navbar-user_logout_link'
              href='#'
              onClick={() => {
                this.props.onLogoutClick()
              }}>
              logout
            </a>
          </div>
          <img className='navbar-user_avatar' src={this.props.user.avatarUrl} />
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  user: React.PropTypes.object.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}
