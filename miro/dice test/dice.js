
const { board } = window.miro;

const colors = ["gray","light_yellow","yellow","orange","light_green","green","dark_green","cyan","light_pink","pink","violet","red","light_blue","blue","dark_blue","black"];

class dice
{
    constructor(widget) {
        this.#widget = widget;
    }

    async init() {
        if (this.#widget.type != 'sticky_note') {
            this.#widget = await board.createStickyNote({
                content: this.#getDiceVal().toString(),
                x: this.#widget.x,
                y: this.#widget.y,
                style: {
                    fillColor: colors[Math.floor(Math.random() * 15)]
                }
            });
        }
        else {
            this.roll();
        }
    }

    async roll() {
        this.#widget.style.fillColor = colors[Math.floor(Math.random() * 15)];
        this.#widget.content = this.#getDiceVal().toString();
        await this.#widget.sync();
    }

    async fininsh() {
        this.#widget.style.fillColor = "green";
        this.#widget.content = this.#getDiceVal().toString();
        await this.#widget.sync();
    }

    #getDiceVal() {
        return Math.floor(Math.random() * 6) + 1;   // random integer from 1 to 6 
    }

    #widget;
}