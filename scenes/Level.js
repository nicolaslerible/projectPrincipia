class Level extends Phaser.Scene {
  constructor() {
    super("level");
  }

  create() {

    ///////////  GROUPS  ///////////
    //Players
    this.players = this.add.group();
    //Enemies
    this.enemies = this.add.group();
    //Powerups
    this.powerups = this.add.group();

    //General Sounds
    this.explosionSound = this.sound.add("audio_explosion");
    this.pickupSound = this.sound.add("audio_pickup");

    //Mercury
    this.planet = new Mercury({
      scene: this,
      width: config.width,
      height: config.height
    });

    //Player 1
    this.player = new Player({
      scene: this,
      x: config.width / 2 - 8,
      y: config.height - 64,
      key: "player"
    });
    this.players.add(this.player);

    //Basic Enemy
    this.planet.firstHorde();

    //Powerup 
    this.powerup = new Powerup({
      scene: this,
      x: config.height / 2,
      y: 50,
      key: "powerup",
      anim: Math.random()
    });

    //Menu
    this.exit = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


    ///////////  General Settings  ///////////
    //Recoger PowerUp
    this.physics.add.overlap(this.players, this.powerups, this.pickPowerUp, null, this);

    //Chocar Naves
    this.physics.add.overlap(this.players, this.enemies, this.hurtPlayer, null, this);

    //Disparar Naves
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

    ///////////  INTERFAZ  ///////////
    //Inicializar valores del HUD
    this.player.updateScore(this, 0);
    this.player.updateLives(this, 0);
    if (this.registry.get("MultiPlay")) {
      this.friend.updateScore(this, 0);
      this.friend.updateLives(this, 0);
    }

    this.events.emit("makeEnemy");

  }  //Fin del Create

  ///////////  MECANICAS  ///////////

  sayHi() {
    console.log("wave");
  }

  //Aumentar vida del jugador al coger un powerUp
  pickPowerUp(player, powerUp) {
    this.pickupSound.play();
    powerUp.destroy();
    player.levelUp(powerUp);
  }


  //Quitar una vida al jugador cuando impacta contra una nave
  hurtPlayer(player, enemy) {
    this.explosionSound.play()
    player.hitted(this, enemy);

    if (this.registry.get("MultiPlay")) {
      if (this.player.lives <= 0 && this.friend.lives <= 0) {
        this.endGame();
      }
    } else {
      if (this.player.lives <= 0) {
        this.endGame();
      }
    }
  }

  //Termina el juego y redirige a la pantalla GameOver
  endGame() {
    this.physics.pause();
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on("camerafadeoutcomplete", () => {
          this.events.emit("gameOver");
          this.changeScene("gameOver");
        });
      },
      callbackScope: this,
      loop: false

    });
  }

  //Redirige a la pantalla seleccionada
  changeScene(goto) {
    this.scene.start(goto);
  }



  //Resetea nave al disparale
  hitEnemy(projectile, enemy) {
    this.explosionSound.play();
    var explosion = new Explosion(this, enemy.x, enemy.y);
    if (projectile.name == "player") {
      this.player.updateScore(this, 15);
    } else {
      this.friend.updateScore(this, 15);
    }

    projectile.destroy();
    enemy.destroy();
  }

  update() {

    this.planet.manageLevel();

    //Manages movement
    this.player.movePlayerManager();

    //Manages Enemies
    this.enemies.getChildren().forEach((child) => {
      child.update();
    });

    //Redirige al menú
    if (Phaser.Input.Keyboard.JustDown(this.exit)) {
      this.events.emit("gameOver");
      this.changeScene("gameMenu");
    }

  }  //Fin del Update
}