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
export function newSave(saveSlot) {
    //check if LocalStorage is supported on client's browser
    if (typeof (Storage) !== "undefined") {
        console.log(`LocalStorage is supported! Saved file to slot ${saveSlot}`);
        let save = new Save(getPlayer(), getInventory(), getCurrentParagraphID());
        let stringSave = JSON.stringify(save);
        localStorage.setItem(saveSlot, stringSave);
    }
    else {
        console.log("LocalStorage is not supported in this browser! Please export the save file instead.");
    }
}
//TODO: Encrypt and decrypt save/load
export function load(saveSlot) {
    if (typeof (Storage) !== "undefined") {
        console.log("LocalStorage is supported!");
        let retrievedSave = JSON.parse(localStorage.getItem(saveSlot));
        setPlayer(retrievedSave.player);
        updateParagraph(retrievedSave.currentParagraphId, retrievedSave.player);
        showNameDiv(retrievedSave.player.playerName);
        loadPronounsRadioBtn(retrievedSave.player.pronouns);
    }
    else {
        console.log("LocalStorage is not supported in this browser! Please export the save file instead.");
    }
}
// TODO: export save from save slot.
export function exportStorageSave(saveSlot) {
    let retrievedSave = localStorage.getItem(saveSlot);
    let saveMessage = document.querySelector('#exportMessage');
    saveMessage.innerHTML = ``; //clear old message
    saveMessage.innerHTML += `Save exported from ${saveSlot}.<br> 
    Copy and keep the code bellow to load later`;
    let saveOutput = document.querySelector(`#saveOutput`);
    saveOutput.innerHTML = ``; //clear old save
    saveOutput.innerHTML += `${btoa(retrievedSave)}`; //encode to Base64
    saveOutput.select();
    document.execCommand('copy');
}
// TODO: export append the textarea
/**
 * Generate a random-looking string that save the game's progress.
 * The string is encoded to Base64 to prevent player (to an extent) from altering their save.
 */
export function exportSave() {
    let save = new Save(getPlayer(), getInventory(), getCurrentParagraphID());
    let stringSave = JSON.stringify(save);
    let saveMessage = document.querySelector('#exportMessage');
    saveMessage.innerHTML = ``; //clear old message
    saveMessage.innerHTML += `Save created at ${new Date().toLocaleString()}.<br> 
    Copy and keep the code bellow to load later`;
    let saveOutput = document.querySelector(`#saveOutput`);
    saveOutput.innerHTML = ``; //clear old save
    saveOutput.innerHTML += `${btoa(stringSave)}`; //encode to Base64
    saveOutput.select();
    document.execCommand('copy');
}
// A textarea input will be provided for user to paste in the string
//retrieved from exportSave()
/**
 * Parse the encrypted save string to load game.
 * @param stringSave save game string generated from exportSave()
 */
//TODO: Make load button open a new modal.
export function loadSaveCode() {
    let loadMessage = document.querySelector(`#exportMessage`);
    // loadMessage!.innerHTML = '';
    // loadMessage!.innerHTML = `Please paste your save file code in here. `
    let loadCode = document.querySelector("#saveOutput").value;
    loadCode = atob(loadCode);
    console.log(loadCode);
    let retrievedSave = JSON.parse(loadCode);
    console.log(retrievedSave);
    setPlayer(retrievedSave.player);
    updateParagraph(retrievedSave.currentParagraphId, retrievedSave.player);
    showNameDiv(retrievedSave.player.playerName);
    loadPronounsRadioBtn(retrievedSave.player.pronouns);
    //TODO: verify if save is valid. 
    //fallback: If load is invalid, start new game.
}
