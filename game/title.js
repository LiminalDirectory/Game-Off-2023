class Title extends Phaser.Scene {
  constructor() {
    super({ key: 'Title' });
  }
  preload() {
    //Load required sprites
    this.load.image("mapBG", "assets/sprites/MapBG.png");
  }
  create() {
    //Create map background image
    this.add.sprite(200, 112, "mapBG").setDepth(0);
    
    //Create and style the title
    let titleText = this.add.text(200, 10, "The Serpent's Scale", { fontFamily: 'FiveBySeven', fontSize: '50px', fill: '#051A24', align: "center", lineSpacing: -25 });
    titleText.setOrigin(titleText.halfWidth, 0);
    titleText.setShadow(-6, 6, "#E6994C", 0);
    titleText.setDepth(1);

    
    //Create, style, and set interactions for the play button
    let playButton = this.add.text(200, 100, 'Play Game', { fontFamily: 'FiveBySeven', fontSize: '30px', fill: '#051A24' });
    playButton.setOrigin(playButton.halfWidth, 0);
    playButton.setDepth(1);
    playButton.setInteractive();
    
    //On hover: change color and scale
    playButton.on('pointerover', () => {
      playButton.setFill("#E6994C");
      playButton.setScale(1.1);
    });
    
    //No hover: reset color and scale
    playButton.on('pointerout', () => {
      playButton.setFill("#051A24");
      playButton.setScale(1);
    });
    
    //On click: start the game
    playButton.on('pointerup', () => {
      gameState.nextScene = true;
    });
  }
  update() {
    if (gameState.nextScene) {
      gameState.nextScene = false;
      //Start playing the game's music
      //document.querySelector(".music").play(); //Uncomment when music for the game has been created
      this.scene.stop("Title");
      this.scene.start("Scene1");
    };
  }
};
