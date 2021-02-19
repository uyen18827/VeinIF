import { getInventory } from "../inventory/inventory.js";
import { Items } from "../model/item.js";
import { Precondition } from "../model/paragraph.js";
import { getStat } from "../player/statInfos.js";
import { greyOut } from "../tools/formatting.js";

export function checkItemCondition(item: Items, condition: Precondition) {
    let preItem = condition.item;
    let stat = condition.stat;
    if (preItem) {
        preItem.forEach(item => {
            checkPreItem(item.itemCode, item.itemQty);
            console.log(`found preItem precondition`)
        });
    }
    if (stat) {
        stat.forEach(stat => {
            console.log(`found stat precondition`)
            checkStat(item.itemCode, stat.statName, stat.value);
        });
    }
}

function checkStat(itemCode: Items['itemCode'], statName: string, value: number) {
    var found = getStat().find(element => element.statName == statName);
    let itemHTML = document.querySelector(`#${itemCode}`);
    if (found) {
        if (found.value < value) {
            console.log("Condition not met!");
            //grey out the choice + show the reason
            greyOut((<HTMLElement>itemHTML));
            itemHTML!.innerHTML += `[Condition not met: ${statName} value ${found.value}/${value}]`;
            itemHTML!.classList.add("item-blocked");
            console.log(`${found.value} < ${value}`)
            //if found is undefined, also grey out. => not implemented yet.
        }
        if (found.value >= value) {
            console.log("Condition met. Proceed.");
            //let the player click on the choice
        }
    }
    else {
        console.log("Condition not met!");
        itemHTML!.innerHTML += ` [Condition not met: player does not have ${statName}]`;
        greyOut((<HTMLElement>itemHTML));
        itemHTML!.classList.add("item-blocked");
    }
}


function checkPreItem(itemCode: string, itemQty: number) {
    const inInventory = getInventory().find(element => element.item.itemCode == itemCode);
    let itemHTML = document.querySelector(`#${itemCode}`);
    greyOut((<HTMLElement>itemHTML));
    if (!inInventory) {
        // console.log(`Condition: ${itemName} cannot be found in inventory`);
        itemHTML!.innerHTML += `[Condition not met: ${itemCode} cannot be found in inventory]`;
        itemHTML!.classList.add("choice-blocked");
    }
    else if (inInventory && inInventory.item.itemQty < itemQty) {
        // console.log(`Condition: ${itemName} found in inventory, but quantity is not enough`);
        greyOut((<HTMLElement>itemHTML));
        itemHTML!.innerHTML += `[Condition not met: ${itemCode} quantity ${inInventory.item.itemQty}/${itemQty}]`;
        itemHTML!.classList.add("choice-blocked");
    }
}