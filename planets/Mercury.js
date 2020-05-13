class Mercury {
  constructor(config) {

    ///////////  PARAMS  /////////// 
    this.scene = config.scene;
    this.width = config.width;
    this.height = config.height;

    //Background
    this.scene.Back01 = this.scene.add.tileSprite(0, 0, this.width, this.height, "Back01").setOrigin(0, 0);
    this.scene.Back02 = this.scene.add.tileSprite(0, 0, this.width, this.height, "Back02").setOrigin(0, 0);

  }

  firstHorde() {
    this.scene.time.addEvent({ delay: 1000, callback: () => { this.makeU(); }, callbackScope: this, loop: false });
    this.scene.time.addEvent({ delay: 6000, callback: () => { this.makeSplit(); }, callbackScope: this, loop: false });

  }

  makeU() {
    for (var i = 0; i < 15; i++) {
      this.scene.time.addEvent({
        delay: 200 * i,
        callback: () => {
          this.scene.enemy1 = new Basic({ scene: this.scene, x: 16, y: 16, movement: 1, w: this.width, h: this.height ,loop: 3});
        },
        callbackScope: this,
        loop: false
      });
    }
  }

  makeSplit(){
    this.odd = 1;
    for (var i = 0; i < 8; i++) {
      this.scene.time.addEvent({
        delay: 200 * i,
        callback: () => {
          this.alternateDirection();
          
        },
        callbackScope: this,
        loop: false
      });
    }
  }

  alternateDirection(){
    this.scene.enemy2 = new Basic({ scene: this.scene, x: 128, y: 16, movement: 2, w: this.width, h: this.height ,loop: 5, odd: this.odd});
    this.odd++;
  }

  manageLevel() {
    //Movimiento vertical del Background
    this.scene.Back02.tilePositionY -= 0.3;
  }

}