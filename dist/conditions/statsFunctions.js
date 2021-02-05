//Check if player's stat meet the need to proceed.
//For example, the choice "Climb the tree [Athletic 10]" needs Athletic = 10
import { getInventory } from "../inventory/inventory.js";
import { getStat } from "../player/statInfos.js";
import { greyOut } from "../tools/formatting.js";
//before this, check if condition is present.
//if there's no condition on a choice, skip this function entirely.
export function checkChoiceCondition(choice, condition) {
    let item = condition.item;
    let stat = condition.stat;
    if (item) {
        checkInInventory(choice.id, item.itemName, item.itemQty);
    }
    if (stat) {
        checkStat(stat.statName, stat.value);
    }
}
/**
 * Check in player's inventory if they have the needed item to proceed with a choice.
 * If not, grey out the choice and class "choice-blocked"
 * @param choice
 * @param itemName : string
 * @param itemQty
 */
function checkInInventory(choiceId, itemName, itemQty) {
    const inInventory = getInventory().find(element => element.item.itemName == itemName &&
        element.item.itemQty == itemQty);
    if (!inInventory) {
        console.log(`Condition: ${itemName} cannot be found in inventory`);
        let choiceHTML = document.querySelector(`#cid${choiceId}`);
        greyOut(choiceHTML);
        choiceHTML.innerHTML += `[Condition not met: ${itemName} cannot be found in inventory]`;
        choiceHTML.classList.add("choice-blocked");
    }
    // else {
    //     console.log(`Condition: ${itemName} found in inventory! Proceed`)
    //     //let the player click on the choice
    // }
}
function checkStat(statName, value) {
    var found = getStat().find(element => element.statName = statName);
    if (found) {
        if (found.value < value) {
            console.log("Condition not met!");
            //grey out the choice + show the reason
        }
        if (found.value >= value) {
            console.log("Condition met. Proceed.");
            //let the player click on the choice
        }
    }
}
;
export function appendStatHTML(stat) {
    let statContainer = document.querySelector(`.stat`);
    statContainer.innerHTML += `<div id='stat-${stat.statName}'>${stat.statName}: ${stat.value}</div>`;
}
export function showAllStatHTML(stat) {
    stat.forEach(element => {
        appendStatHTML(element);
    });
}
