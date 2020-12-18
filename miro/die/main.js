
function get_randome() 
{
    return Math.floor(Math.random() * 6) + 1;   // random integer from 1 to 6 
}

async function spawn()
{
    var num = get_randome();
    await miro.board.widgets.create({type: 'sticker', text: num.toString() });
}

miro.onReady(() => {
    miro.initialize({
      extensionPoints: {
        bottomBar: {
          title: 'New Die 3',
          svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
          onClick: async () => {
            var num = get_randome();
            await miro.board.widgets.create({type: 'sticker', text: num.toString() });
          }
        }
      }
    })
  })