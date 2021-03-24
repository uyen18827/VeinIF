//Check if player's stat meet the need to proceed.
//For example, the choice "Climb the tree [Athletic 10]" needs Athletic = 10
import { getInventory } from "../inventory/inventory.js";
import { greyOut } from "../tools/formatting.js";
import { checkStat } from "./checkStat.js";
//before this, check if choice has precondition.
//if there's no condition on a choice, skip this function entirely.
/**
 * Check all precondition of a single choice.
 * @param choice
 * @param condition
 */
export function checkChoiceCondition(choice, condition) {
    let item = condition.item;
    let stat = condition.stat;
    let a, b;
    if (item) {
        item.forEach(item => {
            let temp = checkInInventory(choice.id, item.itemName, item.itemQty);
            if (temp == checkResult.failed) {
                a = temp;
            }
        });
    }
    if (stat) {
        stat.forEach(stat => {
            let temp = checkStat(`cid${choice.id}`, stat.statName, stat.value);
            if (temp == checkResult.failed) {
                b = temp;
            }
        });
    }
    if (a == checkResult.failed || b == checkResult.failed) {
        let choiceHTML = document.querySelector(`#cid${choice.id}`);
        greyOut(choiceHTML);
        choiceHTML.classList.add("choice-blocked");
        console.log(`${choice.id} is blocked`);
    }
}
/**Show/hide/ */
// function handleConditionHTML(choiceId: Choices['id'], message: string, style: conStyle | undefined) {
//     switch (style) {
//         case (0): //show    
//             let choiceHTML = document.querySelector(`#cid${choiceId}`);
//             // greyOut((<HTMLElement>choiceHTML));
//             choiceHTML!.innerHTML += message;
//             // choiceHTML!.classList.add("choice-blocked");
//             break;
//         case (1): //hidden - hide the entire choice
//             choiceHTML = document.querySelector(`#cid${choiceId}`);
//             choiceHTML!.innerHTML = ``
//             break;
//         case (2): //hide reason
//             // choiceHTML = document.querySelector(`#cid${choiceId}`);
//             // greyOut((<HTMLElement>choiceHTML));
//             // choiceHTML!.classList.add("choice-blocked");
//             break;
//         default: //do nothing, leave it alone.
//             break;
//     }
// }
export var checkResult;
(function (checkResult) {
    checkResult[checkResult["passed"] = 0] = "passed";
    checkResult[checkResult["failed"] = 1] = "failed";
})(checkResult || (checkResult = {}));
/**
 * Check if required item is in player's inventory
 * @param choiceId
 * @param itemName
 * @param itemQty
 * @returns checkResult passed or failed
 */
function checkInInventory(choiceId, itemName, itemQty) {
    const inInventory = getInventory().find(element => element.item.itemName == itemName);
    let choiceHTML = document.querySelector(`#cid${choiceId}`);
    if (!inInventory) {
        // console.log(`Condition: ${itemName} cannot be found in inventory`);
        choiceHTML.innerHTML += `[Condition not met: ${itemName} cannot be found in inventory]`;
        console.log(`cannot find ${itemName} in inventory`);
        return checkResult.failed;
    }
    else if (inInventory && inInventory.item.itemQty < itemQty) {
        // console.log(`Condition: ${itemName} found in inventory, but quantity is not enough`);
        choiceHTML.innerHTML += `[Condition not met: ${itemName} quantity ${inInventory.item.itemQty}/${itemQty}]`;
        return checkResult.failed;
    }
    else {
        console.log(`Condition: ${itemName} found in inventory! Proceed`);
        //let the player click on the choice
        return checkResult.passed;
    }
}
