class Title extends Phaser.Scene {
  constructor() {
    super({ key: 'Title' });
  }
  preload() {
    //Load required sprites
    //this.load.spritesheet("socks", "assets/sprites/socks.png", { frameWidth: 16, frameHeight: 16 });
  }
  create() {
    //Create and style the title
    let titleText = this.add.text(200, 10, 'Game Title', { fontFamily: 'FiveBySeven', fontSize: '50px', fill: '#f4f4f4', align: "center", lineSpacing: -25 });
    titleText.setOrigin(titleText.halfWidth, 0);
    titleText.setShadow(-6, 6, "#454545", 0);
    titleText.setDepth(1);

    
    //Create, style, and set interactions for the play button
    let playButton = this.add.text(200, 100, 'Play Game', { fontFamily: 'FiveBySeven', fontSize: '30px', fill: '#f4f4f4' });
    playButton.setOrigin(playButton.halfWidth, 0);
    playButton.setDepth(1);
    playButton.setInteractive();
    
    //On hover: change color and scale
    playButton.on('pointerover', () => {
      playButton.setFill("#94b0c2");
      playButton.setScale(1.1);
    });
    
    //No hover: reset color and scale
    playButton.on('pointerout', () => {
      playButton.setFill("#f4f4f4");
      playButton.setScale(1);
    });
    
    //On click: start the game
    playButton.on('pointerup', () => {
      gameState.nextLevel = true;
    });*/
  }
  update() {
    if (gameState.nextLevel) {
      gameState.nextLevel = false;
      //Start playing the game's music
      //document.querySelector(".music").play(); //Uncomment when music for the game has been created
      this.scene.stop("Title");
      this.scene.start("Scene1");
    };
  }
};
