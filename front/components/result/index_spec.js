import {assert} from 'chai'

import React from 'react'
import {findDOMNode} from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import Result from './index.jsx'

const defaultProps = {
  result: {
    type: 'success',
    message: 'Yay'
  }
}

function renderToDOM(props = defaultProps) {
  return TestUtils.renderIntoDocument(<Result {...props} />)
}

describe('Result', () => {
  it('renders to DOM', () => {
    assert.ok(renderToDOM())
  })
})
