import CardDraggable from './CardDraggable.js';

export default class CardPlayer extends CardDraggable {
    constructor(data){
        let { health } = data;
        super(data);

        // set game objs
        this.textHealth = new Phaser.GameObjects.Text(this.scene, 0, -90, health, { fontSize: 20, align: 'center', color: 'black'});
        this.textMaxHealth = new Phaser.GameObjects.Text(this.scene, -20, -85, health, { fontSize: 12, align: 'center', color: 'black'});
        this.textArmor = new Phaser.GameObjects.Text(this.scene, 42, -94, 0, { fontSize: 20, align: 'center', color: 'black'});
        this.spriteArmor = new Phaser.GameObjects.Sprite(this.scene, 45, -80, 'armor');

        // add objs to container
        this.add([this.textHealth, this.textMaxHealth, this.spriteArmor, this.textArmor]);  

        // save vars
        this.maxHealth = health;
        this.health = health;
        this.armor = 0;
    }

    set health(newHealth){
        this._health = Math.min(newHealth, this.maxHealth); // don't heal over max health
        this.textHealth.text = this._health; // set display text
        this.textHealth.x = -46 - this.textHealth.width / 2;    // center
    }

    get health(){
        return this._health;
    }

    set maxHealth(newMaxHealth){
        this._maxHealth = newMaxHealth;
    }

    get maxHealth(){
        return this._maxHealth;
    }

    set armor(newArmor){
        this._armor = newArmor;
        this.textArmor.text = this._armor;
        // this.textArmor.x = 52 - this.textHealth.width / 2;    // center
        this.textArmor.alpha = this._armor == 0 ? 0:1;
        this.spriteArmor.alpha = this._armor == 0 ? 0:1;
    }

    get armor(){
        return this._armor;
    }

    attack(attackValue){
        if (attackValue <= this.armor){
            this.armor -= attackValue;
        } else {
            this.health -= (attackValue - this.armor);
            this.armor = 0;
        }
        if (this.health <= 0) this.dead = true;
    }

    set dead(dead){
        this.health = '0';
        this.cardName = 'DEAD';
        this.draggable = false;
        this.deadAnimation();
    }
    get dead(){
        return this._cardName == 'DEAD';
    }
}