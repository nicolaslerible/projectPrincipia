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

    if (this.isSmall) {
      this.startSmall();
    }

    //Añadir beam al grupo proyectiles
    this.scene.planets.add(this);


  }

  update() {

    console.log(this.animation + ": " + this.body.x);

  }

  startSmall() {
    this.size = this.size - 0.5;
    this.setScale(this.size);
  }

  managePlanet(dir) {
    if (this.body.x <= 113 && this.body.x == 112) {
      this.changeSize(-1);
    } else if (((this.body.x >= 230 && this.body.x <= 231) && dir < 0) || ((this.body.x <= 11 && this.body.x >= 10) && dir > 0)) {
      this.changeSize(1);
    }
    for (var i = 0; i < 10; i++) {
      this.scene.time.addEvent({
        delay: 15 * i,
        callback: () => {
          this.x += 11 * dir;
        },
        callbackScope: this,
        loop: false
      });
    }
  }

  changeSize(dir) {

    for (var i = 0; i < 10; i++) {
      this.scene.time.addEvent({
        delay: 15 * i,
        callback: () => {
          this.size += 0.05*dir;
          this.setScale(this.size);
        },
        callbackScope: this,
        loop: false
      });
    }
  }

}