class Enemy extends Phaser.GameObjects.Sprite {
    constructor(config) {
      super(config.scene, config.x, config.y);
  
      //PARAMS//
      //Scene
      this.scene = config.scene;
      this.totalX = config.w;
      this.totalY = config.h;
      this.movement = config.movement;
  
      //Configuración
      this.scene.physics.world.enable(this);
      this.scene.add.existing(this);
      this.setInteractive();
  
      //Añadir al grupo "enemies"
      this.scene.enemies.add(this);

      

    }

    update(){
      switch(this.movement){
        case "U-move":
          if(this.x < (this.totalX/3) ){
            this.body.velocity.y = 100;
            this.body.velocity.x = 100;
          }else if (this.x > ((2*this.totalX)/3)){
            this.body.velocity.y = -100;
            this.body.velocity.x = 100;
          }else{
            this.body.velocity.y = 0;
            this.body.velocity.x = 130;
          }
          
        break;
      }

    }
  
    //Resetear posicion de la nave
    resetShipPos() {
      this.y = 16;
      this.x = 16;
    }
  }