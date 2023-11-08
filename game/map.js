//This function returns a 2d array that represents a map
function makeMap() {
  //Create the map array
  let mapArray = [ 0,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,0,0,0,6 ];

  //Randomize the number of paths to choose from (most likely to choose 3 or 4)
  mapArray.forEach(function (item, index, arr) {
    arr[index] = [[0,0], [0,0,0], [0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0,0]][Math.floor(Math.random() * 5)];
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
  locations = [generateNum(4, 0), generateNum(4, 5), generateNum(4, 10), generateNum(4, 15), generateNum(4, 0), generateNum(4, 5), generateNum(4, 10), generateNum(4, 15)];
  for (let i = 0; i < 8; i++) {
    if (!mapArray[locations[i]].includes(0)) {continue};
    let locationY = generateNum(mapArray[locations[i]].length, 0);
    if (mapArray[locations[i]][locationY] === 0) {mapArray[locations[i]][locationY] = 1} else {i--};
  };

  return mapArray;
};
