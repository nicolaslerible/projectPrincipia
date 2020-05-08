class Planet extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);

    //PARAMS//
    //Scene
    this.scene = config.scene;
    this.size = 1;
    this.animation = config.anim;
    this.isSmall = config.small;
    this.position = config.pos;

    //Animación        
    this.play(this.animation);

    //Configuración
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setInteractive();

    if(this.isSmall){
      this.startSmall();
    }

    //Añadir beam al grupo proyectiles
    this.scene.planets.add(this);
    

  }

  update(){

    console.log(this.animation + ": " + this.body.x);

    if(this.body.x <= -146 && this.body.x > -147){
      this.body.velocity.x = 0;
      this.setPosition(-138.5, 107);
    }else if(this.body.x <= -121 && this.body.x > -122){
      this.body.velocity.x = 0;
      this.setPosition(-113.5, 107);
    }else if(this.body.x <= -96 && this.body.x > -97){
      this.body.velocity.x = 0;
      this.setPosition(-88.5, 107);
    }else if(this.body.x <= -71 && this.body.x > -72){
      this.body.velocity.x = 0;
      this.setPosition(-63.5, 107);
    }else if(this.body.x <= -46 && this.body.x > -47){
      this.body.velocity.x = 0;
      this.setPosition(-38.5, 107);
    }else if(this.body.x <= -21 && this.body.x > -22){
      this.body.velocity.x = 0;
      this.setPosition(-13.5, 107);
    }else if(this.body.x <= 4 && this.body.x > 3){
      this.body.velocity.x = 0;
      this.setPosition(11.5, 107);
    }else if (this.body.x <= 113 && this.body.x >= 112){  //center
      this.body.velocity.x = 0;
      this.setPosition(128.5, 107);
    }else if(this.body.x >= 237 &&  this.body.x <= 238){//
      this.body.velocity.x = 0;
      this.setPosition(245.5, 107);
    }else if(this.body.x >= 262 &&  this.body.x <= 263){
      this.body.velocity.x = 0;
      this.setPosition(270.5, 107);
    }else if(this.body.x >= 287 &&  this.body.x <= 288){ 
      this.body.velocity.x = 0;
      this.setPosition(295.5, 107);
    }else if(this.body.x >= 312 &&  this.body.x <= 313){
      this.body.velocity.x = 0;
      this.setPosition(320.5, 107);
    }else if(this.body.x >= 337 &&  this.body.x <= 338){
      this.body.velocity.x = 0;
      this.setPosition(345.5, 107);
    }else if(this.body.x >= 362 &&  this.body.x <= 363){
      this.body.velocity.x = 0;
      this.setPosition(370.5, 107);
    }else if(this.body.x >= 387 &&  this.body.x <= 388){
      this.body.velocity.x = 0;
      this.setPosition(395.5, 107);
    }

  }

  managePlanet(dir) {
    this.body.velocity.x = 500*dir;
    this.changeSize();
  }

  startSmall(){
    this.size = this.size - 0.5;
    this.setScale(this.size);
  }

  changeSize() {
    if (this.body.x <= 113 && this.body.x >= 112) {
      for (var i = 0; i < 10; i++) {
        this.scene.time.addEvent({
          delay: 15 * i,
          callback: () => {
            this.size = this.size - 0.05;
            this.setScale(this.size);
          },
          callbackScope: this,
          loop: false
        });
      }
    }else if((this.body.x >= 237 &&  this.body.x <= 238) && this.body.velocity.x < 0){
      for (var i = 0; i < 10; i++) {
        this.scene.time.addEvent({
          delay: 25 * i,
          callback: () => {
            this.size = this.size + 0.05;
            this.setScale(this.size);
          },
          callbackScope: this,
          loop: false
        });
      }
    }else if(this.body.velocity.x > 0 && (this.body.x <= 4 && this.body.x > 3)){
      for (var i = 0; i < 10; i++) {
        this.scene.time.addEvent({
          delay: 25 * i,
          callback: () => {
            this.size = this.size + 0.05;
            this.setScale(this.size);
          },
          callbackScope: this,
          loop: false
        });
      }
    }

  }
}