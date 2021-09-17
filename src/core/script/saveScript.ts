import { appendItemHTML, clearInventory, clearInventoryHTML, getInventory, loadBulkInventory } from "../inventory/inventory";
import { inventoryItem } from "../model/item";
import { clearAllStat, clearStatHTML, getStat, loadStat, showAllStatHTML } from "../player/statInfos";
import { Save } from "../model/save";
import { getCurrentParagraphName, updateParagraph } from "../paragraphs/paragraphFunctions";
import { getPlayer, setPlayer, showNameDiv } from "../player/playerInfo";
import { loadPronounsRadioBtn, showPronouns } from "../player/pronouns";
import DOMPurify from 'DOMPurify';
import { b64DecodeUnicode, b64EncodeUnicode } from "../../tools/system";

/**
 * Create a new save and stringify it.
 */
function save() {
    let save = new Save(getPlayer(), getInventory(), getCurrentParagraphName(), getStat());
    let stringSave = JSON.stringify(save);
    return stringSave;
}

function load(retrievedSave: any) {
    clearInventory();
    clearInventoryHTML();
    setPlayer(retrievedSave.player);
    loadBulkInventory(retrievedSave.inventory);
    clearAllStat();
    clearStatHTML();
    loadStat(retrievedSave.stat);
    showAllStatHTML(retrievedSave.stat)
    updateParagraph(retrievedSave.currentParagraphName, retrievedSave.player);
    retrievedSave.inventory.forEach((element: inventoryItem) => {
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
    let retrievedSave = JSON.parse(localStorage.getItem('autoSave')!);
    if (retrievedSave) {
        load(retrievedSave);
    }
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
        getSaveDesc(saveSlot);
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
    saveMessage!.textContent = null; //clear old message
    saveMessage!.innerHTML += DOMPurify.sanitize(`Save exported from ${saveSlot}.<br>
    Copy and keep the code bellow to load later`);
    let saveOutput = document.querySelector(`#saveOutput`);
    (<HTMLInputElement>saveOutput).value = ``; //clear old save
    (<HTMLInputElement>saveOutput).value = `${b64EncodeUnicode(retrievedSave!)}`; //encode to Base64
    (<HTMLInputElement>saveOutput).select();
}

/**
 * Generate a random-looking string that save the game's progress.
 * The string is encoded to Base64 to prevent players (to an extent) from altering their save.
 */
export function exportSave() {
    let saveMessage = document.querySelector('#exportMessage');
    saveMessage!.textContent = null; //clear old message
    saveMessage!.innerHTML += DOMPurify.sanitize(`Save created at ${new Date().toLocaleString()}.<br>
    Copy and keep the code bellow to load later`);
    let saveOutput = document.querySelector(`#saveOutput`);
    (<HTMLInputElement>saveOutput).value = ``; //clear old save
    (<HTMLInputElement>saveOutput).value += `${b64EncodeUnicode(save())}`; //encode to Base64
    (<HTMLInputElement>saveOutput).select();
}

/**
 * Get Save Code from textarea id = "saveOutput"
 * Decode the encoded save string and load game.
 */
export function loadSaveCode() {
    let loadCode = (<HTMLInputElement>document.querySelector("#saveOutput")).value;
    loadCode = b64DecodeUnicode(loadCode);
    console.log(loadCode);
    let retrievedSave = JSON.parse(loadCode);
    console.log(retrievedSave)
    load(retrievedSave);
    let loadMessage = document.querySelector(`#exportMessage`);
    loadMessage!.innerHTML += DOMPurify.sanitize(`<div class="alert alert-warning alert-dismissible fade show mt-1" role="alert">
        <strong> Load Success! </strong> Loaded save from ${retrievedSave.date}.
            <button type = "button" class="btn-close" data - bs - dismiss="alert" aria - label="Close"> </button>
                </div>`);
    //TODO: verify if save is valid. 
    //TODO: fallback: If load is invalid, start new game.
}

export function getSaveDesc(saveSlot: string) {
    let retrievedSave = JSON.parse(localStorage.getItem(saveSlot)!);
    let description = retrievedSave.date;
    let descContainer = document.querySelector(`#saveDesc-${saveSlot}`);
    descContainer!.innerHTML = DOMPurify.sanitize(description);
}