/*
Task List
[ ] Show the upcoming battles, shops, map stuff, etc.
  [ ] Draw lines between the ones you can and can't go to
[ ] Animation for returning to the map
[ ] Enlarge location on hover
[ ] Destroy lines to non-chosen locations on click
[x] Add map key
*/
class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene2' });
  }
  preload() {
    this.load.spritesheet("sheet1", "assets/sprites/32x32sprites1.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("keyMapBG", "assets/sprites/KeyMapBG.png");
  }
  create() {
    //Create map background image
    this.add.sprite(200, 112, "keyMapBG").setDepth(0);

    //On hover: change scale
    gameState.dragon.on('pointerover', () => {
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

    //If ESC is pressed, go back to the title
    this.input.keyboard.on('keydown-ESC', function () {gameState.escape = true});
  }
  update() {
    //If a condition is met, go to next scene
    //if (gameState.nextScene) {
    //  this.scene.stop("Forest");
    //  this.scene.start("Shop");
    //};

    //If ESC is pressed, go back to the title
    if (gameState.escape) {
      gameState.escape = false;
      //Stop playing the game's music
      //document.querySelector(".music").load();
      //document.querySelector(".music").pause();
      this.scene.stop("Forest");
      this.scene.start("Title");
    };
  };
};
