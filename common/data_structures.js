
// This is a prototype for an object that should contain all the data required to update a single tile in tile.gui
// add fields to this as required
export function TileState(fsym, tsym, priceText, percentChanges, lastUpdatedText) {
  this.fsym = fsym;
  this.tsym = tsym;
  this.priceText = priceText;
  this.percentChanges = percentChanges;
  this.lastUpdatedText = lastUpdatedText;
}


// This is a prototype for an object is send as a message to the watch and contains a collection of TileStates and all other 
// information required to fully define what the interface should display
export function InterfaceState(status, tileStates) {
  this.status = status;
  this.tileStates = tileStates;
}