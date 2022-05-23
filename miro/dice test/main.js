
// const { board } = window.miro;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
    await miro.board.ui.on("icon:click", async () => {

        // get selected widgets
        let selectedWidgets = await board.getSelection();
        let diceList = [];

        // check if at least one and max. 5 widgets are selected
        if (selectedWidgets.length >= 1 && selectedWidgets.length <= 5) {
            for (const widget of selectedWidgets) {
                let dc = new dice(widget);
                await dc.init();
                await sleep(400);

                diceList.push(dc);
            }

            // roll the dice 3 times
            for (let i = 0; i < 3; i++) {
                for (const dc of diceList) {
                    await dc.roll();
                    await sleep(400);
                }
            }

            // finish rolling
            for (const dc of diceList) {
                await dc.fininsh();
                await sleep(400);
            }
        }
        else {
            if (selectedWidgets.length < 1) {
                // miro.showNotification('Please select at least one existing widget.')
                alert('Please select at least one existing widget.')
            }
            if (selectedWidgets.length > 5) {
                // miro.showNotification('You are selecting to many widgets, please pick 5 or less.')
                alert('You are selecting to many widgets, please pick 5 or less.')
            }
        }
    });
}

init();