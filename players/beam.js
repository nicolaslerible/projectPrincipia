class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene, player, velx, vely, posx) {

    //Posición
    var x = player.x + posx;
    var y = player.y;
    

    super(scene, x, y, "beam");

    //Nombre del jugador que dispara
    this.name = player.key;

    //Escena
    scene.add.existing(this);

    //Animación y movimiento
    this.play("beam_anim");

    if(velx > 0){
      this.angle = 45;
    }else if(velx < 0){
      this.angle = -45;
    }

    scene.physics.world.enableBody(this);
    //Movimiento
    this.body.velocity.y = vely;
    this.body.velocity.x = velx;

    //Añadir beam al grupo proyectiles
    scene.projectiles.add(this);
  }
  


  update() {

    //Actualiza su posición
    if (this.y < 0) {
      this.destroy();
      console.log("pew");
    }
  }
}
