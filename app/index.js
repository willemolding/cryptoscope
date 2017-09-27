/*
 * Entry point for the watch app
 */

import * as messaging from "messaging";
import { UI } from "./ui.js";
import * as ds from "../common/data_structures.js";

console.log("App Started");
var ui = new UI();

ui.updateUI(new InterfaceState("disconnected", []));


// Helpful to check whether we are connected or not.
setInterval(function() {
	console.log("App running - Connectivity status=" + messaging.peerSocket.readyState +
							" Connected? " + (messaging.peerSocket.readyState == messaging.peerSocket.OPEN ? "YES" : "no"));
}, 3000);


// Listen for the onopen event
messaging.peerSocket.onopen = function() {
	// Ready to send or receive messages
	ui.updateUI(new InterfaceState("loading", []));
	console.log("Socket opened");
	messaging.peerSocket.send("Hi!");
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
	// Output the message to the console
	console.log("Received message!");
	ui.updateUI(evt.data);
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
	// Handle any errors
	console.log("Connection error: " + err.code + " - " + err.message);
	ui.updateUI(new InterfaceState("error", []));
}
