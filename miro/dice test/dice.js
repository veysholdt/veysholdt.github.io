
const { board } = window.miro;

class dice
{
    constructor(widget) {
        this.#widget = widget;
    }

    async init() {
        if (this.#widget.type != 'text') {
            this.#widget = await board.createText({
                content: this.#diceSides[Math.floor(Math.random() * 6)],
                x: this.#widget.x,
                y: this.#widget.y,
                style: {
                    fontSize: 250,
                }
            });
        }
        else {
            this.roll();
        }
    }

    async roll() {
        let side = this.#diceSides[Math.floor(Math.random() * 6)];

        // roll again if value is the same
        if (side != this.#lastSide) {
            this.#widget.content = side;
        }
        else {
            this.roll();
        }
        
        this.#lastSide = side;
        await this.#widget.sync();
    }

    #widget;
    #diceSides = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    #lastSide = "";
}