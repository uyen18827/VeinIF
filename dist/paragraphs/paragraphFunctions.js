import { singleParagraph } from "../model/paragraph.js";
import { getName, getPlayer } from "../player/playerInfo.js";
import { showPronounDialogue } from "../player/pronouns.js";
import { getParagraph } from "./allParagraphs.js";
import { showChoices } from "./showChoices";
import { showItems } from "./showItems";
var currentParagraph;
/**Get nextid, then show the paragraph with that id.
  * @param {number} nextid next paragraph's id.
  * @param {string} style optional. Update paragraph style. Leave blank for default: clear previous paragraph then show the next one.
*/
export function updateParagraph(nextid, style) {
    let player = getPlayer();
    let p = new singleParagraph(getParagraph(player)[nextid]);
    let nextParagraph = p.paragraph;
    const choiceContainer = document.getElementById("choices");
    const paragraphContainer = document.getElementById("paragraph");
    const itemContainer = document.getElementById("items");
    let choices = nextParagraph.choices;
    let items = null;
    itemContainer.innerHTML = null;
    document.addEventListener("keyup", function (e) {
        // e.target was the clicked element
        if (e.target && e.target.matches("input#playerName")) {
            getName();
        }
    });
    switch (style) {
        case "append":
            setCurrentParagraphID(nextid);
            currentParagraph = currentParagraph + " " + nextParagraph.content;
            paragraphContainer.innerHTML = currentParagraph;
            choiceContainer.innerHTML = null;
            items = nextParagraph.item;
            showChoices(choices, choiceContainer);
            if (items) {
                showItems(items, itemContainer, nextid);
            }
            showPronounDialogue();
            break;
        default:
            setCurrentParagraphID(nextid);
            paragraphContainer.innerHTML = null;
            choiceContainer.innerHTML = null;
            currentParagraph = nextParagraph.content;
            paragraphContainer.innerHTML = currentParagraph;
            items = nextParagraph.item;
            showChoices(choices, choiceContainer);
            if (items) {
                showItems(items, itemContainer, nextid);
            }
            showPronounDialogue();
            break;
    }
}
let currentPid = 0;
function setCurrentParagraphID(pid) {
    currentPid = pid;
    console.log(`current pid = ${pid}`);
}
export function getCurrentParagraphID() {
    return currentPid;
}
