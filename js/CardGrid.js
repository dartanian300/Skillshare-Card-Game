import CardBase from './CardBase.js';

export default class CardGrid extends CardBase {
    constructor(data){
        let { value, type } = data;
        super(data);

        // setup game objs
        this.textValue = new Phaser.GameObjects.Text(this.scene, 0, -105, value, {fontSize: 28, align: 'center', color: 'black'});
        
        // add game objs to container
        this.add(this.textValue);

        // save vars
        this.value = value;
        this.cardType = type;
    }

    set value(newValue){
        this._value = newValue;
        this.textValue.text = this._value;
        this.textValue.x = -42 - this.textValue.width / 2;
        this.textValue.tint = 0;
    }

    get value(){
        return this._value;
    }

    set highlighted(highlight){
        if (highlight){
            this.spriteCard.tint = 0xcccc88;
            this.spriteImage.tint = 0xcccc88;
        } else {
            this.spriteCard.tint = 0xffffff;
            this.spriteImage.tint = 0xffffff;
        }
    }
}