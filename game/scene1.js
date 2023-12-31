class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
  }
  preload() {
    this.load.spritesheet("sheet1", "assets/sprites/32x32sprites1.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("mapBG", "assets/sprites/MapBG.png");
  }
  create() {
    //Create map background image
    this.add.sprite(200, 112, "mapBG").setDepth(0);

    //Create character sprites and style them so the player can choose
    gameState.dragon = this.add.sprite(144, 112, "sheet1").setDepth(2).setScale(2).setFrame(6).setInteractive();
    gameState.snake = this.add.sprite(256, 112, "sheet1").setDepth(2).setScale(2).setFrame(21).setInteractive();

    //Create and style the title
    let titleText = this.add.text(200, 30, " Choose Your Character ", { fontFamily: "FiveBySeven", fontSize: "35px", fill: "#051A24", align: "center", lineSpacing: -25 });
    titleText.setOrigin(titleText.halfWidth, 0);
    titleText.setShadow(-3, 3, "#E6994C", 0);
    titleText.setDepth(1);

    //Create & style the class name texts
    let dragonText = this.add.text(144, 144, "Dragon", { fontFamily: "FiveBySeven", fontSize: "20px", fill: "#051A24" });
    dragonText.setOrigin(dragonText.halfWidth, 0);
    dragonText.setDepth(1);

    let snakeText = this.add.text(256, 144, "Snake", { fontFamily: "FiveBySeven", fontSize: "20px", fill: "#051A24" });
    snakeText.setOrigin(snakeText.halfWidth, 0);
    snakeText.setDepth(1);

    //Create character animations
    this.anims.create({
      key: 'dragonIdle',
      frames: this.anims.generateFrameNumbers("sheet1", { start: 6, end: 14 }),
      frameRate: 9,
      repeat: 0
    });

    this.anims.create({
      key: 'snakeIdle',
      frames: this.anims.generateFrameNumbers("sheet1", { start: 21, end: 25 }),
      frameRate: 10,
      repeat: 1
    });

    //On hover: play idle animation and change scale
    gameState.dragon.on('pointerover', () => {
      gameState.dragon.anims.play("dragonIdle", true);
      gameState.dragon.setScale(2.2);
    });

    //No hover: reset scale
    gameState.dragon.on('pointerout', () => {
      gameState.dragon.setScale(2);
    });

    //On click: start the game
    gameState.dragon.on('pointerup', () => {
      gameState.character = 1;
      gameState.nextScene = true;
    });

    //On hover: play idle animation and change scale
    gameState.snake.on('pointerover', () => {
      gameState.snake.anims.play("snakeIdle", true);
      gameState.snake.setScale(2.2);
    });

    //No hover: reset color and scale
    gameState.snake.on('pointerout', () => {
      gameState.snake.setScale(2);
    });

    //On click: start the game
    gameState.snake.on('pointerup', () => {
      gameState.character = 2;
      gameState.nextScene = true;
    });

    //If ESC is pressed, go back to the title
    this.input.keyboard.on('keydown-ESC', function () {gameState.escape = true});
  }
  update() {
    //If a character is chosen, go to next scene
    if (gameState.nextScene) {
      this.scene.stop("Scene1");
      this.scene.start("Forest");
    };

    //If ESC is pressed, go back to the title
    if (gameState.escape) {
      gameState.escape = false;
      //Stop playing the game's music
      //document.querySelector(".music").load();
      //document.querySelector(".music").pause();
      this.scene.stop("Scene1");
      this.scene.start("Title");
    };
  };
};
