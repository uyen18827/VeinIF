import { appendItemHTML, clearInventory, clearInventoryHTML, getInventory, loadBulkInventory } from "../inventory/inventory.js";
import { inventoryItem } from "../model/item.js";
import { Save } from "../model/save.js";
import { getCurrentParagraphID, updateParagraph } from "../paragraphs/paragraphFunctions.js";
import { getPlayer, setPlayer, showNameDiv } from "../player/playerInfo.js";
import { loadPronounsRadioBtn, showPronouns } from "../player/pronouns.js";

/**
 * Create a new save and stringify it.
 */
function save() {
    let save = new Save(getPlayer(), getInventory(), getCurrentParagraphID());
    let stringSave = JSON.stringify(save);
    return stringSave;
}

function load(retrievedSave: any) {
    clearInventory();
    clearInventoryHTML();
    setPlayer(retrievedSave.player);
    loadBulkInventory(retrievedSave.inventory);
    updateParagraph(retrievedSave.currentParagraphId, retrievedSave.player);
    retrievedSave.inventory.forEach((element: inventoryItem) => {
        appendItemHTML(element.item);
        console.log(element)
    });
    showNameDiv(retrievedSave.player.playerName);
    showPronouns(retrievedSave.player.pronouns);
    let savedPronouns = document.getElementById(`${retrievedSave.player.pronouns.subjectPro}`);
    if (savedPronouns) {
        loadPronounsRadioBtn(retrievedSave.player.pronouns);
    }
}
// TODO: user should be able to toggle auto-save on/off

export function autoSave() {
    localStorage.setItem('autoSave', save());
}

export function autoLoad() {
    let retrievedSave = JSON.parse(localStorage.getItem('autoSave')!);
    load(retrievedSave);
}

/**
 * Save the game's state to LocalStorage
 * @param saveSlot string that would later used as LocalStorage key.
 */
export function newSave(saveSlot: string) {
    //check if LocalStorage is supported on client's browser
    if (typeof (Storage) !== "undefined") {
        console.log(`LocalStorage is supported! Saved file to ${saveSlot}`);
        localStorage.setItem(saveSlot, save());
    }
    else {
        console.log("LocalStorage is not supported in this browser! Please export the save code instead.")
    }
}
//TODO: Make a proper LocalStorage is not supported message that shows on page, not just in console.

export function loadSave(saveSlot: string) {
    if (typeof (Storage) !== "undefined") {
        console.log("LocalStorage is supported!")
        let retrievedSave = JSON.parse(localStorage.getItem(saveSlot)!);
        load(retrievedSave);
    } else {
        console.log("LocalStorage is not supported in this browser! Please export the save code instead.")
    }
}

export function exportStorageSave(saveSlot: string) {
    let retrievedSave = localStorage.getItem(saveSlot);
    let saveMessage = document.querySelector('#exportMessage');
    saveMessage!.innerHTML = ``; //clear old message
    saveMessage!.innerHTML += `Save exported from ${saveSlot}.<br> 
    Copy and keep the code bellow to load later`;
    let saveOutput = document.querySelector(`#saveOutput`);
    (<HTMLInputElement>saveOutput).value = ``; //clear old save
    (<HTMLInputElement>saveOutput).value = `${btoa(retrievedSave!)}`; //encode to Base64
    (<HTMLInputElement>saveOutput).select();
}

/**
 * Generate a random-looking string that save the game's progress.
 * The string is encoded to Base64 to prevent players (to an extent) from altering their save.
 */
export function exportSave() {
    let saveMessage = document.querySelector('#exportMessage');
    saveMessage!.innerHTML = ``; //clear old message
    saveMessage!.innerHTML += `Save created at ${new Date().toLocaleString()}.<br> 
    Copy and keep the code bellow to load later`
    let saveOutput = document.querySelector(`#saveOutput`);
    (<HTMLInputElement>saveOutput).value = ``; //clear old save
    (<HTMLInputElement>saveOutput).value += `${btoa(save())}`; //encode to Base64
    (<HTMLInputElement>saveOutput).select();
}

/**
 * Get Save Code from textarea id = "saveOutput"
 * Decode the encoded save string and load game.
 */
export function loadSaveCode() {
    let loadMessage = document.querySelector(`#exportMessage`);
    // loadMessage!.innerHTML = '';
    // loadMessage!.innerHTML = `Please paste your save file code in here. `
    let loadCode = (<HTMLInputElement>document.querySelector("#saveOutput")).value;
    loadCode = atob(loadCode);
    console.log(loadCode);
    let retrievedSave = JSON.parse(loadCode);
    console.log(retrievedSave)
    load(retrievedSave);
    //TODO: Load inventory items into HTML
    //TODO: verify if save is valid. 
    //fallback: If load is invalid, start new game.
}