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

export interface gameDetails{
    gameVersion: string;
    IFID: string;
    name: string;
    description: string;//game description;
    author: string;
    engineVersion: string;
    engine: string;    
}

let gameInfo: gameDetails = {
    gameVersion: `0.0.1`,
    IFID: ``,
    name: ``,
    description: ``,
    author: ``, //your name
    engineVersion: `0.0.0.1`,
    engine: ``
}