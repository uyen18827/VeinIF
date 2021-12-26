import { Items } from "../model/item";
import { Precondition } from "../model/paragraph";
import { greyOut } from "../../tools/formatting";
import { checkInInventory, checkStat } from "./checkConditions";
import { checkResult } from "./choiceCondition";

export function checkItemCondition(item: Items, condition: Precondition) {
    let preItem = condition.item;
    let stat = condition.stat;
    let a, b: any;
    if (preItem) {
        preItem.forEach(requiredItem => {
            let temp = checkInInventory(`#${item.itemCode}`, requiredItem.itemCode, requiredItem.itemQty, requiredItem.itemName);
            if (temp == checkResult.failed) {
                a = temp;
            }
        });
    }
    if (stat) {
        stat.forEach(stat => {
            let temp = checkStat(item.itemCode, stat.statID, stat.statName, stat.value);
            if (temp == checkResult.failed) {
                b = temp;
            }
        });
    }
    if (a == checkResult.failed || b == checkResult.failed) {
        let itemHTML = document.querySelector(`#${item.itemCode}`);
        greyOut((<HTMLElement>itemHTML));
        itemHTML!.classList.add("item-blocked");
        console.log(`${item.itemCode} is blocked`);
    }
}