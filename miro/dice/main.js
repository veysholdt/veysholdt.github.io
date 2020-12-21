
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

async function update_widget(widget, position, color)
{
  await miro.board.widgets.update({ 
      id: widget, 
      text: get_randome().toString(), 
      x: position.x,
      y: position.y,
      style:{
        stickerBackgroundColor: color,
        backgroundOpacity: 1,
      }
    }); // update sticker
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
          title: 'new dice',
          svgIcon: icon, //'<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
          onClick: async () => {

            let positions = await miro.board.selection.get();
            let widgets = [];

            if (positions.length >= 1 && positions.length <= 5) // check if at least one and max. 5 widgets are selected
            {
              for (let i = 0; i < positions.length; i++) // create a new sticker for every selected widget 
              {
                let dice = (await miro.board.widgets.create({ 
                    type:'sticker', 
                    text: get_randome().toString(),
                    x: positions[i].x,
                    y: positions[i].y,
                    capabilities: {
                    "editable": false
                    },
                    style:{
                      backgroundOpacity: 1,
                    },
                  }))[0];
                  
                  widgets.push(dice.id);
                  await sleep(200);
              }
                
              for (let j = 0; j < positions.length; j++) // update every sticker
              {
                let color = get_random_color();
                update_widget(widgets[j], positions[j], color);
                await sleep(200);
              }

              for (let i = 0; i < positions.length; i++) // update every sticker for final result
              {
                update_widget(widgets[i], positions[i], '#5ee335');
                await sleep(200);
              }
              
              await sleep(5000);

              for (let i = 0; i < positions.length; i++) // remove stickers again
              {
                await miro.board.widgets.deleteById(widgets[i]) // delete sticker
                await sleep(200);
              }
            }
            else
            {
              miro.showNotification('Please select at least one and not more than five existing widget.')
            }

           
          }
        }
      }
    })
  })