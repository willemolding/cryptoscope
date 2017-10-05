let document = require("document");

const MAX_N_TILES = 10;

export function UI(){};
  
UI.prototype.updateTile = function(tile, tileState) {
  console.log("updating tile");
  // contains the logic for setting the correct tile values with data from the state
//   tile.getElementById("valuetext").innerText = tileState.fsym;
//   tile.getElementById("cointext").innerText = tileState.tsym;
//   tile.getElementById("nowprice").innerText = tileState.price;
  
//   let now = new Date();
// 	let time = now.getHours() + ":" + now.getMinutes();
// 	let date = now.toLocaleString("en-us");
// 	tile.getElementById("updated").innerText = "Last updated: " + time + "," + " " + date;
  // tile.getElementById("pricechange_text");
  // tile.getElementById("priceup");
  // tile.getElementById("pricedown");
  // tile.getElementById("days");
  // tile.getElementById("icon").setAttribute("href", "resources/icons/"+tileState.fsym.toLowerCase()+".svg");

};

UI.prototype.displayLoaded = function(tileStates) {
  for (var i = 0; i < MAX_N_TILES; i++) {
    let state = tileStates.get(i, null);
    let tile = document.getElementById("tile-"+i);
    if(state != null) {
      this.updateTile(tile, state);
    } else {
      tile.style.display = "none";
    }
  }
};

UI.prototype.displayDisconnected = function() {

};

UI.prototype.displayLoading = function() {

};

UI.prototype.displayError = function() {

};


UI.prototype.updateUI = function(interfaceState) {
  console.log("updating UI. Status: " + interfaceState.status);

  switch(interfaceState.status) {
    case "disconnected":
      this.displayDisconnected();
      break;
    case "loading":
      this.displayLoading();
      break;
    case "error":
      this.displayError();
      break;
    case "loaded":
      console.log(JSON.stringify(interfaceState));
      this.displayLoaded(interfaceState.tileStates);
      break;
  }
};


