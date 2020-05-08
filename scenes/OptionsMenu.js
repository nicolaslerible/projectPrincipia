class OptionsMenu extends Phaser.Scene {
    constructor() {
        super("options");
    }

    create() {

        //// BUTTONS ////
        this.ShipOptions = new Button({ scene: this, x: 128, y: 128, on: "ShipOptions-on", off: "Ship-off", flip: false });
        this.ShipOptions.animateButton();
        this.BtnEsc = new Button({ scene: this, x: 50, y: 224, on: "Esc-on", off: "Esc-off", flip: false });

        this.textMusic = this.add.bitmapText(48, 30, "pixelFont", "Coming Soon", 20).setTint(0xff8a56);

        //// CONTROLS ////
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start("chooseLevel");
        }

    }

}