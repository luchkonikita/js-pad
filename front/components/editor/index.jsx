import './index.sass'

import _ from 'underscore'
import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'

import Result from '../result/index'

const EDITOR_SETTINGS = {
  mode: {
    name: 'javascript',
    json: true
  },
  tabSize: 2,
  theme: 'dracula',
  lineNumbers: true
}

const UPDATE_DELAY = 5000

export default class Editor extends React.Component {

  componentDidMount() {
    this._editor = CodeMirror.fromTextArea(this.refs.textarea, EDITOR_SETTINGS)
    this._editor.focus()
    this._editor.on('change', _.throttle(this._handleChange.bind(this), UPDATE_DELAY))
  }

  _handleChange() {
    this.props.onEditorChange(this._editor.getValue())
  }

  _renderResults() {
    return this.props.results.map((result, i) => {
      return (
        <Result result={result} key={i} />
      )
    })
  }

  render() {
    return (
      <div className='editor'>
        <section className='editor-taskarea'>
          {this._renderResults()}
        </section>
        <section className='editor-workarea'>
          <textarea className='editor-textarea' ref='textarea'></textarea>
        </section>
        <div className='editor-help'>
          <div className='editor-help_question_mark'>?</div>
          <div className='editor-help_tooltip'>
            To make tests work you can use:
            <br />
            <code>assert(condition, message)</code>
            <br />
            Example:
            <br />
            <code>assert((getOne() === 1), 'function getOne returns 1')</code>
          </div>
        </div>
      </div>
    )
  }
}

Editor.propTypes = {
  results: React.PropTypes.array.isRequired,
  onEditorChange: React.PropTypes.func.isRequired
}
