import './styles/index.sass'
import Editor from './components/editor/index'

document.addEventListener('DOMContentLoaded', () => {
  console.log('app initialization started')

  const editorArea = document.querySelectorAll('[data-component="editor"]')[0]
  if (editorArea) {
    new Editor(editorArea)
  }
})
