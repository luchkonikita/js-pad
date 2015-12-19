import {assert} from 'chai'

import React from 'react'
import TestUtils from 'react-addons-test-utils'

import WelcomeScreen from './index.jsx'

function renderToDOM() {
  return TestUtils.renderIntoDocument(<WelcomeScreen />)
}

describe('WelcomeScreen', () => {
  it('renders to DOM', () => {
    assert.ok(renderToDOM())
  })
})
