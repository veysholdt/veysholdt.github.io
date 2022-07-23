
// app URL: https://veysholdt.github.io/miro/dice%20test/

async function init() {

    await miro.board.ui.on("icon:click", async () => {
        await miro.board.ui.openPanel({
            // Absolute or relative URL of the page whose content you want to display inside the panel      
            url: "app.html"
        });
      });
}

init();