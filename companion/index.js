import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { me } from "companion";

import * as api from "../common/api.js";

console.log("Companion starting! LaunchReasons: " + JSON.stringify(me.launchReasons));

settingsStorage.onchange = function(evt) {
  console.log("Settings have changed! " + JSON.stringify(evt));
  fetchAndSendData();
}

// Helpful to check whether we are connected or not.
setInterval(function() {
  console.log("App (" + me.buildId + ") running - Connectivity status=" + messaging.peerSocket.readyState + 
              " Connected? " + (messaging.peerSocket.readyState == messaging.peerSocket.OPEN ? "YES" : "no"));
}, 3000);

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  fetchAndSendData();
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

function fetchAndSendData() {
  // deals with getting the values from the settings store, calling the api, and sending the response to the watch
  var api_calls = settingsStorage.getItem("subscriptions").map(getCoinStatus);
  
  Promise.all(api_calls)
  .then(function (results){
    var state = new ds.InterfaceState("loaded", []);
    results.forEach(function(coinStatus) {
      let priceText = formatPriceText(coinStatus.price, coinStatus.tsym);
      let lastUpdatedText = formatLastUpdateText(new Date());
      state.tileStates.push(new ds.TileState(
        coinStatus.fsym,
        coinStatus.tsym,
        priceText,
        coinStatus.percentChange,
        lastUpdatedText,
      ))
    });
    return state;
  })
  .then(function(state){
    // send this message to the watch to trigger display update
    console.log("sending message to watch: \n"+state);
    messaging.peerSocket.send(state);
  })
  .catch(function(err){
    console.log("Error on API call " + err);
    messaging.peerSocket.send(new ds.InterfaceState("error", []));
  });  
  
}


var symbolToPrefixMapping = {
	"BTC": "\u0243",
	"ETH": "\u039E",
	"USD": "$",
	"USDT": "$",
	"EUR" : "\u20AC",
	"GBP" : "\u00A3",
	"CNY" : "\uFFE5",
	"CNH" : "\uFFE5",
	"JPY" : "\uFFE5",
}

function getPrefix(symbol) {
	return symbolToPrefixMapping[symbol] || "";
}

function formatPriceText(price, tsym){
  if(coinStatus.tsym == "BTC"){
    return getPrefix(tsym)+price.toFixed(8);
  }
  else {
    return getPrefix(tsym)+price;
  }
}

function formatLastUpdateText(dt){
  var time = dt.getHours() + ":" + dt.getMinutes();
	var date = dt.getDate() + "-" + dt.toLocaleString("en-us", { month: "short" }) + "-" + dt.getFullYear();
	return "Last updated: " + time + " " + date;
}
