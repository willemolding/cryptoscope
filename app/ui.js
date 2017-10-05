let document = require("document");

export function UI() {
	this.updateUI = function(interfaceState) {
		console.log("updating UI");

		switch(interfaceState.status) {
			case "disconnected":
				displayDisconnected();
				break;
			case "loading":
				displayLoading();
				break;
			case "error":
				displayError();
				break;
			case "loaded":
				displayLoaded(interfaceState.tileStates);
				break;
		}
	};

	var updateTile = function(tile, tileState) {
		// contains the logic for setting the correct tile values with data from the state
    tile.getElementById("nowprice").innerText = tileState.fsym;
    tile.getElementById("cointext").innerText = tileState.tsym;
    tile.getElementById("valuetext").innerText = tileState.priceText;
    tile.getElementById("updated").innerText = tileState.lastUpdatedText;
    // tile.getElementById("pricechange_text");
    // tile.getElementById("priceup");
    // tile.getElementById("pricedown");
    // tile.getElementById("days");
    tile.getElementById("icon").setAttribute("href", "resources/icons/"+tileState.fsym.toLowerCase()+".svg");

	};

	var displayLoaded = function(tileStates) {
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

	var displayDisconnected = function() {

	};

	var displayLoading = function() {

	};

	var displayError = function() {

	};
	
}

