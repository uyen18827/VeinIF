import { getName } from "../player/playerInfo.js";
import { showPronounDialogue } from "../player/pronouns.js";
import { updateParagraph } from "../paragraphs/paragraphFunctions.js";
import { exportSave, exportStorageSave, loadSave, loadSaveCode, newSave } from "./saveScript.js";
///////////////////Initialize game///////////////////
window.onload = function () {
    updateParagraph(0);
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
