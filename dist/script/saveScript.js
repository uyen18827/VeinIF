import { getInventory } from "../inventory/inventory.js";
import { Save } from "../model/save.js";
import { getPlayer } from "../player/playerInfo.js";
/**
 * Save the game's state to LocalStorage
 * @param saveSlot string that would later used as LocalStorage key.
 * @param currentParagraphId
 */
export function newSave(saveSlot, currentParagraphId) {
    //check if LocalStorage is supported on client's browser
    if (typeof (Storage) !== "undefined") {
        console.log("LocalStorage is supported!");
        let player = getPlayer();
        let inventory = getInventory();
        let save = new Save(player, inventory, currentParagraphId);
        let stringSave = JSON.stringify(save);
        localStorage.setItem(saveSlot, stringSave);
    }
    else {
        console.log("LocalStorage is not supported in this browser! Please export the save file instead.");
    }
}
//TODO: make a function that gets the current paragraph's ID
function load(saveSlot) {
    if (typeof (Storage) !== "undefined") {
        console.log("LocalStorage is supported!");
        let retrievedSave = JSON.parse(localStorage.getItem(saveSlot));
    }
    else {
        console.log("LocalStorage is not supported in this browser! Please export the save file instead.");
    }
}
export function exportSave(saveSlot, save) {
    //encrypt + export to text file
}
