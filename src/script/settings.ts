import { clearInventory, clearInventoryHTML } from "../inventory/inventory.js";
import { updateParagraph } from "../paragraphs/paragraphFunctions.js";
import { resetPlayer } from "../player/playerInfo.js";
import { autoSave } from "./saveScript.js";

export function restartGame() {
    updateParagraph(0);
    clearInventory();
    resetPlayer();
    autoSave();
    clearInventoryHTML();
}