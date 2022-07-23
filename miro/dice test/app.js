
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const slider = document.getElementById("dice-num-slider");
const removeDiceButton = document.getElementById("remove-dice-button");
const diceSymbols = document.getElementById("draggable-dice");

slider.value = 1;

diceSymbols.innerHTML = "";
for (let i = 0; i < slider.value; i++) {
    diceSymbols.innerHTML += dice.sides[Math.floor(Math.random() * 6)];
}

slider.oninput = function () {
    diceSymbols.innerHTML = "";
    for (let i = 0; i < slider.value; i++) {
        diceSymbols.innerHTML += dice.sides[Math.floor(Math.random() * 6)];
    }
}

var diceList = [];

async function init() {
    // Enable the 'drop' event on the app panel. Active on 'miro-draggable' HTML elements
    await miro.board.ui.on('drop', async ({ x, y, target }) => {

        const currentDiceNum =  slider.value;

        for (let i = 0; i < currentDiceNum; i++) {
            let die = new dice;
            await die.create(x + i * 200, y);
            await sleep(400);

            diceList.push(die);
        }

        // roll lastly added dice 4 times
        for (let i = 0; i < 4; i++) {
            for (let dieIndex = diceList.length-currentDiceNum; dieIndex < diceList.length; dieIndex++) {
                removeDiceButton.disabled = true;
                await diceList[dieIndex].roll();
                await sleep(400);
            }
        }

        removeDiceButton.disabled = false;
    });
}

init();

async function removeDice() {

    try {
        for (const die of diceList) {
            await die.remove();
            await sleep(200);
        }
    } catch (error) {
        console.log("Dice already removed")
    }

    while(diceList.length > 0) {
        diceList.pop();
    }

    removeDiceButton.disabled = true;
}