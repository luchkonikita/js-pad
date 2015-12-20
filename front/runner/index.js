import _ from 'underscore'

export default class Runner {
  constructor(code) {
    this.code = code
    this.callbacks = []
  }

  assert(cond, text) {
    const status = cond === true ? 'Success' : 'Failure'
    const type = (cond === true ? 'success' : 'error')
    const message = _.compact([status, text]).join(' - ')
    this.callbacks.forEach((callback) => {
      callback({type, message})
    })
  }

  onValue(callback) {
    this.callbacks.push(callback)
    return this
  }

  run() {
    try {
      const sandboxFn = new Function('assert', this._formatCode())
      sandboxFn(this.assert.bind(this))
    } catch (e) {
      this.assert(false, e.message)
    }
  }

  _formatCode() {
    return `try {
      var window, alert, prompt, print, open, confirm;
      ${this.code}
    } catch (e) {
      assert(false, e.message)
    }`
  }
}
