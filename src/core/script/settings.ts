import { clearInventory, clearInventoryHTML } from "../inventory/inventory.js";
import { conStyle } from "../model/paragraph.js";
import { updateParagraph } from "../paragraphs/paragraphFunctions.js";
import { resetPlayer } from "../player/playerInfo.js";
import { clearAllStat, clearStatHTML, getStat, restoreDefaultStat, showAllStatHTML } from "../player/statInfos.js";
import { autoSave } from "./saveScript.js";

export function restartGame() {
    updateParagraph(0);
    clearInventory();
    resetPlayer();
    clearInventoryHTML();
    clearAllStat();
    clearStatHTML();
    restoreDefaultStat();
    showAllStatHTML(getStat());
    autoSave();
};

/**
 * Toggle the appearance of reason on choices
 * 3 cases: show both the choice and the condition
 * hide choice if condition is not met
 * hide the reason
 */
export function toggleReason(style: conStyle) {
    switch (style) {
        case (style = conStyle.hidden):
            //hide reason and choice
            break;
        case (style = conStyle.hideReason):
            //hide reason only
            break;
        case (style = conStyle.show):
            //show choice and reason
            break;
    }
}

/**
 * Increase font size
 */
export function setFontSize(size: number) {
    
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
    name: `Demo`,
    description: ``,
    author: `Author Name`, //your name
    engineVersion: `0.0.0.1`,
    engine: ``
}