# <DraggableSVG.x>

## Install

```
npm i react-draggable-svg
```

## Example

```javascript
import React, { Component } from 'react'
import DraggableSVG from 'react-draggable-svg'

ReactDOM.reander(
  <svg>
    <DraggableSVG.g
     onDragStart={() => console.log('drag start'))}
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


## License 
MIT