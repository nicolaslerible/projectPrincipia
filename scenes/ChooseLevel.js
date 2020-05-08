class ChooseLevel extends Phaser.Scene {
    constructor() {
        super("chooseLevel");
    }

    create() {

        //// PARAMS ////
        this.position = 1;
        this.optPosition = false;
        this.isUp = false;

        //// SOUNDS ////
        this.audChangePlanet = this.sound.add("aud-changePlanet");
        this.audStartLevel = this.sound.add("aud-startLevel");

        ////  PLANETS  ////
        this.planets = this.add.group();
        this.mercury = new Planet({ scene: this, x: 128, y: 107, anim: "Mercury_anim", pos: 1, small: false });
        this.venus = new Planet({ scene: this, x: 238, y: 107, anim: "Venus_anim", pos: 2, small: true });
        this.earth = new Planet({ scene: this, x: 348, y: 107, anim: "Earth_anim", pos: 3, small: true });
        this.mars = new Planet({ scene: this, x: 458, y: 107, anim: "Mars_anim", pos: 4, small: true });
        this.jupiter = new Planet({ scene: this, x: 568, y: 107, anim: "Jupiter_anim", pos: 5, small: true });
        this.saturn = new Planet({ scene: this, x: 678, y: 107, anim: "Saturn_anim", pos: 6, small: true });
        this.uranus = new Planet({ scene: this, x: 788, y: 107, anim: "Uranus_anim", pos: 7, small: true });
        this.neptune = new Planet({ scene: this, x: 898, y: 107, anim: "Neptune_anim", pos: 8, small: true });

        //// BUTTONS ////
        this.Back = new Button({ scene: this, x: 128, y: 128, on: "Ship-on", off: "Ship-off", flip: false });
        this.Back.animateButton();
        this.BtnRight = new Button({ scene: this, x: 186, y: 192, on: "LeftRight-on", off: "LeftRight-off", flip: false });
        this.BtnLeft = new Button({ scene: this, x: 71, y: 192, on: "LeftRight-on", off: "LeftRight-off", flip: true });
        this.BtnEsc = new Button({ scene: this, x: 50, y: 19, on: "Esc-on", off: "Esc-off", flip: false });
        this.BtnStart = new Button({ scene: this, x: 128, y: 198, on: "Start-on", off: "Start-off", flip: false });
        this.BtnOptions = new Button({ scene: this, x: 207, y: 19, on: "Options-on", off: "Options-off", flip: false });

        this.textMercury = this.add.bitmapText(98, 20, "pixelFont", "MERCURY", 20).setTint(0xff8a56).setVisible(true);
        this.textVenus = this.add.bitmapText(108, 20, "pixelFont", "VENUS", 20).setTint(0xff8a56).setVisible(false);
        this.textEarth = this.add.bitmapText(108, 20, "pixelFont", "EARTH", 20).setTint(0xff8a56).setVisible(false);
        this.textMars = this.add.bitmapText(110, 20, "pixelFont", "MARS", 20).setTint(0xff8a56).setVisible(false);
        this.textJupiter = this.add.bitmapText(100, 20, "pixelFont", "JUPITER", 20).setTint(0xff8a56).setVisible(false);
        this.textSaturn = this.add.bitmapText(103, 20, "pixelFont", "SATURN", 20).setTint(0xff8a56).setVisible(false);
        this.textUranus = this.add.bitmapText(103, 20, "pixelFont", "URANUS", 20).setTint(0xff8a56).setVisible(false);
        this.textNeptune = this.add.bitmapText(98, 20, "pixelFont", "NEPTUNE", 20).setTint(0xff8a56).setVisible(false);



        //// CONTROLS ////
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        console.log(this.isUp);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (this.isUp) {
                if (this.optPosition) {
                    this.scene.start("options");
                } else {

                }
            } else {
                this.audStartLevel.play();
                this.BtnStart.animateButton();
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.registry.events.emit("changeSong", "lvl1", "menu");
                        this.scene.launch("HUD");
                        this.scene.start("level");
                    },
                    callbackScope: this,
                    loop: false

                });

            }
        }

        this.planets.getChildren().forEach((child) => {
            child.update();
        });
        //Between up and down
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
            if (!this.isUp) {
                this.optPosition = false;
                this.audChangePlanet.play();
                this.Back.desactivateButton();
                this.BtnEsc.animateButton();
            }
            this.isUp = true;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
            if (this.isUp) {
                this.audChangePlanet.play();
                this.Back.animateButton();
                this.BtnEsc.desactivateButton();
                this.BtnOptions.desactivateButton();
            }
            this.isUp = false;
        }
        //Move options
        if (this.isUp && Phaser.Input.Keyboard.JustDown(this.cursorKeys.left) && this.optPosition) {         //Left
            this.BtnEsc.animateButton();
            this.BtnOptions.desactivateButton();
            this.optPosition = false;
        } else if (this.isUp && Phaser.Input.Keyboard.JustDown(this.cursorKeys.right) && !this.optPosition) { //Right
            this.BtnEsc.desactivateButton();
            this.BtnOptions.animateButton();
            this.optPosition = true;
        }


        //Move Planets
        if (!this.isUp && Phaser.Input.Keyboard.JustDown(this.cursorKeys.left) && !(this.mercury.body.x <= 113 && this.mercury.body.x >= 112)) {         //Left
            if (!this.anyMovement()) {
                this.BtnLeft.animateButton();
                this.movePlanets(1)
            }
        } else if (!this.isUp && Phaser.Input.Keyboard.JustDown(this.cursorKeys.right) && !(this.neptune.body.x <= 113 && this.neptune.body.x >= 112)) { //Right
            if (!this.anyMovement()) {
                this.BtnRight.animateButton();
                this.movePlanets(-1)
            }
        }


    }

    anyMovement() {
        this.movement = false;
        this.planets.getChildren().forEach((child) => {
            if (child.body.velocity.x != 0) {
                this.movement = true;
            }
        });
        return this.movement;
    }

    startLevel() {

    }

    movePlanets(dir) {
        this.position = this.position - dir;
        this.audChangePlanet.play();
        this.planets.getChildren().forEach((child) => {
            child.managePlanet(dir);
        });
        this.changeText(this.position);
    }

    changeText(pos) {
        switch (pos) {
            case 1:
                this.textMercury.setVisible(true);
                this.textVenus.setVisible(false);
                break;
            case 2:
                this.textMercury.setVisible(false);
                this.textVenus.setVisible(true);
                this.textEarth.setVisible(false);
                break;
            case 3:
                this.textVenus.setVisible(false);
                this.textEarth.setVisible(true);
                this.textMars.setVisible(false);
                break;
            case 4:
                this.textEarth.setVisible(false);
                this.textMars.setVisible(true);
                this.textJupiter.setVisible(false);
                break;
            case 5:
                this.textMars.setVisible(false);
                this.textJupiter.setVisible(true);
                this.textSaturn.setVisible(false);
                break;
            case 6:
                this.textJupiter.setVisible(false);
                this.textSaturn.setVisible(true);
                this.textUranus.setVisible(false);
                break;
            case 7:
                this.textSaturn.setVisible(false);
                this.textUranus.setVisible(true);
                this.textNeptune.setVisible(false);
                break;
            case 8:
                this.textUranus.setVisible(false);
                this.textNeptune.setVisible(true);
                break;
        }

    }
}