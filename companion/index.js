import * as api from "./api.js";
import * as messaging from "messaging";
import * as ds from "../common/data_structures.js";
import { settingsStorage } from "settings";

console.log("companion started");


// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  fetchAndSendData();
}


// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}


function fetchAndSendData() {
  // deals with getting the values from the settings store, calling the api, and sending the response to the watch
  // let subs = [{
  //   fsym : "LTC",
  //   tsym : "BTC",
  //   exchange : "BitTrex"
  // },
  // {
  //   fsym : "BTC",
  //   tsym : "USD",
  //   exchange : "BitTrex"
  // },
  // {
  //   fsym : "NEO",
  //   tsym : "BTC",
  //   exchange : "BitTrex"
  // }];
  
  let subs = JSON.parse(settingsStorage.getItem("subscriptions"));
  
  Promise.all(subs.map((item) => { return api.getCoinStatus(item.value) }))
  .then(function(tileStates) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(new ds.InterfaceState("loaded", tileStates));
    }
  })
  .catch(function(err) {
    console.log(err);
  });  
}

settingsStorage.onchange = function(evt) {
  fetchAndSendData();
}


