import { getItem } from "../inventory/inventory.js";
import { Consequence } from "../model/paragraph.js";
import { getCurrentParagraphName } from "../paragraphs/paragraphFunctions.js";
import { handleStats } from "../player/statInfos.js";

//Consequence: After a choice, player gain/loose item or stat point, or both.
export function applyConsequence(consequence: Consequence) {
    let item = consequence.item;
    let stat = consequence.stat
    if (item) {
        item.forEach(item => {
            getItem(item, getCurrentParagraphName());
        });
    }
    if (stat) {
        stat.forEach(stat => {
            handleStats(stat);
        });
    }
}