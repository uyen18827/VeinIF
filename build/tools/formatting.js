import { getPlayerPronouns } from "../core/player/playerInfo.js";
/////////////////////////////Formatting tools////////////////////////////////////////
/**
 *Capitalise the first letter in a string.
 */
export function capitalise(word) {
    if (!word)
        return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
}
////////////////////////////////////////////////////////////////////////////////////
/**Grey out text */
export function greyOut(thing) {
    thing.style.color = "#6A6C6E";
}
////////////////////////Grammar tools//////////////////////////////////////////
/**
 * Specify the verb form that goes with a set of pronouns.
 * Ex: (have) She has a pen / They have a pen
 * @param form verb form that goes with 'she/he'
 * @param original base verb, usually goes with 'they/you/we'
 * @returns form or original, depends on the player's selected pronouns.
 */
export function verbForm(form, original) {
    let pronoun = getPlayerPronouns();
    if (pronoun.subjectPro == "they") {
        return original;
    }
    else
        return form;
}
export function showOnCondition(type, requiredElement, value, message, failedMessage) {
    switch (type) {
        case (type = 'stat'):
            //a = check in player's stat
            //if a = checkResult.passed
            return requiredElement;
        case (type = 'item'):
            //a = check in player's inventory
            //if a = checkResult.passed
            return requiredElement;
        case (type = 'quest'):
            //a = check in player's quest log
            //if a = checkResult.passed
            return requiredElement;
        case (type = 'variable'):
            //a = check in player's variables
            //if a = checkResult.passed
            return requiredElement;
    }
}
showOnCondition('stat', `athletic`, 12, `You could try to pry it open with your crowbar`, `There's nothing else you can do here<br>`);
