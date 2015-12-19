import './index.sass'
import React from 'react'
import classNames from 'classnames'

export default class Notification extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.onTimeout()
    }, 5000)
  }

  render() {
    const className = classNames({
      'notification': true,
      'is-success': (this.props.notification.type == 'success'),
      'is-notice': (this.props.notification.type == 'notice'),
      'is-error': (this.props.notification.type == 'error')
    })

    return (
      <div className={className}>
        {this.props.notification.text}
      </div>
    )
  }
}

Notification.propTypes = {
  onTimeout: React.PropTypes.func.isRequired,
  notification: React.PropTypes.object.isRequired
}
