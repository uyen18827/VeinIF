//Check if player's stat meet the need to proceed.
//For example, the choice "Climb the tree [Athletic 10]" needs Athletic = 10

import { Choices, conStyle, Precondition } from "../model/paragraph";
import { greyOut } from "../../tools/formatting";
import { checkInInventory, checkStat } from "./checkConditions";

//before this, check if choice has precondition.
//if there's no condition on a choice, skip this function entirely.
/**
 * Check all precondition of a single choice.
 * @param choice 
 * @param condition 
 */
export function checkChoiceCondition(choice: Choices, condition: Precondition) {
    let item = condition.item;
    let stat = condition.stat;
    let a, b: any;
    if (item) {
        item.forEach(item => {
            let temp = checkInInventory(`#cid${choice.id}`, item.itemCode, item.itemQty, item.itemName,);
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
        greyOut((<HTMLElement>choiceHTML));
        choiceHTML!.classList.add("choice-blocked");
        console.log(`${choice.id} is blocked`);
    }
}
/**Show/hide/ */
// function handleConditionHTML(choiceId: Choices['id'], message: string, style: conStyle | undefined) {
//     switch (style) {
//         case (0): //show    
//             let choiceHTML = document.querySelector(`#cid${choiceId}`);
//             // greyOut((<HTMLElement>choiceHTML));
//             choiceHTML!.textContent += message;
//             // choiceHTML!.classList.add("choice-blocked");
//             break;
//         case (1): //hidden - hide the entire choice
//             choiceHTML = document.querySelector(`#cid${choiceId}`);
//             choiceHTML!.textContent = ``
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
export enum checkResult {
    passed = 0,
    failed = 1,
    // notFound = 2,
    // insufficientQuantity = 3,
}