
function get_randome() 
{
    return Math.floor(Math.random() * 6) + 1;   // random integer from 1 to 6 
}

async function createWidget(canvasX, canvasY) {
    const widget = (await miro.board.widgets.create({type: 'shape', x:canvasX || 0, y:canvasY || 0}))[0]
    miro.board.viewport.zoomToObject(widget)
}

const options = {
    draggableItemSelector: '#box',
    onClick: async (targetElement) => {
      createWidget()
    },
    getDraggableItemPreview: (targetElement) => { //drag-started
      return {url: HOTSPOT_PREVIEW}
    },
    onDrop: (canvasX, canvasY) => {
      createWidget(canvasX, canvasY)
    }
  }
  
miro.onReady(() => {
    miro.board.ui.initDraggableItemsContainer(document.body, options)  
    miro.initialize({
      extensionPoints: {
        bottomBar: {
          title: 'New Dice',
          svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
          onClick: async () => {
            let sticker = (await miro.board.widgets.create({type:'sticker', text: 'Hello'}))[0]
            await miro.board.viewport.zoomToObject(sticker)
            sticker.onClick()
          }
        }
      }
    })
  })