let document = require("document");

export function UI(){};
  
UI.prototype.updateTile = function(tileState) {
  console.log("updating tile");
  // contains the logic for setting the correct tile values with data from the state
  document.getElementById("valuetext").innerText = tileState.fsym;
  document.getElementById("cointext").innerText = tileState.tsym;
  document.getElementById("nowprice").innerText = tileState.price;
  // tile.getElementById("updated").innerText = tileState.lastUpdatedText;
  // tile.getElementById("pricechange_text");
  // tile.getElementById("priceup");
  // tile.getElementById("pricedown");
  // tile.getElementById("days");
  // tile.getElementById("icon").setAttribute("href", "resources/icons/"+tileState.fsym.toLowerCase()+".svg");

};

UI.prototype.displayLoaded = function(tileStates) {
  var items = document.getElementsByClassName("item")
  for (var i = 0; i < items.length; i++) {
    state = tileStates.get(i, null);
    if(state != null) {
      var tile = items[i].getElementById(tile);
      updateTile(tile, state);
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
      console.log("displaying new data");
      // displayLoaded(interfaceState.tileStates);
      console.log(JSON.stringify(interfaceState));
      this.updateTile(interfaceState.tileStates[0]);
      break;
  }
};


