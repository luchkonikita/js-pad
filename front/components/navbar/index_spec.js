import {assert} from 'chai'

import React from 'react'
import {findDOMNode} from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import Navbar from './index.jsx'

const defaultProps = {
  user: {}
}

function renderToDOM(props = defaultProps) {
  return TestUtils.renderIntoDocument(<Navbar {...props} />)
}

describe('Navbar', () => {
  it('renders to DOM', () => {
    assert.ok(renderToDOM())
  })

  it('contains user data', () => {
    const props = {
      user: {
        name: 'Bender',
        avatarUrl: 'http://example.com/image.png'
      }
    }

    const node = findDOMNode(renderToDOM(props))

    assert.include(node.innerText, 'Bender')
    assert.equal(node.getElementsByTagName('img')[0].src, 'http://example.com/image.png')
  })
})
