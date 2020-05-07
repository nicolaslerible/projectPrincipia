class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  ///////////  PRELOAD  ///////////
  preload() {
    //Background
    this.load.image("Back01", "assets/images/Back01.png");
    this.load.image("Back02", "assets/images/Back02.png");


    //create a background and prepare loading bar
    this.fullBar = this.add.graphics();
    this.fullBar.fillStyle(0x660066, 1);
    this.fullBar.fillRect((this.cameras.main.width / 4) - 2, (this.cameras.main.height / 2) - 18, (this.cameras.main.width / 2) + 4, 20);
    this.progress = this.add.graphics();

    //pass loading progress as value to loading bar and redraw as files load
    this.load.on('progress', function (value) {
      this.progress.clear();
      this.progress.fillStyle(0x990099, 1);
      this.progress.fillRect((this.cameras.main.width / 4), (this.cameras.main.height / 2) - 16, (this.cameras.main.width / 2) * value, 16);
    }, this);

    //cleanup our graphics on complete
    this.load.on('complete', function () {
      this.progress.destroy();
      this.fullBar.destroy();
    }, this);

    //Titulo animado
    this.load.spritesheet("Titulo", "assets/spritesheets/Titulo.png", {
      frameWidth: 128,
      frameHeight: 20
    });
    //// MENU ////
    //Background
    this.load.spritesheet("Bg-ship", "assets/spritesheets/ChooseLevel/innership.png", { frameWidth: 256, frameHeight: 256 });
    //Button Left-Right
    this.load.spritesheet("Btn-LeftRight", "assets/spritesheets/ChooseLevel/ButtonLR.png", { frameWidth: 21, frameHeight: 20 });
    //Button Start
    this.load.spritesheet("Btn-Start", "assets/spritesheets/ChooseLevel/ButtonStart.png", { frameWidth: 62, frameHeight: 20 });
    //Button ESC
    this.load.spritesheet("Btn-Esc", "assets/spritesheets/ChooseLevel/ButtonEsc.png", { frameWidth: 20, frameHeight: 20 });
    //Button Options
    this.load.spritesheet("Btn-Options", "assets/spritesheets/ChooseLevel/ButtonOptions.png", { frameWidth: 20, frameHeight: 20 });
    
    //// OPTIONS ////
    //Background
    this.load.spritesheet("Bg-Options", "assets/spritesheets/Options/options.png", { frameWidth: 256, frameHeight: 256 });

    //// MERCURY ////
    //Planet
    this.load.spritesheet("Pl-Mercury", "assets/Planets/Mercury/planet.png", { frameWidth: 32, frameHeight: 32 });

    //// VENUS ////
    //Planet
    this.load.spritesheet("Pl-Venus", "assets/Planets/Venus/planet.png", { frameWidth: 32, frameHeight: 32 });

    //// EARTH ////
    //Planet
    this.load.spritesheet("Pl-Earth", "assets/Planets/Earth/planet.png", { frameWidth: 32, frameHeight: 32 });

    //// MARS ////
    //Planet
    this.load.spritesheet("Pl-Mars", "assets/Planets/Mars/planet.png", { frameWidth: 32, frameHeight: 32 });

    //// JUPITER ////
    //Planet
    this.load.spritesheet("Pl-Jupiter", "assets/Planets/Jupiter/planet.png", { frameWidth: 32, frameHeight: 32 });

    //// SATURN ////
    //Planet
    this.load.spritesheet("Pl-Saturn", "assets/Planets/Saturn/planet.png", { frameWidth: 32, frameHeight: 32 });

    //// URANUS ////
    //Planet
    this.load.spritesheet("Pl-Uranus", "assets/Planets/Uranus/planet.png", { frameWidth: 32, frameHeight: 32 });

    //// NEPTUNE ////
    //Planet
    this.load.spritesheet("Pl-Neptune", "assets/Planets/Neptune/planet.png", { frameWidth: 32, frameHeight: 32 });

    //// ENEMIES ////
    //galaxy
    this.load.spritesheet("galaxy", "assets/spritesheets/enemies/galaxy.png", { frameWidth: 16, frameHeight: 16 });
    //Sprite ship2
    this.load.spritesheet("ship2", "assets/spritesheets/enemies/ship2.png", {
      frameWidth: 32,
      frameHeight: 16
    });

    //Sprite explosión
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    //Sprite PowerUp
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    //Sprite player
    this.load.spritesheet("player", "assets/spritesheets/player.png", {
      frameWidth: 16,
      frameHeight: 24,
    });

    //Sprite beam
    this.load.spritesheet("beam", "assets/spritesheets/beam.png", {
      frameWidth: 5,
      frameHeight: 8
    });

    //Music
    this.load.audio("mus-menu", ["assets/sounds/music/Mus-Menu.wav", "assets/sounds/music/Mus-Menu.ogg"]);
    this.load.audio("mus-lv1", ["assets/sounds/music/Mus-Nivel1.mp3", "assets/sounds/music/Mus-Nivel1.ogg"]);
    this.load.audio("mus-lv2", ["assets/sounds/music/Mus-Nivel2.mp3", "assets/sounds/music/Mus-Nivel2.ogg"]);
    this.load.audio("mus-lv3", ["assets/sounds/music/Mus-Nivel3.mp3", "assets/sounds/music/Mus-Nivel3.ogg"]);
    this.load.audio("mus-lv4", ["assets/sounds/music/Mus-Nivel4.mp3", "assets/sounds/music/Mus-Nivel4.ogg"]);
    ////  EFFECTS ////
    // Menu
    this.load.audio("aud-changePlanet", ["assets/sounds/effects/changePlanet.wav", "assets/sounds/beam.mp3"]);
    this.load.audio("aud-startLevel", ["assets/sounds/effects/startLevel.wav", "assets/sounds/beam.mp3"]);

    this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
    this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);

    //Fuente pixelFont
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
  }


  ///////////  CREACION  ///////////
  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("gameMenu");
    //// MENU ////
    //Background ship
    this.anims.create({ key: "Ship-on", frames: this.anims.generateFrameNumbers("Bg-ship", { start: 0, end: 3, }), frameRate: 18, repeat: 0 });
    this.anims.create({ key: "Ship-off", frames: this.anims.generateFrameNumbers("Bg-ship", { start: 3, end: 6, }), frameRate: 18, repeat: 0 });
    //Button Left-Right
    this.anims.create({ key: "LeftRight-on", frames: this.anims.generateFrameNumbers("Btn-LeftRight", { start: 0, end: 1, }), frameRate: 2, repeat: 0 });
    this.anims.create({ key: "LeftRight-off", frames: this.anims.generateFrameNumbers("Btn-LeftRight", { start: 1, end: 1, }), frameRate: 2, repeat: 0 });
    //Button ESC
    this.anims.create({ key: "Esc-on", frames: this.anims.generateFrameNumbers("Btn-Esc", { start: 1, end: 1, }), frameRate: 2, repeat: 0 });
    this.anims.create({ key: "Esc-off", frames: this.anims.generateFrameNumbers("Btn-Esc", { start: 0, end: 0, }), frameRate: 2, repeat: 0 });
    //Button Start
    this.anims.create({ key: "Start-on", frames: this.anims.generateFrameNumbers("Btn-Start", { start: 1, end: 1, }), frameRate: 2, repeat: 0 });
    this.anims.create({ key: "Start-off", frames: this.anims.generateFrameNumbers("Btn-Start", { start: 0, end: 0, }), frameRate: 2, repeat: 0 });
    //Button Options
    this.anims.create({ key: "Options-on", frames: this.anims.generateFrameNumbers("Btn-Options", { start: 0, end: 0, }), frameRate: 2, repeat: 0 });
    this.anims.create({ key: "Options-off", frames: this.anims.generateFrameNumbers("Btn-Options", { start: 1, end: 1, }), frameRate: 2, repeat: 0 });
    
    //// OPTIONS ////
    //Background ship
    this.anims.create({ key: "ShipOptions-on", frames: this.anims.generateFrameNumbers("Bg-Options", { start: 0, end: 6, }), frameRate: 18, repeat: 0 });
    //this.anims.create({ key: "ShipOptions-off", frames: this.anims.generateFrameNumbers("Bg-Options", { start: 3, end: 6, }), frameRate: 18, repeat: 0 });

    //// PLANETS ANIMATION ////
    //Planet Mercury
    this.anims.create({ key: "Mercury_anim", frames: this.anims.generateFrameNumbers("Pl-Mercury"), frameRate: 15, repeat: -1 });
    //Planet Venus
    this.anims.create({ key: "Venus_anim", frames: this.anims.generateFrameNumbers("Pl-Venus"), frameRate: 15, repeat: -1 });
    //Planet Earth
    this.anims.create({ key: "Earth_anim", frames: this.anims.generateFrameNumbers("Pl-Earth"), frameRate: 15, repeat: -1 });
    //Planet Mars
    this.anims.create({ key: "Mars_anim", frames: this.anims.generateFrameNumbers("Pl-Mars"), frameRate: 15, repeat: -1 });
    //Planet Jupiter
    this.anims.create({ key: "Jupiter_anim", frames: this.anims.generateFrameNumbers("Pl-Jupiter"), frameRate: 15, repeat: -1 });
    //Planet Saturn
    this.anims.create({ key: "Saturn_anim", frames: this.anims.generateFrameNumbers("Pl-Saturn"), frameRate: 15, repeat: -1 });
    //Planet Uranus
    this.anims.create({ key: "Uranus_anim", frames: this.anims.generateFrameNumbers("Pl-Uranus"), frameRate: 15, repeat: -1 });
    //Planet Neptune
    this.anims.create({ key: "Neptune_anim", frames: this.anims.generateFrameNumbers("Pl-Neptune"), frameRate: 15, repeat: -1 });

    //// ENEMIES ////
    // Galaxy
    this.anims.create({
      key: "anim-galaxy",
      frames: this.anims.generateFrameNumbers("galaxy"),
      frameRate: 20,
      repeat: -1
    });
    // Animación Titulo
    this.anims.create({ key: "Titulo_anim", frames: this.anims.generateFrameNumbers("Titulo"), frameRate: 15, repeat: -1 });

    // Animación Nave 2
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    // Animación Explosión
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    // Animación PowerUp rojo
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    // Animación PowerUp gris
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    // Animación jugador 1
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 1,
      }),
      frameRate: 20,
      repeat: -1
    });
    // Animación jugador 2 
    this.anims.create({
      key: "friend",
      frames: this.anims.generateFrameNumbers("player", {
        start: 2,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1
    });


    // Animación beam
    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });

  }
}
