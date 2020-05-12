export default class Drop {
  constructor(element, options) {
    this._element = element
    this._options = options

    this.startX = 0
    this.startY = 0
    this._x = this.startX
    this._y = this.startY
    this._play = this._play.bind(this)
    this._body = document.querySelector('body')

    // this._play()
    this._addObserver()
  }

  _play() {
    this._element.style.transform = `translate(${this._x}px, ${this._y}px)`
  }

  _addObserver() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        console.log('mutation: ', mutation)
        if (mutation.type !== 'attributes') {
          return
        }
        // if (mutation.attributeName === 'data-large-view-envelope') {
        // }
        // if (mutation.attributeName === 'data-show-question') {
        // }
        if (
          mutation.target.dataset.largeViewEnvelope === 'true' ||
          mutation.target.dataset.showQuestion === 'true'
        ) {
          this._moveDropAside()
        }
      })
    })

    observer.observe(this._body, {
      attributes: true //configure it to listen to attribute changes
    })
  }

  _moveDropAside() {
    const { y, height } = this._element.getBoundingClientRect()

    const newY =
      Math.floor((y / window.innerHeight) * 100) > 50
        ? window.innerHeight - y - height / 2
        : -y - height / 2

    this._y = newY
    this._play()
  }
}
