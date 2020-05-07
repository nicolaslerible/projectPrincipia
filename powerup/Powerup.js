class Powerup extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.anim);

        //Nombre del powerup
        this.key = config.key;
        

        //Añadir al grupo "powerups"
        config.scene.powerups.add(this);

        //Configuración

        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        
        this.body.setVelocityY(20);
        
        //Animación
        if (config.anim > 0.5) {
            this.anim = "red";
            this.play("red");
        } else {
            this.anim = "gray";
            this.play("gray");
        }
        this.body.setSize(16,16);

    }
}