class OptionsMenu extends Phaser.Scene {
    constructor() {
        super("options");
    }

    create() {

        //// PARAMS ////

        this.ShipOptions = new Button({ scene: this, x: 128, y: 128, on: "ShipOptions-on", off: "Ship-off", flip: false });
        this.ShipOptions.animateButton();


    }

    update() {


    }

}