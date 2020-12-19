
function get_randome() 
{
    return Math.floor(Math.random() * 6) + 1;   // random integer from 1 to 6 
}

async function createWidget(canvasX, canvasY) {
    const widget = (await miro.board.widgets.create({type: 'shape', x:canvasX || 0, y:canvasY || 0}))[0]
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

miro.onReady(() => {
    miro.initialize({
      extensionPoints: {
        bottomBar: {
          title: 'New Dice 3',
          svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
          onClick: async () => {

            var num = get_randome();

            let dice = (await miro.board.widgets.create(
              { type:'shape', 
                text: num.toString(),
                x: 0.0,
                y: 0.0,
                capabilities: {
                "editable": false
                },
                style: {
                  backgroundColor: white,
                  fontSize: 10,
                }
            }))[0];
            
            await sleep(5000);
            await miro.board.widgets.deleteById(dice.id) // delete sticker
          }
        }
      }
    })
  })