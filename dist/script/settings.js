import { clearInventory, clearInventoryHTML } from "../inventory/inventory.js";
import { updateParagraph } from "../paragraphs/paragraphFunctions.js";
import { resetPlayer } from "../player/playerInfo.js";
import { clearAllStat, clearStatHTML } from "../player/statInfos.js";
import { autoSave } from "./saveScript.js";
export function restartGame() {
    updateParagraph(0);
    clearInventory();
    resetPlayer();
    clearInventoryHTML();
    clearAllStat();
    clearStatHTML();
    autoSave();
}
let gameInfo = {
    gameVersion: `0.0.1`,
    IFID: ``,
    name: ``,
    description: ``,
    author: ``,
    engineVersion: `0.0.0.1`,
    engine: ``
};
