class Mercury{
  constructor(config) {

    ///////////  PARAMS  /////////// 
    this.scene = config.scene;
    this.width = config.width;
    this.height = config.height;
    
    //Background
    this.scene.Back01 = this.scene.add.tileSprite(0, 0, this.width, this.height, "Back01").setOrigin(0, 0);
    this.scene.Back02 = this.scene.add.tileSprite(0, 0, this.width, this.height, "Back02").setOrigin(0, 0);

  }

  firstHorde(){
    for(var i=0;i<15;i++){
      this.scene.time.addEvent({
        delay: 200*i,
        callback: () => {
          this.MakeU();
        },
        callbackScope: this,
        loop: false
      });
    }
  }

  MakeU(){
    console.log(this.width);
    this.scene.enemy1 = new Basic({
      scene: this.scene,
      x: 16,
      y: 16,
      movement: "U-move",
      w: this.width,
      h: this.height
    });
  }

  manageLevel(){
    //Movimiento vertical del Background
    this.scene.Back02.tilePositionY -= 0.3;
  }

}