
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// slider to select number of dice to roll
const slider = document.getElementById("dice-num-slider");
// input for custom number of sides
const numberOfSidesInput = document.getElementById("number-of-sides-input");
// array of radio butons
const radioButtons = Array.from(document.getElementsByClassName("sides-num-radio"));
// button to remove dice
const removeDiceButton = document.getElementById("remove-dice-button");
// draggable dice symbols
const diceSymbols = document.getElementById("draggable-dice");

slider.value = 1; // set initial value if slider to 1
numberOfSidesInput.value = 8; // initial value of number sides = 8

// default number if side is 6
document.getElementById("default-sides").checked = true;
// hide input for custom number of sides at first
numberOfSidesInput.style.visibility = "hidden";

var numberOfSidesRadioValue = 6;

// set dice symbols
diceSymbols.innerHTML = "";
for (let i = 0; i < slider.value; i++) {
    diceSymbols.innerHTML += dice.sides[Math.floor(Math.random() * 6)];
}

function showDiceSymbols() {
    diceSymbols.innerHTML = "";
    for (let i = 0; i < slider.value; i++) {
        // if option for custom number of dice is disabled
        if (numberOfSidesRadioValue == "6") {
            // set dice sambols as actual dice symbols
            diceSymbols.innerHTML += dice.sides[Math.floor(Math.random() * 6)];
            diceSymbols.style.fontSize = "6em";
        }
        else if (numberOfSidesRadioValue != "custom") {
            // show numbers, no 0 should be generated
            diceSymbols.innerHTML += Math.floor(Math.random() * Number(numberOfSidesRadioValue - 1) + 1) + " ";
            diceSymbols.style.fontSize = "3em";
        }
        else {
            // show numbers, no 0 should be generated
            diceSymbols.innerHTML += Math.floor(Math.random() * (numberOfSidesInput.value - 1) + 1) + " ";
            diceSymbols.style.fontSize = "3em";
        }

        // console.log(Number(numberOfSidesRadioValue))
        // console.log(numberOfSidesRadioValue)
    }
}

// on slider change...
slider.oninput = showDiceSymbols;

// checkbox change...
function changeSidesEvent(radio) {

    // hide or show input for number of sides
    if(radio.value == "custom") {
        numberOfSidesInput.style.visibility = "visible";
    }
    else {
        numberOfSidesInput.style.visibility = "hidden";
    }

    // console.log(radio.value);
    numberOfSidesRadioValue = radio.value;

    showDiceSymbols();
}

// make sure the input is validated
numberOfSidesInput.addEventListener("change", e => {

    if(e.target.value < 4) {
        e.target.value = 4;
    }
    else if (e.target.value > 99) {
        e.target.value = 99;
    }

    showDiceSymbols();
})

var diceList = [];

async function init() {
    // Enable the 'drop' event on the app panel. Active on 'miro-draggable' HTML elements
    await miro.board.ui.on('drop', async ({ x, y, target }) => {

        radioButtons.forEach(element => {
            element.disabled = true;
        });
        numberOfSidesInput.disabled = true;

        const currentDiceNum =  slider.value;

        for (let i = 0; i < currentDiceNum; i++) {
            let die = new dice;
            // check if # of sides == 6
            if (numberOfSidesRadioValue == "6") {
                await die.create(x + i * 200, y);
            }
            else if (numberOfSidesRadioValue != "custom") {
                await die.createCustom(x + i * 200, y, Number(numberOfSidesRadioValue));
            }
            else {
                await die.createCustom(x + i * 200, y, numberOfSidesInput.value);
            }
            await sleep(400);

            diceList.push(die);
        }

        // roll lastly added dice 4 times
        for (let i = 0; i < 4; i++) {
            for (let dieIndex = diceList.length-currentDiceNum; dieIndex < diceList.length; dieIndex++) {
                removeDiceButton.disabled = true;
                // check if # of sides == 6
                if (numberOfSidesRadioValue == "6") {
                    await diceList[dieIndex].roll();
                }
                else if (numberOfSidesRadioValue != "custom") {
                    await diceList[dieIndex].rollCustom(Number(numberOfSidesRadioValue));
                }
                else {
                    await diceList[dieIndex].rollCustom(numberOfSidesInput.value);
                }
                await sleep(400);
            }
        }

        removeDiceButton.disabled = false;

        radioButtons.forEach(element => {
            element.disabled = false;
        });
        numberOfSidesInput.disabled = true;
        
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