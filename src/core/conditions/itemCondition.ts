import { Items } from "../model/item.js";
import { Precondition } from "../model/paragraph.js";
import { greyOut } from "../../tools/formatting.js";
import { checkInInventory, checkStat } from "./checkConditions.js";
import { checkResult } from "./choiceCondition.js";

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
            let temp = checkStat(item.itemCode, stat.statName, stat.value);
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

// function appendInventoryReason(elementId: string, itemName: string, reqQty: number, actualQty: number, result: checkResult) {
//     let elementHTML = document.querySelector(`#${elementId}`);
//     switch (result) {
//         case (result = checkResult.notFound):
//             elementHTML!.innerHTML += ` [Condition not met: ${itemName} cannot be found in inventory]`;
//             break;
//         case (result = checkResult.insufficientQuantity):
//             elementHTML!.innerHTML += ` [Condition not met: ${itemName} quantity ${actualQty}/${reqQty}]`;
//             break;
//     }
// }