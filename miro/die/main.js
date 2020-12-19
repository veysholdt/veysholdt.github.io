
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
    '<g><title>Layer 1</title><g id="svg_8"><ellipse fill="#fff" stroke="#000" stroke-width="2" cx="42.24758" cy="40.33657" id="svg_4" rx="3.55358" ry="3.25476"/><ellipse fill="#fff" stroke="#000" stroke-width="2" cx="62.35576" cy="59.10278" id="svg_5" rx="3.55358" ry="3.25476"/><g id="svg_10"><rect x="2.06773" y="1.93632" id="svg_1" height="20" width="20" stroke-width="2" stroke="#000" fill="#fff"/><ellipse fill="#fff" stroke="#000" stroke-width="2" cx="6.45464" cy="6.55944" id="svg_3" rx="1.8453" ry="1.74359"/><ellipse fill="#fff" stroke="#000" stroke-width="2" cx="11.84228" cy="11.68427" id="svg_7" rx="1.8453" ry="1.74359"/><ellipse fill="#fff" stroke="#000" stroke-width="2" cx="17.36134" cy="17.07192" id="svg_9" rx="1.8453" ry="1.74359"/></g></g></g>'
    miro.initialize({
      extensionPoints: {
        bottomBar: {
          title: 'New Dice',
          svgIcon: icon, //'<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
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

            for (let i = 0; i < 17; i++) 
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
        }
      }
    })
  })