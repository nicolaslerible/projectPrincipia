class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOver");     
    }

    create(){
        ///////////  TEXTOS  ///////////        
        const over = this.add.bitmapText(config.width / 2 - 115, config.height / 5, "pixelFont", "GAMEOVER " , 65); 
        over.setTint(0x990066);        //Morado

        const menuButton = this.add.bitmapText(config.width / 2 - 100, config.height / 2, "pixelFont", "PLAY AGAIN" , 50);
        menuButton.setTint(0x8888ff);  //Azul claro
        
        this.input.on("pointerdown", () => {
            this.scene.start("gameMenu");
        });
    }
}