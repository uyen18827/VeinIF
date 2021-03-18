import { getPlayerPronouns } from "../player/playerInfo.js";
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
