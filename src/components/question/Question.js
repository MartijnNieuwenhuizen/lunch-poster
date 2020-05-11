export default class Question {
  constructor(element, options) {
    this._element = element
    this._options = options

    this._handleClick = this._handleClick.bind(this)

    this._trigger = this._element.querySelector('button')
    this._body = document.querySelector('body')
    this._trigger.addEventListener('click', this._handleClick)
  }
}
