
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
  const icon =
    '<g> \
    <title>Layer 1</title> \
    <rect rx="2" x="1.93936" y="1.93632" id="svg_1" height="20" width="20" stroke-width="2" stroke="#000" fill="#fff"/> \
    <ellipse fill="#fff" stroke="#000" stroke-width="2" cx="6.96379" cy="6.92374" id="svg_3" rx="1.8453" ry="1.74359"/> \
    <ellipse fill="#fff" stroke="#000" stroke-width="2" cx="11.89606" cy="11.77534" id="svg_7" rx="1.8453" ry="1.74359"/> \
    <ellipse fill="#fff" stroke="#000" stroke-width="2" cx="16.86867" cy="16.61655" id="svg_9" rx="1.8453" ry="1.74359"/> \
    </g>'
    miro.initialize({
      extensionPoints: {
        bottomBar: {
          title: 'New Dice',
          svgIcon: icon, //'<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
          onClick: async () => {

            let location = await miro.board.selection.get()

            if (location.length == 1)
            {
              var num = get_randome();

              let dice = (await miro.board.widgets.create(
                { type:'sticker', 
                  text: num.toString(),
                  x: location[0].x,
                  y: location[0].y,
                  capabilities: {
                  "editable": false
                  },
              }))[0];
  
              for (let i = 0; i < 15; i++) 
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
                }
              }) // update sticker
              
              await sleep(5000);
              await miro.board.widgets.deleteById(dice.id) // delete sticker
            }
            else
            {
              miro.showNotification('Please select ONE widget as location.')
            }

           
          }
        }
      }
    })
  })