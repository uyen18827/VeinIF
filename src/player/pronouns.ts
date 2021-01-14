import { Pronouns } from "../model/player.js"
import { player } from "./playerInfo.js";
/** List of pronouns. Add, edit or remove accordingly to author's needs.
 * To change structure i.e adding more field like title: "Mr"... refer to src/model/player.ts
 */
export const pronouns: Pronouns[] = [
    {
        Category: "He/Him",
        subjectPro: "he",
        objectPro: "him",
        possAdj: "his",
        is: "he's",
        possessivePro: "his",
        reflex: "himself"
    },
    {
        Category: "She/Her",
        subjectPro: "she",
        objectPro: "her",
        possAdj: "her",
        possessivePro: "hers",
        reflex: "herself",
        is: "she's",
    },
    {
        Category: "They/Them",
        subjectPro: "they",
        objectPro: "them",
        possAdj: "their",
        is: "they're",
        possessivePro: "theirs",
        reflex: "themselves"
    }
];
/**
 * Show radio group with pronouns option for players to choose from.
 * Append radio buttons to pronounsContainer.
 * @param pronounsContainer 
 */
export function showPronounDialogue(pronounsContainer: HTMLElement | any) {
    let pronounsLength = pronouns.length;
    for (var i = 0; i < pronounsLength; i++) {
        let pronounEntry: string = `
            <input type="radio" id="${pronouns[i].subjectPro}" name="pronouns" value="${pronouns[i].Category}">
            <label for="${pronouns[i].subjectPro}">${pronouns[i].Category}</label><br>`
        pronounsContainer.innerHTML += pronounEntry;
        console.log(pronouns[i]);
    }
}

/**
 * Get Pronouns value from clicked radio button
 */
export function getPronouns() {
    var selectedPronoun = (document.querySelector('input[name="pronouns"]:checked') as HTMLInputElement)?.value;
    var found = pronouns.find(element => element.Category == selectedPronoun);
    if (found) { setPronouns(found) };
    console.log(selectedPronoun);
    console.log(player);
}
/**
 * Save player's selected pronoun
 * @param pronouns 
 */
export function setPronouns(pronouns: Pronouns) {
    player.pronouns = pronouns;
}