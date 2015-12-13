import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'

const EDITOR_SETTINGS = {
  mode: {
    name: "javascript",
    json: true
  },
  tabSize: 2,
  theme: 'dracula',
  lineNumbers: true
}

export default class Editor {
  constructor(textarea) {
    console.log('initializing editor')
    this._editor = CodeMirror.fromTextArea(textarea, EDITOR_SETTINGS)
  }
}
