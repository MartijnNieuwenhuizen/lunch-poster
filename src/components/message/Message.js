import messages from '../../data/messages'
import randomNumber from '../../static/js/utils/randomNumber'

export default class Message {
  constructor(element, options) {
    this._element = element
    this._options = options

    this._handleClick = this._handleClick.bind(this)

    this._messages = messages.sort(() => Math.random() - 0.5)

    this._body = document.querySelector('body')
    this._text = document.querySelector('.message__text')
    this._element.addEventListener('click', this._handleClick)

    // this._setText()
  }

  _setText() {
    const randomMessageId = randomNumber(1, this._messages.length - 1)
    this._text.innerHTML = this._messages[randomMessageId]
  }

  _handleClick() {
    // this._setText()

    this._body.setAttribute('data-show-message', 'false')
    this._body.setAttribute('data-drops', 'false')
  }
}
