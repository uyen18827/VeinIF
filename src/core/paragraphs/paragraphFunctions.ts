import { Paragraphs, singleParagraph } from "../model/paragraph.js";
import { getName, getPlayer } from "../player/playerInfo.js";
import { showPronounDialogue } from "../player/pronouns.js";
import { getParagraph } from "./allParagraphs.js";
import { showChoices } from "./showChoices.js";
import { showItems } from "./showItems.js";
let currentParagraph: string | undefined;
/**Get nextid, then show the paragraph with that id.
  * @param {number} nextid next paragraph's id.
  * @param {string} style optional. Update paragraph style. Leave blank for default: clear previous paragraph then show the next one.
*/
export function updateParagraph(nextid: number, style?: string) {
    let player = getPlayer();
    let p = new singleParagraph(getParagraph(player)[nextid]);
    let nextParagraph = p.paragraph;
    // let nextParagraph = getParagraph(player)[nextid];
    const choiceContainer: HTMLElement | any = document.getElementById("choices");
    const itemContainer: HTMLElement | any = document.getElementById("items");
    let choices = nextParagraph.choices;
    let items = null;
    itemContainer.innerHTML = null;
    if (document.querySelector("input#playerName")) {
        document.addEventListener("keyup", function (e: any) {
            // e.target was the clicked element
            if (e.target && e.target.matches("input#playerName")) {
                getName();
            }
        });
    }
    setCurrentParagraphID(nextid);
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
        showItems(items, itemContainer, nextid);
    }
    showPronounDialogue();
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
    const choiceContainer: HTMLElement | any = document.getElementById("choices");
    choiceContainer.innerHTML += content;
}

let currentPid: number = 0;
function setCurrentParagraphID(pid: Paragraphs["id"]) {
    currentPid = pid;
    console.log(`current pid = ${pid}`)
}
export function getCurrentParagraphID() {
    return currentPid;
}