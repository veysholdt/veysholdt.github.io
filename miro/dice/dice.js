
const { board } = window.miro;

class dice
{
    async create(x, y) {
        this.#widget = await board.createText({
            content: dice.sides[Math.floor(Math.random() * 6)],
            x: x,
            y: y,
            style: {
                fontSize: 250,
                textAlign: 'center',
            }
        });
    }

    async remove() {
        await board.remove(this.#widget);
    }

    async roll() {
        let side = dice.sides[Math.floor(Math.random() * 6)];

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
    static sides = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    #lastSide = "";
}