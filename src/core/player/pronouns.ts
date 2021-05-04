import { Pronouns } from "../model/player"
import { player } from "./playerInfo";
/** List of pronouns. Add, edit or remove accordingly to author's needs.
 * To change structure i.e adding more field like title: "Mr"... refer to src/model/player.ts
 */
export const pronouns: Pronouns[] = [
    {
        Category: "He/Him",
        subjectPro: "he",
        objectPro: "him",
        possAdj: "his",
        possessivePro: "his",
        reflex: "himself",
        is: "he is",
    },
    {
        Category: "She/Her",
        subjectPro: "she",
        objectPro: "her",
        possAdj: "her",
        possessivePro: "hers",
        reflex: "herself",
        is: "she is",
    },
    {
        Category: "They/Them",
        subjectPro: "they",
        objectPro: "them",
        possAdj: "their",
        possessivePro: "theirs",
        reflex: "themselves",
        is: "they are",
    }
];
/**
 * Show radio group with pronouns option for players to choose from.
 * Append radio buttons to HTML element with id = "pronouns".
 */
export function showPronounDialogue() {
    let pronounsContainer: HTMLElement | any = document.getElementById("pronouns");
    if (pronounsContainer) {
        let pronounsLength = pronouns.length;
        for (var i = 0; i < pronounsLength; i++) {
            let pronounEntry: string = `
            <input type="radio" id="${pronouns[i].subjectPro}" name="pronouns" value="${pronouns[i].Category}">
            <label for="${pronouns[i].subjectPro}">${pronouns[i].Category}</label><br>`
            pronounsContainer.innerHTML += pronounEntry;
        }
        pronounsContainer.addEventListener('click', getPronouns);
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
    showPronouns(pronouns);
}

export function loadPronounsRadioBtn(pronouns: Pronouns){
    let savedPronouns: HTMLElement | any = document.getElementById(`${pronouns.subjectPro}`);
    savedPronouns.checked = true;
}

/**
 * Show player's pronouns on all element with class = "playerPronouns"
 */
export function showPronouns(pronouns: Pronouns) {
    let pronounsClassed = document.querySelectorAll(".playerPronouns");
    if (pronounsClassed) {
        pronounsClassed.forEach(element => element.innerHTML = `${pronouns.Category}`);
    }
    
}