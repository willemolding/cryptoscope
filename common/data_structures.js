

// This is a prototype for an object is send as a message to the watch and contains a collection of TileStates and all other information required to fully define what the interface should display
export function InterfaceState(status, tileStates) {
  this.status = status;
  this.tileStates = tileStates;
}