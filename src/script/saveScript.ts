import { getInventory } from "../inventory/inventory.js";
import { Save } from "../model/save.js";
import { getCurrentParagraphID, updateParagraph } from "../paragraphs/paragraphFunctions.js";
import { getPlayer, setPlayer, showNameDiv } from "../player/playerInfo.js";
import { loadPronounsRadioBtn } from "../player/pronouns.js";

/**
 * Save the game's state to LocalStorage
 * @param saveSlot string that would later used as LocalStorage key.
 * @param currentParagraphId 
 */
export function newSave(saveSlot: string) {
    //check if LocalStorage is supported on client's browser
    if (typeof (Storage) !== "undefined") {
        console.log(`LocalStorage is supported! Saved file to slot ${saveSlot}`);
        let player = getPlayer();
        let inventory = getInventory();
        let pid = getCurrentParagraphID();
        let save = new Save(player, inventory, pid);
        let stringSave = JSON.stringify(save);
        localStorage.setItem(saveSlot, stringSave);
    }
    else {
        console.log("LocalStorage is not supported in this browser! Please export the save file instead.")
    }
}
//TODO: (DONE) make a function that gets the current paragraph's ID

export function load(saveSlot: string) {
    if (typeof (Storage) !== "undefined") {
        console.log("LocalStorage is supported!")
        let retrievedSave = JSON.parse(localStorage.getItem(saveSlot)!);
        setPlayer(retrievedSave.player);
        updateParagraph(retrievedSave.currentParagraphId, retrievedSave.player);
        showNameDiv(retrievedSave.player.playerName);
        loadPronounsRadioBtn(retrievedSave.player.pronouns);
    } else {
        console.log("LocalStorage is not supported in this browser! Please export the save file instead.")
    }
}

export function exportSave(saveSlot: string, save: Save) {
    //encrypt + export to text file
}