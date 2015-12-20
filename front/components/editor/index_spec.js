import {assert} from 'chai'

import React from 'react'
import {findDOMNode} from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import Editor from './index.jsx'

function renderToDOM(props = {}) {
  return TestUtils.renderIntoDocument(<Editor {...props} />)
}

describe('Editor', () => {
  it('renders to DOM', () => {
    assert.ok(renderToDOM())
  })
})
