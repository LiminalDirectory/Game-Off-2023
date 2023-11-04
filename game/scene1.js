/*
Task List:
- Set characters to interactive
  - On hover: enlarge
  - On click: set gameState.character to a 1 (dragon) or a 2 (snake), then set gameState.nextLevel to true
- Add next scene code
*/
class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
  }
  preload() {
    this.load.spritesheet("sheet1", "assets/sprites/32x32sprites1.png", { frameWidth: 32, frameHeight: 32 });
  }
  create() {
    //Create character sprites and style them so the player can choose
    gameState.dragon = this.add.sprite(144, 112, "sheet1").setDepth(2).setScale(2).setFrame(6);
    gameState.snake = this.add.sprite(256, 112, "sheet1").setDepth(2).setScale(2).setFrame(21);

    //Create player animations & torch animation
    this.anims.create({
      key: 'dragonIdle',
      frames: this.anims.generateFrameNumbers("sheet1", { start: 6, end: 14 }),
      frameRate: 8,
      repeat: 0
    });
    
    this.anims.create({
      key: 'snakeIdle',
      frames: this.anims.generateFrameNumbers("sheet1", { start: 21, end: 25 }),
      frameRate: 8,
      repeat: 1
    });

    //If ESC is pressed, go back to the title
    this.input.keyboard.on('keydown-ESC', function () {gameState.escape = true});

    //Create 2 counters to be used in the update function in order to play the characters' idle animations at the right times
    gameState.dragonCounter = 90 + Math.floor(Math.random() * 90);
    gameState.snakeCounter = 90 + Math.floor(Math.random() * 90);
  }
  update() {
    //If a certain interval has been reached, play an idle animation
    gameState.dragonCounter++;
    gameState.snakeCounter++;
    if (gameState.dragonCounter >= 180 + Math.floor(Math.random() * 180 - 60)) {
      gameState.dragon.anims.play("dragonIdle", true);
      gameState.dragonCounter = 0;
    };
    if (gameState.snakeCounter >= 180 + Math.floor(Math.random() * 180 - 60)) {
      gameState.snake.anims.play("snakeIdle", true);
      gameState.snakeCounter = 0;
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
