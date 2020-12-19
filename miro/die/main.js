
function get_randome() 
{
    return Math.floor(Math.random() * 6) + 1;   // random integer from 1 to 6 
}

function get_random_color() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

miro.onReady(() => {
    miro.initialize({
      extensionPoints: {
        bottomBar: {
          title: 'New Dice 6',
          svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
          onClick: async () => {

            var num = get_randome();

            let dice = (await miro.board.widgets.create(
              { type:'sticker', 
                text: num.toString(),
                x: 0.0,
                y: 0.0,
                capabilities: {
                "editable": false
                },
            }))[0];

            for (let i = 0; i < 30; i++) 
            {
              var num = get_randome();
              var color = get_random_color();

              await miro.board.widgets.update({
                  id: dice.id, 
                  text: num.toString(), 
                  style:{
                    stickerBackgroundColor: color,
                  }
                }) // update sticker

                sleep(50)
            }

            await miro.board.widgets.update({
              id: dice.id, 
              text: num.toString(), 
              style:{
                stickerBackgroundColor: '#5ee335',
                textColor
              }
            }) // update sticker
            
            await sleep(5000);
            await miro.board.widgets.deleteById(dice.id) // delete sticker
          }
        }
      }
    })
  })