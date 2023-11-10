//This function returns a 2d array that represents a map
//Honestly, I wouldn't even bother looking at it, and I wouldn't dare edit it if I valued my mental health
function makeMap(finalLineArray) {
  //Create the map array
  let mapArray = [ 0,0,0,0,[2],0,0,0,0,[2],0,0,0,0,[2],0,0,0,0,[6] ];

  //Randomize the number of paths to choose from (most likely to choose 3 or 4)
  mapArray.forEach(function (value, index, array) {
    array[index] = [[0,0], [0,0,0], [0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0,0]][Math.floor(Math.random() * 6)];
  });

  //Set the constant map values (scale traders and the boss fight)
  mapArray[4] = [3];
  mapArray[9] = [3];
  mapArray[14] = [3];
  mapArray[19] = [7];

  //Random number generator for more readiblity
  function generateNum(multiplier, adder) {return Math.floor(Math.random() * multiplier + adder)};
  //Generate shop locations (between 4 and 6)
  let locations = [generateNum(4, 0), generateNum(4, 5), generateNum(4, 10), generateNum(4, 15), generateNum(4, 5), generateNum(4, 15)];
  mapArray[locations[0]][generateNum(mapArray[locations[0]].length, 0)] = 5;
  mapArray[locations[1]][generateNum(mapArray[locations[1]].length, 0)] = 5;
  mapArray[locations[2]][generateNum(mapArray[locations[2]].length, 0)] = 5;
  mapArray[locations[3]][generateNum(mapArray[locations[3]].length, 0)] = 5;
  //50% chance for both the 5th and 6th shop locations to be used
  if (locations[4] != location[1] && generateNum(2, 0) === 1) {
  mapArray[locations[4]][generateNum(mapArray[locations[4]].length, 0)] = 5};
  if (locations[5] != location[3] && generateNum(2, 0) === 1) {
  mapArray[locations[5]][generateNum(mapArray[locations[5]].length, 0)] = 5};

  //Generate random event locations (between 4 and 8)
  locations = [generateNum(4, 0), generateNum(4, 5), generateNum(4, 10), generateNum(4, 15), generateNum(4, 0), generateNum(4, 5), generateNum(4, 10), generateNum(4, 15)];
  for (let i = 0; i < 8; i++) {
    //25% Chance for each random event after the first 4 to not be used
    if (i > 3 && generateNum(4, 0) === 0) {continue};
    if (!mapArray[locations[i]].includes(0)) {continue};
    let locationY = generateNum(mapArray[locations[i]].length, 0);
    if (mapArray[locations[i]][locationY] === 0) {mapArray[locations[i]][locationY] = 4} else {i--};
  };

  //Generate item/relic locations (between 5 and 10)
  locations = [generateNum(4, 0), generateNum(4, 5), generateNum(4, 10), generateNum(4, 15), generateNum(4, 0), generateNum(4, 5), generateNum(4, 10), generateNum(4, 15), generateNum(4, 5), generateNum(4, 15)];
  for (let i = 0; i < 10; i++) {
    //75% Chance for each random event after the first 5 to not be used
    if (i > 4 && generateNum(4, 0) != 0) {continue};
    if (!mapArray[locations[i]].includes(0)) {continue};
    let locationY = generateNum(mapArray[locations[i]].length, 0);
    if (mapArray[locations[i]][locationY] === 0) {mapArray[locations[i]][locationY] = 3} else {i--};
  };

  //Change 8 battles to elite battles
  locations = [generateNum(4, 0), generateNum(4, 5), generateNum(4, 5), generateNum(4, 10), generateNum(4, 10), generateNum(4, 15), generateNum(4, 15), generateNum(4, 15)];
  for (let i = 0; i < 8; i++) {
    if (!mapArray[locations[i]].includes(0)) {continue};
    let locationY = generateNum(mapArray[locations[i]].length, 0);
    if (mapArray[locations[i]][locationY] === 0) {mapArray[locations[i]][locationY] = 1} else {i--};
  };

  //Begin making the map line array
  let lineArray = JSON.parse(JSON.stringify(mapArray));

  //I'm really sorry that this code below is going to be really messy. I'll clean it up/optimize it later if I have time.
  lineArray.forEach(function (value, index, array) {
    let current = array[index];
    let next = array[index + 1];
    if (index === array.length - 1) {
      console.log("I'm really dumb.");
    } else if (current.length === 1) {
      next.forEach(function (v, i, a) {current[i] = [index, i]});
    } else if (current.length === 2) {
      if (next.length === 1) {
        current.forEach(function (v, i, a) {a[i] = [i, 0]});
      } else if (next.length === 2) {
        current[0] = [0, 0];
        current[1] = [1, 1];
        let randomNumber = generateNum(2, 0);
        if (generateNum(3) === 1) {current[2] = [randomNumber, Math.abs(randomNumber - 1)]};
      } else if (next.length === 3) {
        current[0] = [0, 0];
        current [1] = [1, 2];
        let randomNumber = generateNum(2, 0);
        current[2] = [randomNumber, 1];
        if (generateNum(2, 0) === 1) {current[3] = [Math.abs(randomNumber - 1), 1]};
      } else if (next.length === 4) {
        current[0] = [0, 0];
        current[1] = [0, 1];
        current[2] = [1, 2];
        current[3] = [1, 3];
      } else {
        current[0] = [0, 0];
        current[1] = [0, 1];
        current[2] = [generateNum(2, 0), 2];
        current[3] = [1, 3];
        current[4] = [1, 4];
      };
    } else if (current.length === 3) {
      if (next.length === 1) {
        current.forEach(function (v, i, a) {a[i] = [i, 0]});
      } else if (next.length === 2) {
        current[0] = [0, 0];
        current[1] = [1, generateNum(2, 0)];
        current[2] = [2, 1];
      } else if (next.length === 3) {
        current[0] = [0, 0];
        current[1] = [2, 2];
        if (generateNum(2, 0) === 1) {
          let randomNumber = generateNum(2, 0) * 2 - 1;
          current[2] = [1, 1 + randomNumber];
          if (randomNumber === 1) {current[3] = [0, 1]} else {current[3] = [2, 1]};
        } else {
          current[2] = [1, 1];
          if (generateNum(2, 0) === 1) {
            current[3] = [0, 1];
            current[4] = [2, 1];
          } else {
            current[3] = [1, 0];
            current[4] = [1, 2];
          };
        };
      } else if (next.length === 4) {
        if (generateNum(6, 0) === 0) {
          current[0] = [0, 0];
          current[1] = [0, 1];
          current[2] = [1, 1];
          current[3] = [1, 2];
          current[4] = [2, 2];
          current[5] = [2, 3];
        } else if (generateNum(2, 0) == 1) {
          let randomNumber = generateNum(3, 0);
          current[0] = [0, 0];
          current[4] = [2, 3];
          if (randomNumber === 0) {
            current[1] = [1, 1];
            current[2] = [1, 2];
            current[3] = [2, 2];
          } else if (randomNumber === 1) {
            current[1] = [0, 1];
            current[2] = [1, generateNum(2, 1)];
            current[3] = [2, 2];
          } else {
            current[1] = [0, 1];
            current[2] = [1, 1];
            current[3] = [1, 2];
          };
        } else {
          current[0] = [0, 0];
          current[3] = [2, 3];
          if (generateNum(2, 0) === 1) {
            current[1] = [1, 1];
            current[2] = [2, 2];
          } else {
            current[1] = [0, 1]
            current[2] = [1, 2];
          };
        };
      } else {        
        current[0] = [0, 0];
        current[1] = [0, 1];
        current[2] = [1, 2];
        current[3] = [2, 3];
        current[4] = [2, 4];
      };
    } else if (current.length === 4) {
      if (next.length === 1) {
        current.forEach(function (v, i, a) {a[i] = [i, 0]});
      } else if (next.length === 2) {
        current[0] = [0, 0];
        current[1] = [1, 0];
        current[2] = [2, 1];
        current[3] = [3, 1];
      } else if (next.length === 3) {
        if (generateNum(6, 0) === 0) {
          current[0] = [0, 0];
          current[1] = [1, 0];
          current[2] = [1, 1];
          current[3] = [2, 1];
          current[4] = [2, 2];
          current[5] = [3, 2];
        } else if (generateNum(2, 0) == 1) {
          let randomNumber = generateNum(3, 0);
          current[0] = [0, 0];
          current[4] = [3, 2];
          if (randomNumber === 0) {
            current[1] = [1, 1];
            current[2] = [1, 1];
            current[3] = [2, 2];
          } else if (randomNumber === 1) {
            current[1] = [1, 0];
            current[2] = [generateNum(2, 1), 1];
            current[3] = [2, 2];
          } else {
            current[1] = [1, 0];
            current[2] = [1, 1];
            current[3] = [2, 1];
          };
        } else {
          current[0] = [0, 0];
          current[3] = [3, 2];
          if (generateNum(2, 0) === 1) {
            current[1] = [1, 1];
            current[2] = [2, 2];
          } else {
            current[1] = [1, 0]
            current[2] = [2, 1];
          };
        };
      } else if (next.length === 4) {
        if (generateNum(5, 0) === 1) {
          current[0] = [0, 0];
          current[1] = [1, 1];
          current[2] = [2, 2];
          current[3] = [3, 3];
        } else if (generateNum(2, 0) === 1) {
          current[0] = [0, 0];
          current[1] = [0, 1];
          current[2] = [1, 2];
          current[3] = [2, 3];
          current[4] = [3, 3];
        } else {
          current[0] = [0, 0];
          current[1] = [1, 0];
          current[2] = [2, 1];
          current[3] = [3, 2];
          current[4] = [3, 3];
        };
      } else {
        if (generateNum(3, 0) === 1) {
          if (generateNum(2, 0) === 1) {
            current[0] = [0, 0];
            current[1] = [1, 1];
            current[2] = [2, 2];
            current[3] = [3, 3];
            current[4] = [3, 4];
          } else {
            current[0] = [0, 0];
            current[1] = [0, 1];
            current[2] = [1, 2];
            current[3] = [2, 3];
            current[4] = [3, 4];
          };
        } else {
          if (generateNum(2, 0) === 1) {          
            current[0] = [0, 0];          
            current[1] = [0, 1];          
            current[2] = [1, 1];          
            current[3] = [2, 2];          
            current[4] = [2, 3];          
            current[5] = [3, 3];          
            current[6] = [3, 4];
          } else {          
            current[0] = [0, 0];          
            current[1] = [0, 1];          
            current[2] = [1, 1];          
            current[3] = [1, 2];          
            current[4] = [2, 3];
            current[5] = [3, 3];
            current[6] = [3, 4];
          };
        };
      };
    } else if (current.length === 5) {
      if (next.length === 1) {
        current.forEach(function (v, i, a) {a[i] = [i, 0]});
      } else if (next.length === 2) {
        current[0] = [0, 0];
        current[1] = [1, 0];
        current[2] = [2, generateNum(2, 0)];
        current[3] = [3, 1];
        current[4] = [4, 1];
      } else if (next.length === 3) {
        current[0] = [0, 0];
        current[1] = [0, 1];
        current[2] = [1, 2];
        current[3] = [2, 3];
        current[4] = [2, 4];
      } else if (next.length === 4) {
        if (generateNum(3, 0) === 1) {
          if (generateNum(2, 0) === 1) {
            current[0] = [0, 0];
            current[1] = [1, 1];
            current[2] = [2, 2];
            current[3] = [3, 3];
            current[4] = [4, 3];
          } else {
            current[0] = [0, 0];
            current[1] = [1, 0];
            current[2] = [2, 1];
            current[3] = [3, 2];
            current[4] = [4, 3];
          };
        } else {
          if (generateNum(2, 0) === 1) {          
            current[0] = [0, 0];          
            current[1] = [1, 0];          
            current[2] = [1, 1];          
            current[3] = [2, 2];          
            current[4] = [3, 2];          
            current[5] = [3, 3];          
            current[6] = [4, 3];
          } else {          
            current[0] = [0, 0];          
            current[1] = [1, 0];          
            current[2] = [1, 1];          
            current[3] = [2, 1];          
            current[4] = [3, 2];
            current[5] = [3, 3];
            current[6] = [4, 3];
          };
        };
      } else if (next.length === 5) {
        current[0] = [0, 0];
        current[1] = [1, 1];
        current[2] = [2, 2];
        current[3] = [3, 3];
        current[4] = [4, 4];
      };
    };
  });

  if (finalLineArray === 0) {
    gameState.mapLinesF = lineArray;
  } else if (finalLineArray === 1) {
    gameState.mapLinesC = lineArray;
  } else if (finalLineArray === 2) {
    gameState.mapLinesT = lineArray;
  } else if (finalLineArray === 3) {
    gameState.mapLinesM = lineArray;
  } else {
    gameState.mapLinesV = lineArray;
  }

  return mapArray;
};
