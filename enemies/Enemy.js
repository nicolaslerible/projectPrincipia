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
      
      this.moveShip();

    }
  
    //Resetear posicion de la nave
    resetShipPos() {
      this.y = 16;
      this.x = 16;
    }
  }