
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
  const icon24 =
    '<g> \
    <title>Layer 1</title> \
    <rect rx="2" x="1.93936" y="1.93632" id="svg_1" height="20" width="20" stroke-width="2" stroke="#000" fill="#fff"/> \
    <ellipse fill="#fff" stroke="#000" stroke-width="2" cx="6.96379" cy="6.92374" id="svg_3" rx="1.8453" ry="1.74359"/> \
    <ellipse fill="#fff" stroke="#000" stroke-width="2" cx="11.89606" cy="11.77534" id="svg_7" rx="1.8453" ry="1.74359"/> \
    <ellipse fill="#fff" stroke="#000" stroke-width="2" cx="16.86867" cy="16.61655" id="svg_9" rx="1.8453" ry="1.74359"/> \
    </g>'
  const icon48 = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="48" height="48"> \
    <defs> \
    <path d="M37.94 1.94C40.61 1.94 41.94 3.27 41.94 5.94C41.94 25.14 41.94 35.8 41.94 37.94C41.94 40.6 40.61 41.94 37.94 41.94C18.74 41.94 8.07 41.94 5.94 41.94C3.27 41.94 1.94 40.6 1.94 37.94C1.94 18.74 1.94 8.07 1.94 5.94C1.94 3.27 3.27 1.94 5.94 1.94C25.14 1.94 35.81 1.94 37.94 1.94Z" id="iMfV1gZv"></path> \
    <path d="M15.68 11.91C15.68 13.84 14.03 15.4 11.99 15.4C9.95 15.4 8.3 13.84 8.3 11.91C8.3 9.99 9.95 8.42 11.99 8.42C14.03 8.42 15.68 9.99 15.68 11.91Z" id="b1gGRCx4Ex"></path><path d="M25.54 21.61C25.54 23.54 23.89 25.1 21.85 25.1C19.81 25.1 18.16 23.54 18.16 21.61C18.16 19.69 19.81 18.13 21.85 18.13C23.89 18.13 25.54 19.69 25.54 21.61Z" id="c1KrlQqy"></path> \
    <path d="M35.49 31.3C35.49 33.22 33.84 34.78 31.8 34.78C29.76 34.78 28.11 33.22 28.11 31.3C28.11 29.37 29.76 27.81 31.8 27.81C33.84 27.81 35.49 29.37 35.49 31.3Z" id="a5JkACl8h6"></path> ,\
    </defs> \
    <g><g><g> \
    <use xlink:href="#iMfV1gZv" opacity="1" fill="#ffffff" fill-opacity="1"></use> \
    <g> \
    <use xlink:href="#iMfV1gZv" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="4" stroke-opacity="1"></use> \
    </g></g><g> \
    <use xlink:href="#b1gGRCx4Ex" opacity="1" fill="#ffffff" fill-opacity="1"></use> \
    <g> \
    <use xlink:href="#b1gGRCx4Ex" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="4" stroke-opacity="1"></use> \
    </g></g><g> \
    <use xlink:href="#c1KrlQqy" opacity="1" fill="#ffffff" fill-opacity="1"></use> \
    <g> \
    <use xlink:href="#c1KrlQqy" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="4" stroke-opacity="1"></use> \
    </g></g><g> \
    <use xlink:href="#a5JkACl8h6" opacity="1" fill="#ffffff" fill-opacity="1"></use><g><use xlink:href="#a5JkACl8h6" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="4" stroke-opacity="1"></use> \
    </g></g></g></g></svg>' 
   
    miro.initialize({
      extensionPoints: {
        toolbar: {
          title: 'new dice',
          toolbarSvgIcon: icon24,
          librarySvgIcon: icon48,
          onClick: async () => {
            
            const auth = await miro.isAuthorized();

            if (auth) // if user is authorized
            {
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
                if(positions.length < 1)
                {
                  miro.showNotification('Please select at least one existing widget.')
                }
                if(positions.length > 5)
                {
                  miro.showNotification('You are selecting to many widgets, please pick 5 or less.')
                }
              }
            }
            else // if user is not authorized
            {
              miro.board.ui.openModal('notAuthorized.html');
            }
          }
        }
      }
    })
  })