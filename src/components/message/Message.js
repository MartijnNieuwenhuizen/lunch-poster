export default class Message {
  constructor(element, options) {
    this._element = element
    this._options = options

    this._handleClick = this._handleClick.bind(this)

    this._body = document.querySelector('body')
    this._text = document.querySelector('.message__text')
    this._element.addEventListener('click', this._handleClick)

    this._setText()
  }

  _setText() {
    const text = 'More to come!'
    this._text.innerHTML = text
  }

  _handleClick() {
    this._body.setAttribute('data-show-message', 'false')
    this._body.setAttribute('data-drops', 'false')
  }
}
