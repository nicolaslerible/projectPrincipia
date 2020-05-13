class Basic extends Enemy {
    constructor(config) {
        super(config);

        this.moveSet = config.movement;
        this.odd = config.odd;

        //Animación        
        this.play("anim-galaxy");
        this.body.setSize(16, 16);

    }

    moveShip() {
        switch (this.moveSet) {
            case 1:
                this.moveSet1();
                break;
            case 2:
                this.moveSet2();
                break;
        }
    }

    moveSet1() {
        if (this.x > 800) {
            this.resetShipPos(0, 0);
        }

        if (this.x < (this.totalX / 3)) {
            this.body.velocity.y = 150;
            this.body.velocity.x = 150;
        } else if (this.x > ((2 * this.totalX) / 3)) {
            this.body.velocity.y = -150;
            this.body.velocity.x = 150;
        } else {
            this.body.velocity.y = 0;
            this.body.velocity.x = 190;
        }
    }

    moveSet2() {
        if (this.x < -200 || this.x > 456) {
            this.resetShipPos(128, 0);
        }

        if (this.y < 150) {
            this.body.velocity.x = 0;
            this.body.velocity.y = 190;
        } else {
            if (this.odd % 2 == 0) {
                this.body.velocity.y = 0;
                this.body.velocity.x = 150;
            } else {
                this.body.velocity.y = 0;
                this.body.velocity.x = -150;
            }
        }



    }

}