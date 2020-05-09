class Basic extends Enemy {
    constructor(config) {
        super(config);

        //Animación        
        this.play("anim-galaxy");
        this.body.setSize(16, 16);

    }

    moveShip() {
        if (this.x < (this.totalX / 3)) {
            this.body.velocity.y = 100;
            this.body.velocity.x = 100;
        } else if (this.x > ((2 * this.totalX) / 3)) {
            this.body.velocity.y = -100;
            this.body.velocity.x = 100;
        } else {
            this.body.velocity.y = 0;
            this.body.velocity.x = 130;
        }
    }

}