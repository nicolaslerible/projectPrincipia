var gameSettings = {
  playerSpeed: 200,
  maxPowerups: 2,
  powerUpVel: 50,
}

var config = {
  width: 256,
  height: 272,
  backgroundColor: 0x110011,
  scene: [Preload, Level, GameOver, GameMenu, HUD, ChooseLevel, GameController, OptionsMenu],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
}


var game = new Phaser.Game(config);
