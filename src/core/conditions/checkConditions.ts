import { getInventory } from "../inventory/inventory";
import { getStat } from "../player/statInfos";
import { checkResult } from "./choiceCondition";

/**
 * Check if player's stat satisfy precondition
 * @param elementId HTML element's id
 * @param statName required stat's name
 * @param value required value
 * @returns enum checkResult passed or failed.
 */
export function checkStat(elementId: string, statName: string, value: number) {
    var found = getStat().find(element => element.statName == statName);
    let elementHTML = document.querySelector(`#${elementId}`);
    if (found) {
        if (found.value < value) {
            console.log(`Condition not met! ${found.value} < ${value}`);
            //show reason why it's failed
            elementHTML!.innerHTML += ` [Condition not met: ${statName} value ${found.value}/${value}]`;
            return checkResult.failed;
        }
        if (found.value >= value) {
            console.log("Condition met. Proceed.");
            //let the player click on the choice
            return checkResult.passed;
        }
    }
    else {
        console.log("Condition not met!");
        elementHTML!.innerHTML += ` [Condition not met: player does not have ${statName}]`;
        return checkResult.failed;
    }
};
/**
 * Check if required item is in player's inventory
 * @param choiceId 
 * @param itemCode 
 * @param itemName 
 * @param itemQty 
 * @returns checkResult passed or failed
 */
export function checkInInventory(elementId: string, itemCode: string, itemQty: number, itemName: string) {
    const inInventory = getInventory().find(element => element.item.itemCode == itemCode);
    let elementHTML = document.querySelector(elementId);
    if (!inInventory) {
        elementHTML!.innerHTML += ` [Condition not met: ${itemName} cannot be found in inventory]`;
        return checkResult.failed;
    }
    else if (inInventory && inInventory.item.itemQty < itemQty) {
        elementHTML!.innerHTML += ` [Condition not met: ${itemName} quantity ${inInventory.item.itemQty}/${itemQty}]`;
        return checkResult.failed;
    }
    else {
        console.log(`Condition: ${itemName} found in inventory! Proceed`)
        //let the player click on the choice
        return checkResult.passed;
    }
}