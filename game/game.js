//Phaser.js Config goes here

//A global object to pass values between functions and files alike
const gameState = {
  nextScene: false, //Scene flag for changing to the next scene
  escape: false, //Is set to true in some scene files when the player presses esc
  mapF: 0, //Will eventually hold the 2d array for the forest map
  mapC: 0, //Will eventually hold the 2d array for the cave map
  mapT: 0, //Will eventually hold the 2d array for the taiga map
  mapM: 0, //Will eventually hold the 2d array for the mountain map
  mapV: 0, //Will eventually hold the 2d array for the volcano map
};

makeMap(gameState.mapF);
makeMap(gameState.mapC);
makeMap(gameState.mapT);
makeMap(gameState.mapM);
makeMap(gameState.mapV);

//Config creates the entire scene, you can change backgroundColor and game size here without breaking any other code
const config = {
  height: 225,
  width: 400,
  backgroundColor: 0x051A24, //A Very Dark Blue
  scene: [Title, Scene1, Forest],
  pixelArt: true, //Turns off anti-aliasing
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 15 },
      debug: false, //Set to true to turn on debug mode (shows hitboxes and velocities)
    }
  },
  scale: {
    parent: document.body.querySelector(".game"),
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      height: 225,
      width: 400,
    },
    max: {
      height: 9000,
      width: 16000,
    },
    zoom: 1,
  },
  autoRound: false,
};

//Initiates the config
const game = new Phaser.Game(config);
