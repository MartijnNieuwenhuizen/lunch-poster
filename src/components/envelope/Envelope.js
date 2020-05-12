export default class Envelope {
  constructor(element) {
    this._element = element

    this._open = this._open.bind(this)

    this._element.addEventListener('click', this._open)
    this._body = document.querySelector('body')
  }

  _open() {
    if (
      !this._body.dataset.largeViewEnvelope ||
      this._body.dataset.largeViewEnvelope === 'false'
    ) {
      this._body.setAttribute('data-large-view-envelope', 'true')
      this._body.setAttribute('data-show-question', 'false')
    }
  }
}
