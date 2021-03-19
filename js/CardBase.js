export default class CardBase extends Phaser.GameObjects.Container {
    constructor(data){
        // setup objects
        let { scene, x, y, name, card, image, depth } = data;
        let spriteCard = new Phaser.GameObjects.Sprite(scene, 0, 0, card);
        let spriteImage = new Phaser.GameObjects.Sprite(scene, 0, 20, image);
        let textName = new Phaser.GameObjects.Text(scene, 0, 0, name, {
            fontSize: 16,
            align: 'center',
            color: 'black',
            wordWrap: {
                width: spriteCard.width - 10
            }
        });

        // call container constructor
        super(scene, x, y, [spriteCard, spriteImage, textName]);

        // save vars
        this.spriteCard = spriteCard;
        this.spriteImage = spriteImage;
        this.textName = textName;
        this.cardName = name;
        this.depth = depth;
        this.scene = scene;

        // add container to scene
        this.scene.add.existing(this);
    }

    set cardName(newName){
        this._cardName = newName;
        this.textName.text = this._cardName;
        this.textName.x = -this.textName.width / 2; // center text
        this.textName.y = 115 - this.textName.height;   // anchor to bottom
    }

    deadAnimation(){
        this.scene.tweens.add({
            targets: this.spriteImage,
            alpha: 0,
            duration: 100,
            repeat: 1,
            yoyo: true,
            onComplete: () => {
                this.spriteImage.setTexture('dead');
            }
        });
    }
}