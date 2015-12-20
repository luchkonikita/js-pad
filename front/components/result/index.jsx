import './index.sass'

import React from 'react'
import classNames from 'classnames'

export default class Result extends React.Component {

  render() {
    const className = classNames({
      'result': true,
      'is-success': (this.props.result.type == 'success'),
      'is-error': (this.props.result.type == 'error')
    })

    return (
      <div className={className}>
        {this.props.result.message}
      </div>
    )
  }
}

Result.propTypes = {
  result: React.PropTypes.object.isRequired
}
