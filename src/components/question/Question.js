export default class Question {
  constructor(element, options) {
    this._element = element
    this._options = options

    this._handleClick = this._handleClick.bind(this)

    this._body = document.querySelector('body')
    this._element.addEventListener('click', this._handleClick)
  }

  _handleClick() {
    this._body.setAttribute('data-show-question', 'false')
  }
}
