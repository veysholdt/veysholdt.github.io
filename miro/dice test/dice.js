
const { board } = window.miro;

class dice
{
    async create(x, y) {
        this.#widget = await board.createText({
            content: dice.sides[Math.floor(Math.random() * 6)],
            x: x,
            y: y,
            style: {
                fontSize: 230,
                textAlign: 'center',
            },
            width: 100,
        });
    }

    async createCustom(x, y, sides) {
        this.#widget = await board.createShape({
            content: Math.floor(Math.random() * (sides - 1) + 1).toString(),
            shape: 'rectangle',
            x: x,
            y: y,
            style: {
                fontSize: 45,
                textAlign: 'center',
            },
            width: 100,
            height: 100,
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

    async rollCustom(sides) {
        let side = Math.floor(Math.random() * (sides - 1) + 1).toString();
        let i = 0;

        // roll again if value is the same
        if (side != this.#lastSide || i < 10) {
            this.#widget.content = side;
        }
        else {
            i++;
            this.rollCustom(sides);
        }

        this.#lastSide = side;
        await this.#widget.sync();
    }

    #widget;
    static sides = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    #lastSide = "";
}