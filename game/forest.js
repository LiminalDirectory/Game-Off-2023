/*
Task List
[x] Show the upcoming battles, shops, map stuff, etc.
  [ ] Draw lines between the ones you can and can't go to
[ ] Animation for returning to the map
[ ] Enlarge location on hover
[ ] Destroy lines to non-chosen locations on click
[x] Add map key
*/
class Forest extends Phaser.Scene {
  constructor() {
    super({ key: 'Forest' });
  }
  preload() {
    this.load.spritesheet("sheet1", "assets/sprites/32x32sprites1.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("keyMapBG", "assets/sprites/KeyMapBG.png");
  }
  create() {
    //Create map background image
    this.add.sprite(200, 112, "keyMapBG").setDepth(0);

    //Create static groups for each event location
    let battleGroup = this.physics.add.staticGroup();
    let eliteGroup = this.physics.add.staticGroup();
    let traderGroup = this.physics.add.staticGroup();
    let relicGroup = this.physics.add.staticGroup();
    let randomGroup = this.physics.add.staticGroup();
    let shopGroup = this.physics.add.staticGroup();

    if (gameState.location === -1) {
      for (let i = 1; i < 5; i++) {
        let yDistance = 225 / (gameState.mapF[gameState.location + i].length + 1);
        gameState.mapF[gameState.location + i].forEach(function (value, index) {
          let event;
          if (value === 0) {event = battleGroup.create(70 * i, yDistance * index, "sheet1").setFrame(0)};
          if (value === 1) {event = eliteGroup.create(70 * i, yDistance * index, "sheet1").setFrame(1)};
          if (value === 3) {event = relicGroup.create(70 * i, yDistance * index, "sheet1").setFrame(3)};
          if (value === 4) {event = randomGroup.create(70 * i, yDistance * index, "sheet1").setFrame(4)};
          if (value === 5) {event = shopGroup.create(70 * i, yDistance * index, "sheet1").setFrame(5)};
          event.setInteractive();
          //On hover: change color and scale
          event.on('pointerover', () => {
            event.setScale(1.1);
          });
    
          //No hover: reset color and scale
          event.on('pointerout', () => {
            event.setScale(1);
          });
          
          //On click: start the game
          event.on('pointerup', () => {
            gameState.nextScene = value;
            gameState.currentEvent = value;
          });
        });
      };
    } else {
      this.add.sprite(75, 112, "sheet1").setFrame(gameState.currentEvent);
      for (let i = 2; i < 5; i++) {
        let yDistance = 225 / (gameState.mapF[gameState.location + i].length + 1);
        gameState.mapF[gameState.location + i].forEach(function (value, index) {
          let event;
          if (value === 0) {event = battleGroup.create(70 * i, yDistance * index, "sheet1").setFrame(0)};
          if (value === 1) {event = eliteGroup.create(70 * i, yDistance * index, "sheet1").setFrame(1)};
          if (value === 2) {event = traderGroup.create(70 * i, yDistance * index, "sheet1").setFrame(2)};
          if (value === 3) {event = relicGroup.create(70 * i, yDistance * index, "sheet1").setFrame(3)};
          if (value === 4) {event = randomGroup.create(70 * i, yDistance * index, "sheet1").setFrame(4)};
          if (value === 5) {event = shopGroup.create(70 * i, yDistance * index, "sheet1").setFrame(5)};
          event.setInteractive();
          //On hover: change color and scale
          event.on('pointerover', () => {
            event.setScale(1.1);
          });
    
          //No hover: reset color and scale
          event.on('pointerout', () => {
            event.setScale(1);
          });
          
          //On click: start the game
          event.on('pointerup', () => {
            gameState.nextScene = value;
            gameState.currentEvent = value;
          });
        });
      };
    };

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
    if (gameState.nextScene === 0) {
      this.scene.stop("Forest");
      this.scene.start("BattleF");
    };

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
