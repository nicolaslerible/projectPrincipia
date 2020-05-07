class Basic extends Enemy {
    constructor(config) {
        super(config);

        //Animación        
        this.play("anim-galaxy");
        this.body.setSize(16,16);
        
    }

}