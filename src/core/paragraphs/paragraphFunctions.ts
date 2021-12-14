import { Paragraphs, singleParagraph } from "../model/paragraph";
import { getName, getPlayer } from "../player/playerInfo";
import { showPronounDialogue } from "../player/pronouns";
import { getParagraph } from "../../game/allParagraphs";
import { showChoices } from "./showChoices";
import { showItems } from "./showItems";
import DOMPurify from "DOMPurify";
import { htmlElements } from "../model/variables";

let currentParagraph: string | undefined;
const itemContainer: HTMLElement | any = document.getElementById(htmlElements.itemContainer);
const choiceContainer: HTMLElement | any = document.getElementById(htmlElements.choiceContainer);

/**Get nextName, then show the paragraph with that name.
  * @param {number} nextName next paragraph's name.
  * @param {string} style optional. Update paragraph style. Leave blank for default: clear previous paragraph then show the next one.
*/
export function updateParagraph(nextName: string, style?: string) {
    let player = getPlayer();
    let pName = getParagraph(player).findIndex(element => element.name == nextName);
    let p = new singleParagraph(getParagraph(player)[pName]);
    let nextParagraph = p.paragraph;
    // let nextParagraph = getParagraph(player)[nextid];
    let items = null;
    itemContainer.innerHTML = null;
    setCurrentParagraphName(nextName);
    // append paragraph content according to its style property.
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
    // get choices, clear choice container div & append new content.
    let choices = nextParagraph.choices;
    choiceContainer.textContent = null;
    showChoices(choices, choiceContainer);
    items = nextParagraph.item;
    if (items) {
        showItems(items, itemContainer, nextName);
    }
    // if paragraph content has element id = "pronouns"
    if (document.getElementById(htmlElements.pronounsContainer)) {
        showPronounDialogue();
        if (player.pronouns.Category != "") {
            let selectedPronoun = document.getElementById(player.pronouns.subjectPro);
            (<HTMLInputElement>selectedPronoun).checked = true;
        }
    }
    // if paragraph content has playerName input field: 
    if (document.querySelector("input#playerName")) {
        document.addEventListener("keyup", function (e: any) {
            // e.target was the clicked element
            if (e.target && e.target.matches("input#playerName")) {
                getName();
            }
        });
    }
}
/**
 * Set the content of HTML element id = 'paragraph'
 * @param content : string or null to clear all content
 */
function paragraphContainerContent(content: string | null) {
    const paragraphContainer: HTMLElement | any = document.getElementById("paragraph");
    paragraphContainer.innerHTML = content;
}

export function choiceContainerContent(content: string | null) {
    const choiceContainer: HTMLElement | any = document.getElementById(htmlElements.choiceContainer);
    choiceContainer.innerHTML += DOMPurify.sanitize(content!);
}

let currentName: string = "start";
/**
 * Set current paragraph's name
 * @param name Paragraphs['name']
 */
function setCurrentParagraphName(name: Paragraphs['name']) {
    currentName = name;
}
export function getCurrentParagraphName() {
    return currentName;
}