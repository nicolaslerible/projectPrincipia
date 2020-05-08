class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    ///////////  PARAMS  /////////// 
    this.scene = config.scene;
    this.key = config.key;
    this.score = 0;
    this.lives = 3;
    this.power = 1;

    //Grupo proyectiles
    this.scene.projectiles = this.scene.add.group();
    this.scene.beamSound = this.scene.sound.add("audio_beam");

    this.depth = 5;

    //Configuration
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setCollideWorldBounds(true);

    //Movement
    this.scene.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    //Shoot button
    this.scene.keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    //Recoger PowerUp
    //this.scene.physics.add.overlap(this.scene.players, this.scene.powerups, this.scene.pickPowerUp, null, this.scene);

    //Animación especifica P1/P2
    if (this.key == "player") {
      this.play("thrust");
      this.setSize(16, 24);
    } else {
      this.play("friend");
      this.setSize(16, 24);
    }


  }

  ///////////  FUNCIONES  /////////// 

  //Level Up
  levelUp(powerUp) {
    if (powerUp.anim == "red") {
      this.power++;
    } else {
      this.updateLives(this.scene, 1);
    }

  }

  //Actualiza la puntuación
  updateScore(scene, pts) {
    this.score = this.score + pts;
    scene.events.emit("scoreChange", this);
  }

  //Actualiza las vidas
  updateLives(scene, hp) {
    this.lives = this.lives + (hp);
    scene.events.emit("livesChange", this);
  }

  //Transparencia e inmunidad
  hitted(scene, enemy) {
    if (this.alpha == 1) {
      enemy.resetShipPos();
      if (this.alpha < 1) {
        return;
      }
      this.alpha = 0.4;
      var explosion = new Explosion(scene, this.x, this.y);
      this.disableBody(true, true);

      scene.time.addEvent({
        delay: 1000,
        callback: () => {
          this.reset(scene);
        },
        callbackScope: this,
        loop: false
      });

      this.updateLives(scene, -1)
    }
  }

  //Animacion de aparición
  reset(scene) {
    if (this.lives > 0) {
      var x = config.width / 2 - 8;
      var y = config.height + 64;
      this.enableBody(true, x, y, true, true);

      this.alpha = 0.5;

      var tween = scene.tweens.add({
        targets: this,
        y: config.height - 64,
        ease: 'Power1',
        duration: 1500,
        repeat: 0,
        onComplete: function () {
          this.alpha = 1;
        },
        callbackScope: this
      });
    }
  }

  //Movement
  movePlayerManager() {

    this.body.setVelocity(0);

    if (this.key == "player") {
      if (this.scene.cursorKeys.left.isDown) {                //Left
        this.body.setVelocityX(-gameSettings.playerSpeed);
      } else if (this.scene.cursorKeys.right.isDown) {        //Right
        this.body.setVelocityX(gameSettings.playerSpeed);
      }
      if (this.scene.cursorKeys.up.isDown) {                  //Up
        this.body.setVelocityY(-gameSettings.playerSpeed);
      } else if (this.scene.cursorKeys.down.isDown) {         //Down
        this.body.setVelocityY(gameSettings.playerSpeed);
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.scene.keyZ) && this.alpha > 0.4) { //Shoot
      this.shoot();
    }

    //Destroy Beams
    this.scene.projectiles.getChildren().forEach((child) => {
      child.update();
    });
  }

  shoot() {

    this.scene.beamSound.play();

    if (this.power == 1) {
      var beam = new Beam(this.scene, this, 0, -250, 0);
    } else if (this.power == 2) {
      var beam = new Beam(this.scene, this, 0, -250, -4);
      var beam = new Beam(this.scene, this, 0, -250, 4);
    } else if (this.power == 3) {
      var beam = new Beam(this.scene, this, 0, -250, -4);
      var beam = new Beam(this.scene, this, 0, -250, 4);
      var beam = new Beam(this.scene, this, -176, -176, 0);
      var beam = new Beam(this.scene, this, 176, -176, 0);
    }
  }

}