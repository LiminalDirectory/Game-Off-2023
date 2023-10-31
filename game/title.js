class Title extends Phaser.Scene {
  constructor() {
    super({ key: 'Title' });
  }
  preload() {
    //Load required sprites
    //this.load.spritesheet("socks", "assets/sprites/socks.png", { frameWidth: 16, frameHeight: 16 });
  }
  create() {
    /*
    //Falling images background function
    //Sock counter used to properly z-index falling socks
    let sockCounter = 0;
    //X value of previous sock to make sure they fall more than a certain amount of pixel apart
    let previousSockX = 0;
    //Infinite loop
    this.time.addEvent({
      callback: function() {
        //Randomly generate a sock's x value (10 < x < 390) and it's ratation (-180 degrees, -90 degrees, 0 degrees, or 90 degrees)
        let sockX = Math.floor(Math.random() * 381) + 10;
        let sockAngle = (Math.floor(Math.random() * 4) - 2) * 90;

        //Regenerate the sock's x value until it is at least 10 pixels more or less than the previous sock's x value
        while (true) {
          if (sockX > previousSockX + 10 || sockX < previousSockX - 10) {
            break;
          };
          sockX = Math.floor(Math.random() * 381) + 10;
        };

        //Add the sock's base color randomly generated from 13 sprites and style it
        let base = this.physics.add.sprite(sockX, -20, "socks", Math.floor(Math.random() * 13)).setDepth(3 * sockCounter - 3).setScale(2).setAngle(sockAngle);

        //Add the sock's accent (heel and toe) color randomly generated from 13 sprites and style it
        let accent = this.physics.add.sprite(sockX, -20, "socks", Math.floor(Math.random() * 13) + 13).setDepth(3 * sockCounter - 2).setScale(2).setAngle(sockAngle);

        //Add the sock's design (stripe or checkerboard) randomly generated from 26 sprites and style it
        let design = this.physics.add.sprite(sockX, -20, "socks", Math.floor(Math.random() * 25) + 26).setDepth(3 * sockCounter - 1).setScale(2).setAngle(sockAngle);

        //Remove the sock after 5 seconds
        let checkSock = this.time.addEvent({
          callback: function () {
            if (base.y >= 250) {
              design.destroy();
              accent.destroy();
              base.destroy();
              checkSock.destroy();
            };
          },
          delay: 5000,
          loop: false,
          callbackScope: this,
        });

        //Adjust the sockCounter to make sure socks are properly z-indexed
        sockCounter -= 1;
        if (sockCounter < -8) {sockCounter = 0};
      },
      delay: 150,
      loop: true,
      callbackScope: this,
    });
    
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
      this.scene.start("Cutscene1");
    };
  }
};
