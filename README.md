# <DraggableSVG.x>

## Install

```
npm i react-draggable-svg
```

## Example

```javascript
import React, { Component } from 'react'
import DraggableSVG from 'react-draggable-svg'

ReactDOM.render(
  <svg>
    <DraggableSVG.g
     onDragStart={() => console.log('drag start'))}
     onDragOver={() => { console.log('on drag over') } }
     onDrop={() => { console.log('on drop') }}
    >
      <rect>
        <text>hello world</text>
      </rect>
    </DraggableSVG.g>
  </svg>
)

```

## API

1. `function DraggableSVG(tagName): Component`

2. Draggable.g: Component 

## props

1. renderDragElement: func

Render custom element when dragging. Because `<g>`, `<rect>` can only show inside `<svg>`, so you should custom a svg element wrap this `child element`.


## License 
MIT
