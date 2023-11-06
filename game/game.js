//Phaser.js Config goes here

//A global object to pass values between functions and files alike
const gameState = {
  nextScene: false, //Scene flag for changing to the next scene
  escape: false, //Is set to true in some scene files when the player presses esc
};

//Config creates the entire scene, you can change backgroundColor and game size here without breaking any other code
const config = {
  height: 225,
  width: 400,
  backgroundColor: 0x051A24, //A Very Dark Blue
  scene: [Title, Scene1, Scene2],
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
