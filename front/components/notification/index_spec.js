import {assert} from 'chai'

import React from 'react'
import {findDOMNode} from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import Notification from './index.jsx'

const notification = {
  type: 'success',
  text: 'Yay!'
}

function renderToDOM(props = {notification}) {
  return TestUtils.renderIntoDocument(<Notification {...props} />)
}

describe('Notification', () => {
  it('renders to DOM', () => {
    assert.ok(renderToDOM())
  })

  it('shows success', () => {
    let notification = {
      type: 'success',
      text: 'This is success'
    }
    const node = findDOMNode(renderToDOM({notification}))
    assert.include([].slice.call(node.classList, 0), 'is-success')
    assert.equal(node.innerText, 'This is success')
  })

  it('shows notice', () => {
    let notification = {
      type: 'notice',
      text: 'This is notice'
    }
    const node = findDOMNode(renderToDOM({notification}))
    assert.include([].slice.call(node.classList, 0), 'is-notice')
    assert.equal(node.innerText, 'This is notice')
  })

  it('shows error', () => {
    let notification = {
      type: 'error',
      text: 'This is error'
    }
    const node = findDOMNode(renderToDOM({notification}))
    assert.include([].slice.call(node.classList, 0), 'is-error')
    assert.equal(node.innerText, 'This is error')
  })
})
