import confetti from 'canvas-confetti'

import names from '../../data/names'
import questions from '../../data/questions'
import randomNumber from '../../static/js/utils/randomNumber'

export default class Question {
  constructor(element, options) {
    this._element = element
    this._options = options

    this._names = []
    this._nameId = 0
    this._questionsId = 0
    this._maxQuestionsCount = questions.length

    this._handleNext = this._handleNext.bind(this)
    this._handleClose = this._handleClose.bind(this)

    this._body = document.querySelector('body')
    this._name = document.querySelector('[data-question="name"]')
    this._text = document.querySelector('[data-question="text"]')
    this._triggerNext = document.querySelector('[data-trigger="next"]')
    this._triggerClose = document.querySelector('[data-trigger="close"]')

    this._triggerNext.addEventListener('click', this._handleNext)
    this._triggerClose.addEventListener('click', this._handleClose)

    // this._setNames()
    // this._setRandomQuestion()
  }

  _handleNext(event) {
    this._setNextName()
    this._setRandomQuestion()
    this._spray(event)
  }

  _handleClose() {
    // this._setRandomQuestion()

    this._body.setAttribute('data-show-question', 'false')
    this._body.setAttribute('data-drops', 'false')
  }

  _setRandomQuestion() {
    // Get random number
    const newId = randomNumber(1, this._maxQuestionsCount)
    // @TODO: Compare with prev number

    // Set new text
    this._text.innerHTML = questions[newId - 1]

    // Update current number for next comparison
    this._questionsId = newId
  }

  _setNextName() {
    this._nameId = this._nameId >= names.length - 1 ? 0 : this._nameId + 1
    this._setName()
  }
  _setName() {
    this._name.innerHTML = this._names[this._nameId]
  }

  _setNames() {
    this._names = names.sort(() => Math.random() - 0.5)
    this._setName()
  }

  _spray(event) {
    const x = event.screenX / window.innerWidth
    const y = event.screenY / window.innerHeight
    const angle = randomNumber(1, 359)

    confetti({
      particleCount: 300,
      spread: 80,
      angle,
      origin: { x, y }
    })
  }
}
