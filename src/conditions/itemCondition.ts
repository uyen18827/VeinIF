import { getInventory } from "../inventory/inventory.js";
import { Items } from "../model/item.js";
import { Precondition } from "../model/paragraph.js";
import { greyOut } from "../tools/formatting.js";
import { checkStat } from "./checkStat.js";
import { checkResult } from "./choiceCondition.js";

export function checkItemCondition(item: Items, condition: Precondition) {
    let preItem = condition.item;
    let stat = condition.stat;
    let a, b: any;
    if (preItem) {
        preItem.forEach(requiredItem => {
            let temp = checkPreItem(requiredItem.itemCode, requiredItem.itemQty);
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

function checkPreItem(itemCode: string, itemQty: number) {
    const inInventory = getInventory().find(element => element.item.itemCode == itemCode);
    let itemHTML = document.querySelector(`#${itemCode}`);
    if (!inInventory) {
        // console.log(`Condition: ${itemName} cannot be found in inventory`);
        itemHTML!.innerHTML += `[Condition not met: ${itemCode} cannot be found in inventory]`;
        return checkResult.failed;
    }
    else if (inInventory && inInventory.item.itemQty < itemQty) {
        // console.log(`Condition: ${itemName} found in inventory, but quantity is not enough`);
        itemHTML!.innerHTML += `[Condition not met: ${itemCode} quantity ${inInventory.item.itemQty}/${itemQty}]`;
        return checkResult.failed;
    }
}