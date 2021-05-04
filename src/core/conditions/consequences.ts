import { getItem } from "../inventory/inventory";
import { Consequence } from "../model/paragraph";
import { getCurrentParagraphName } from "../paragraphs/paragraphFunctions";
import { handleStats } from "../player/statInfos";

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