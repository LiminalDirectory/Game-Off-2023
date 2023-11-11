/*
Task List
[x] Show the upcoming battles, shops, map stuff, etc.
  [x] Draw lines between the ones you can and can't go to
[x] Enlarge location on hover
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
    let eventGroup = this.physics.add.staticGroup();

    //I apologize for the spaghetti code, but the two for loops below create the map
    for (let i = 0; i < 5; i++) {
      if (gameState.location + i > -1) {
        let yDistance = 225 / (gameState.mapF[gameState.location + i].length + 1);
        gameState.mapF[gameState.location + i].forEach(function (value, index) {
          let event = eventGroup.create(70 * i + 20, yDistance * (index + 1), "sheet1").setFrame(value).setDepth(2);
          if (gameState.location === -1 && i === 1) {
            event.setInteractive();
          } else if (i === 1) {
            gameState.mapLinesF[gameState.location].forEach(function (v) {
              if (v[0] === gameState.currentEvent && v[1] === index) {event.setInteractive()};
            });
          };

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
            gameState.currentEvent = index;
          });
        });
      };
    };

    for (let i = 0; i < 4; i++) {
      if (gameState.location + i > -1) {
        let yDistanceA = 225 / (gameState.mapF[gameState.location + i].length + 1);
        let yDistanceB = 225 / (gameState.mapF[gameState.location + i + 1].length + 1);
        gameState.mapLinesF[gameState.location + i].forEach(function (value) {
          if (i === 0 && value[0] === gameState.currentEvent) {
            this.add.line(0, 0, 70 * i + 20, yDistanceA * (value[0] + 1), 70 * (i + 1) + 20, yDistanceB * (value[1] + 1), 0x051A24).setOrigin(0, 0);
          } else {
            this.add.line(0, 0, 70 * i + 20, yDistanceA * (value[0] + 1), 70 * (i + 1) + 20, yDistanceB * (value[1] + 1), 0xE6994C).setOrigin(0, 0);
          };
        }, this);
      } else {
        let yDistance = 225 / (gameState.mapF[gameState.location + i + 1].length + 1);
        gameState.mapF[0].forEach(function (value, index) {
          this.add.line(0, 0, 70 * i + 20, 112.5, 70 * (i + 1) + 20, yDistance * (index + 1), 0x051A24).setOrigin(0, 0);
        }, this);
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
