
function get_randome() 
{
    return Math.floor(Math.random() * 6) + 1;;   // random integer from 1 to 6 
}

async function spawn()
{
    var num = get_randome();

    await miro.board.widgets.create({type: 'sticker', text: num.toString() })
}