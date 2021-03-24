import { getStat } from "../player/statInfos.js";
import { checkResult } from "./choiceCondition.js";

/**
 * Check if player's stat 
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
            console.log("Condition not met!");
            //show reason why it's failed
            elementHTML!.innerHTML += ` [Condition not met: ${statName} value ${found.value}/${value}]`;
            // console.log(`${found.value} < ${value}`);
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