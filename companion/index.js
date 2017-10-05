import * as api from "./api.js";
import * as messaging from "messaging";
import * as ds from "../common/data_structures.js";

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
  let sub = {
    fsym : "LTC",
    tsym : "BTC",
    exchange : "BitTrex"
  }

  api.getCoinStatus(sub)
  .then(function(data) {
    console.log("request success");
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send the data to peer as a message
      messaging.peerSocket.send(new ds.InterfaceState("loaded", [data]));
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}
