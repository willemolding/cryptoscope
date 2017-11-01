import * as messaging from "messaging";
import { display } from "display";
import { UI } from "./ui.js";
import * as ds from "../common/data_structures.js";


display.autoOff = false;
display.on = true;
var ui = new UI();
// ui.updateUI(new ds.InterfaceState("disconnected", []));


// Listen for the onopen event
messaging.peerSocket.onopen = function() {
	// Ready to send or receive messages
	// ui.updateUI(new ds.InterfaceState("loading", []));
	console.log("Socket opened");
};

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
	// Output the message to the console
	console.log("Received message!");
	ui.updateUI(evt.data);
};

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
	// Handle any errors
	console.log("Connection error: " + err.code + " - " + err.message);
	// ui.updateUI(new ds.InterfaceState("error", []));
};
