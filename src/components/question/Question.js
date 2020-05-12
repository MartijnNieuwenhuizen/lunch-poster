export default class Question {
  constructor(element, options) {
    this._element = element
    this._options = options

    this._handleClick = this._handleClick.bind(this)

    this._body = document.querySelector('body')
    this._text = document.querySelector('.question__text')
    this._element.addEventListener('click', this._handleClick)

    this._setText()
  }

  _setText() {
    const text = "It's not time yet!"
    this._text.innerHTML = text
  }

  _handleClick() {
    this._body.setAttribute('data-show-question', 'false')
    this._body.setAttribute('data-drops', 'false')
  }
}
