
function get_randome() 
{
    return Math.floor(Math.random() * 6) + 1;   // random integer from 1 to 6 
}

async function createWidget(canvasX, canvasY) {
    const widget = (await miro.board.widgets.create({type: 'shape', x:canvasX || 0, y:canvasY || 0}))[0]
}
  
miro.onReady(() => {
    miro.initialize({
      extensionPoints: {
        bottomBar: {
          title: 'New Dice 1',
          svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
          onClick: async () => {
            let sticker = (await miro.board.widgets.create(
              {type:'sticker', 
              text: 'Hello',
              "capabilities": {
                "editable": false
              }
            }))[0];
            
            setTimeout(() => { console.log("Waiting to delete dice..."); }, 2000);
            await miro.board.widgets.deleteById(sticker.id) // delete sticker
          }
        }
      }
    })
  })