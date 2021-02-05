import { getName } from "../player/playerInfo.js";
import { showPronounDialogue } from "../player/pronouns.js";
import { updateParagraph } from "../paragraphs/paragraphFunctions.js";
import { autoLoad, exportSave, exportStorageSave, loadSave, loadSaveCode, newSave } from "./saveScript.js";
import { restartGame } from "./settings.js";
import { addNewStat, getStat } from "../player/statInfos.js";
import { showAllStatHTML } from "../conditions/statsFunctions.js";
///////////////////Initialize game///////////////////
window.onload = function () {
    //check if autoSave exits?
    let autoSave = localStorage.getItem('autoSave');
    if (autoSave) {
        autoLoad();
    }
    else {
        updateParagraph(0);
    }
};
// Add event listener to HTML element input with id = "playerName"
const nameInput = document.querySelector("#playerName");
if (nameInput) {
    nameInput.addEventListener('keyup', getName);
}
////////////////////button!!!!!!!!!!!!/////////////
const button = document.querySelector("#coolbutton");
function doThing(thing) {
    console.log("thing!");
}
if (button) {
    button.addEventListener('click', doThing);
}
///////////////////////////////////////////////////
showPronounDialogue();
addNewStat('Smart', 10);
//after a new stat's introduced, run showAllStatHTML
showAllStatHTML(getStat());
// Add event listener to all Save buttons
const saveButton = document.querySelectorAll(".save");
saveButton.forEach(element => {
    let slotNumber = element.getAttribute("value");
    element.addEventListener('click', function () {
        newSave(slotNumber);
    });
});
// Add event listener to all Load buttons
const loadButton = document.querySelectorAll(".load");
loadButton.forEach(element => {
    let slotNumber = element.getAttribute("value");
    element.addEventListener('click', function () {
        loadSave(slotNumber);
    });
});
// Add event listener to all Load buttons
const exportLocalSaveBtn = document.querySelectorAll(".export");
exportLocalSaveBtn.forEach(element => {
    let slotNumber = element.getAttribute("value");
    element.addEventListener('click', function () {
        exportStorageSave(slotNumber);
    });
});
// Add event listener to export save button
const exportSaveBtn = document.querySelector(".exportSave");
exportSaveBtn?.addEventListener('click', function () {
    exportSave();
});
// Add event listener to import save button
const importSaveBtn = document.querySelector(".importSave");
importSaveBtn?.addEventListener(`click`, function () {
    loadSaveCode();
});
// Add event listener to restart game button
const restartBtn = document.querySelector(".restartBtn");
restartBtn?.addEventListener('click', function () { restartGame(); });
// let item1: Items = {
//     itemName: "meow",
//     description: "cat! It's a cat!",
//     itemQty: 1,
//     itemCode: 'meow1',
// }
// let m1 = new inventoryItem(item1, 3);
// let mockInventory : inventoryItem[] = [];
// function addToInventoryMock(item: Items, pid: number) {
//     let found = mockInventory.find(element => element.item.itemName = item.itemName);
//     if (found) {
//         found.item.itemQty += item.itemQty;
//         let pidCheck = found.pickedUpLocation.find(location => location = pid);
//         if (!pidCheck) {
//             found.pickedUpLocation.push(pid);
//         }
//     }
//     else {
//         let newItem = new inventoryItem(item, pid)
//         mockInventory.push(newItem);
//     }
// }
// addToInventoryMock(item1, 0);
// addToInventoryMock(item1, 3);
// console.log('Mock inventory: ')
// console.log(mockInventory)
