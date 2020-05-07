class GameMenu extends Phaser.Scene {
    constructor() {
        super("gameMenu");
    }

    create() {

        this.scene.launch("controller");

        ///////////  TEXTOS  ///////////
        this.titulo = this.add.image(config.width / 2, config.height / 3, "Titulo").setScale(1.8);

        const startButton = this.add.bitmapText(config.width / 2 - 90, config.height / 2, "pixelFont", "START GAME", 40);
        startButton.setTint(0x8888ff);  //azul claro

        const player1 = this.add.bitmapText(config.width / 2 - 70, config.height / 2 + 60, "pixelFont", "1P", 50);
        player1.setTint(0x660066);      //Rosa claro
        this.registry.set("MultiPlay", false);

        const player2 = this.add.bitmapText(config.width / 2 + 15, config.height / 2 + 60, "pixelFont", "2P", 50);
        player2.setTint(0x300030);      //Morado oscuro

        ///////////  INTERACCIONES  ///////////
        //Al pulsar en "START GAME"
        startButton.setInteractive().on('pointerdown', () => {
            this.scene.start("chooseLevel");
            this.registry.events.emit("changeSong", "menu");

        });

        //Al pulsar en "1P"
        player1.setInteractive().on('pointerdown', () => {
            player1.setTint(0x660066);  //Rosa claro
            player2.setTint(0x300030);  //Morado oscuro
            this.registry.set("MultiPlay", false);
        });

        //Al pulsar en "2P"
        player2.setInteractive().on('pointerdown', () => {
            player1.setTint(0x300030);  //Morado oscuro
            player2.setTint(0x660066);  //Rosa claro
            this.registry.set("MultiPlay", true);
        });
    }
}