import './index.sass'
import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'

const EDITOR_SETTINGS = {
  mode: {
    name: 'javascript',
    json: true
  },
  tabSize: 2,
  theme: 'dracula',
  lineNumbers: true
}

export default class Editor extends React.Component {

  componentDidMount() {
    this._editor = CodeMirror.fromTextArea(this.refs.textarea, EDITOR_SETTINGS)
  }

  render() {
    return (
      <div className='editor'>
        <section className='editor-taskarea'>
        </section>
        <section className='editor-workarea'>
          <textarea className='editor-textarea' ref='textarea'></textarea>
        </section>
      </div>
    )
  }
}

Editor.propTypes = {}
