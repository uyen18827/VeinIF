import { appendItemHTML, clearInventory, clearInventoryHTML, getInventory, loadBulkInventory } from "../inventory/inventory.js";
import { clearAllStat, clearStatHTML, getStat, loadStat, showAllStatHTML } from "../player/statInfos.js";
import { Save } from "../model/save.js";
import { getCurrentParagraphName, updateParagraph } from "../paragraphs/paragraphFunctions.js";
import { getPlayer, setPlayer, showNameDiv } from "../player/playerInfo.js";
import { loadPronounsRadioBtn, showPronouns } from "../player/pronouns.js";
/**
 * Create a new save and stringify it.
 */
function save() {
    let save = new Save(getPlayer(), getInventory(), getCurrentParagraphName(), getStat());
    let stringSave = JSON.stringify(save);
    return stringSave;
}
function load(retrievedSave) {
    clearInventory();
    clearInventoryHTML();
    setPlayer(retrievedSave.player);
    loadBulkInventory(retrievedSave.inventory);
    clearAllStat();
    clearStatHTML();
    loadStat(retrievedSave.stat);
    showAllStatHTML(retrievedSave.stat);
    updateParagraph(retrievedSave.currentParagraphName, retrievedSave.player);
    retrievedSave.inventory.forEach((element) => {
        if (element.item.itemQty > 0) {
            appendItemHTML(element.item);
        }
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
    let retrievedSave = JSON.parse(localStorage.getItem('autoSave'));
    if (retrievedSave) {
        load(retrievedSave);
    }
}
/**
 * Save the game's state to LocalStorage
 * @param saveSlot string that would later used as LocalStorage key.
 */
export function newSave(saveSlot) {
    //check if LocalStorage is supported on client's browser
    if (typeof (Storage) !== "undefined") {
        console.log(`LocalStorage is supported! Saved file to ${saveSlot}`);
        localStorage.setItem(saveSlot, save());
        getSaveDesc(saveSlot);
    }
    else {
        console.log("LocalStorage is not supported in this browser! Please export the save code instead.");
    }
}
//TODO: Make a proper LocalStorage is not supported message that shows on page, not just in console.
export function loadSave(saveSlot) {
    if (typeof (Storage) !== "undefined") {
        console.log("LocalStorage is supported!");
        let retrievedSave = JSON.parse(localStorage.getItem(saveSlot));
        load(retrievedSave);
    }
    else {
        console.log("LocalStorage is not supported in this browser! Please export the save code instead.");
    }
}
export function exportStorageSave(saveSlot) {
    let retrievedSave = localStorage.getItem(saveSlot);
    let saveMessage = document.querySelector('#exportMessage');
    saveMessage.textContent = null; //clear old message
    saveMessage.innerHTML += `Save exported from ${saveSlot}.<br> 
    Copy and keep the code bellow to load later`;
    let saveOutput = document.querySelector(`#saveOutput`);
    saveOutput.value = ``; //clear old save
    saveOutput.value = `${btoa(retrievedSave)}`; //encode to Base64
    saveOutput.select();
}
/**
 * Generate a random-looking string that save the game's progress.
 * The string is encoded to Base64 to prevent players (to an extent) from altering their save.
 */
export function exportSave() {
    let saveMessage = document.querySelector('#exportMessage');
    saveMessage.textContent = null; //clear old message
    saveMessage.innerHTML += `Save created at ${new Date().toLocaleString()}.<br> 
    Copy and keep the code bellow to load later`;
    let saveOutput = document.querySelector(`#saveOutput`);
    saveOutput.value = ``; //clear old save
    saveOutput.value += `${btoa(save())}`; //encode to Base64
    saveOutput.select();
}
/**
 * Get Save Code from textarea id = "saveOutput"
 * Decode the encoded save string and load game.
 */
export function loadSaveCode() {
    let loadCode = document.querySelector("#saveOutput").value;
    loadCode = atob(loadCode);
    console.log(loadCode);
    let retrievedSave = JSON.parse(loadCode);
    console.log(retrievedSave);
    load(retrievedSave);
    let loadMessage = document.querySelector(`#exportMessage`);
    loadMessage.innerHTML += `<div class="alert alert-warning alert-dismissible fade show mt-1" role="alert">
        <strong> Load Success! </strong> Loaded save from ${retrievedSave.date}.
            <button type = "button" class="btn-close" data - bs - dismiss="alert" aria - label="Close"> </button>
                </div>`;
    //TODO: verify if save is valid. 
    //TODO: fallback: If load is invalid, start new game.
}
export function getSaveDesc(saveSlot) {
    let retrievedSave = JSON.parse(localStorage.getItem(saveSlot));
    let description = retrievedSave.date;
    let descContainer = document.querySelector(`#saveDesc-${saveSlot}`);
    descContainer.innerHTML = description;
}