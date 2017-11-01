import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const tagNameWhitelist = [
  'svg',
  'g',
  'text',
  'rect',
  'circle',
  'ellipse',
  'line',
  'polygon',
  'polyline',
  'path'
]

const cache = {}
const noop = () => { }

const DraggableSVG = (tagName) => {
  if (cache[`DraggableSVG.${tagName}`]) return cache[`DraggableSVG.${tagName}`]
  cache[`DraggableSVG.${tagName}`] = class extends Component {

    static defaultProps = {
      onDrag: noop,
      onDragStart: noop,
      onDragExit: noop,
      onDragEnter: noop,
      onDragLeave: noop,
      onDragEnd: noop,
      renderDragElement: () => (
        <div style={{ backgroundColor: '#fff', width: 20, height: 20 }}></div>
      )
    }

    __moving = false
    __mousedown = false

    componentWillMount = () => {
    }

    componentDidMount = () => {
      const { draggable = true } = this.props
      if (draggable) {
        this.el.addEventListener('mousedown', this.handleMouseDown)
        this.el.addEventListener('mousemove', this.handleMouseMove)
        window.addEventListener('mouseup', this.handleMouseUp)
      }
    }

    componentWillUnmount = () => {
      const { draggable = true } = this.props
      if (draggable) {
        this.el.removeEventListener('mousemove', this.handleMouseMove)
        window.removeEventListener('mouseup', this.handleMouseUp)
        this.removeDragEl()
      }
    }

    createCloneElement = (data) => {
      const { clientX, clientY, x, y } = data.event
      const dragEl = document.createElement('div')
      dragEl.style.position = 'fixed'
      dragEl.style.zIndex = 99999
      dragEl.style.left = `${x - 5}px`
      dragEl.style.top = `${y - 5}px`
      dragEl.setAttribute('draggable', true)
      document.body.appendChild(dragEl)
      ReactDOM.render(this.props.renderDragElement(this.el), dragEl)
      dragEl.ondrag = (...args) => {
        dragEl.style.opacity = 0
        this.props.onDrag(...args)
      }
      dragEl.ondragstart = (...args) => {
        this.props.onDragStart(...args)
      }
      dragEl.ondragenter = (...args) => {
        this.props.onDragEnter(...args)
      }
      dragEl.ondragleave = (...args) => {
        this.props.onDragLeave(...args)
      }
      dragEl.ondragexit = (...args) => {
        this.props.onDragExit(...args)
      }
      dragEl.ondragend = (...args) => {
        this.removeDragEl()
        this.props.onDragEnd(...args)
      }
      this.dragEl = dragEl
    }

    handleMouseDown = e => {
      this.__mousedown = true
      this.__moving = false
    }

    removeDragEl = () => {
      try {
        ReactDOM.unmountComponentAtNode(this.dragEl)
        this.dragEl.remove()
      } catch (e) {
      }
    }

    handleMouseUp = e => {
      this.el.setAttribute('opacity', 1)
      this.__mousedown = false
      this.__moving = false
      this.removeDragEl()
    }

    handleMouseMove = (e) => {
      if (this.__mousedown && !this.__moving) {
        this.__moving = true
        this.createCloneElement({
          event: e,
          text: this.props.text
        })
      }
    }

    getRef = () => this.el

    render() {
      const props = Object.assign({}, this.props, {
        ref: (ref) => this.el = ref,
      })
      delete props.renderDragElement
      return React.createElement(tagName, props)
    }
  }

  return cache[`DraggableSVG.${tagName}`]
}

tagNameWhitelist.forEach(tagName => {
  Object.defineProperty(DraggableSVG, tagName, {
    get: function () {
      return DraggableSVG(tagName)
    }
  })
})

module.exports = module.exports.default = DraggableSVG
