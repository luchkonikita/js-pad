import {assert} from 'chai'

import React from 'react'
import {findDOMNode} from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import TasksModal from './index.jsx'

const defaultProps = {
  tasks: []
}

function renderToDOM(props = defaultProps) {
  return TestUtils.renderIntoDocument(<TasksModal {...props} />)
}

describe('TasksModal', () => {
  it('renders to DOM', () => {
    assert.ok(renderToDOM())
  })
})
