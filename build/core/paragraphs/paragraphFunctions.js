import { singleParagraph } from "../model/paragraph.js";
import { getName, getPlayer } from "../player/playerInfo.js";
import { showPronounDialogue } from "../player/pronouns.js";
import { getParagraph } from "../../game/allParagraphs.js";
import { showChoices } from "./showChoices.js";
import { showItems } from "./showItems.js";
let currentParagraph;
/**Get nextName, then show the paragraph with that name.
  * @param {number} nextName next paragraph's name.
  * @param {string} style optional. Update paragraph style. Leave blank for default: clear previous paragraph then show the next one.
*/
export function updateParagraph(nextName, style) {
    let player = getPlayer();
    // console.log(getParagraph(player));
    let pName = getParagraph(player).findIndex(element => element.name == nextName);
    // console.log(pName, nextName);
    // console.log(getParagraph(player)[pName])
    let p = new singleParagraph(getParagraph(player)[pName]);
    let nextParagraph = p.paragraph;
    // let nextParagraph = getParagraph(player)[nextid];
    const choiceContainer = document.getElementById("choices");
    const itemContainer = document.getElementById("items");
    let choices = nextParagraph.choices;
    let items = null;
    itemContainer.innerHTML = null;
    if (document.querySelector("input#playerName")) {
        document.addEventListener("keyup", function (e) {
            // e.target was the clicked element
            if (e.target && e.target.matches("input#playerName")) {
                getName();
            }
        });
    }
    setCurrentParagraphName(nextName);
    switch (style) {
        case "append":
            currentParagraph = currentParagraph + " " + nextParagraph.content;
            paragraphContainerContent(currentParagraph);
            break;
        default:
            paragraphContainerContent(null);
            currentParagraph = nextParagraph.content;
            paragraphContainerContent(currentParagraph);
            break;
    }
    choiceContainer.textContent = null;
    items = nextParagraph.item;
    showChoices(choices, choiceContainer);
    if (items) {
        showItems(items, itemContainer, nextName);
    }
    showPronounDialogue();
}
/**
 * Set the content of HTML element id = 'paragraph'
 * @param content : string or null to clear all content
 */
function paragraphContainerContent(content) {
    const paragraphContainer = document.getElementById("paragraph");
    paragraphContainer.innerHTML = content;
}
export function choiceContainerContent(content) {
    const choiceContainer = document.getElementById("choices");
    choiceContainer.innerHTML += content;
}
let currentName = "start";
function setCurrentParagraphName(name) {
    currentName = name;
}
export function getCurrentParagraphName() {
    return currentName;
}
