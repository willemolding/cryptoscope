let document = require("document");

const MAX_N_TILES = 10;

function getPriceFontSize(length) {
  return 42; // about right for btc formatted price
}

const currencySymbols = {
  // "BTC": "\u0243",  //these are not supported by the watch at this stage
  // "ETH": "\u039E",
  "USD": "$",
  "USDT": "$",
  // "CNY": "\u00A5",
  // "JPY": "\u00A5"
};

function generatePriceText(tsym, price) {
  let symbol = currencySymbols[tsym];
  if(symbol === undefined) {
    symbol = "";
  }
  let numberText = "";
  if(tsym == "BTC"){
    numberText = price.toFixed(8);
  } else {
    numberText = price.toString();
  }
  return symbol + numberText;
}


export function UI(){};
  
UI.prototype.updateTile = function(tile, tileState) {
  console.log("updating tile");
  // contains the logic for setting the correct tile values with data from the state
  tile.getElementById("cointext").innerText = tileState.fsym;
  tile.getElementById("valuetext").innerText = tileState.tsym;
  let priceText = generatePriceText(tileState.tsym, tileState.price);
  tile.getElementById("nowprice").innerText = priceText;
  tile.getElementById("nowprice").style.fontSize = getPriceFontSize(priceText.length);
  
  let pricechageText = tile.getElementById("pricechange_text");
  let priceup = tile.getElementById("priceup");
  let pricedown = tile.getElementById("pricedown");
  let days = tile.getElementById("days");
 
  tile.getElementById("icon").href = "logos/"+tileState.fsym.toUpperCase()+".png";

  // set the percent change 
  let change = tileState.percentChange["1day"];
  pricechageText.innerText = (change<0?'':'+') + change.toFixed(1) + "%";
  pricechageText.style.fill = change > 0 ? "green" : "red";
};

UI.prototype.displayLoaded = function(tileStates) {

  let now = new Date();
	let time = now.getHours() + ":" + now.getMinutes();
	let date = now.getDate() + "/" + (now.getMonth()+1);
	document.getElementById("updated").innerText = "Last updated: " + time + "," + " " + date;
  
  for (var i = 0; i < MAX_N_TILES; i++) {
    let state = tileStates[i];
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
      this.displayLoaded(interfaceState.tileStates);
      break;
  }
};


