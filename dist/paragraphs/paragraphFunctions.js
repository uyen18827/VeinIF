import { addToPickedUp } from "../conditions/pickedUpItems.js";
import { getItem } from "../inventory/inventory.js";
import { getName, getPlayer } from "../player/playerInfo.js";
import { showPronounDialogue } from "../player/pronouns.js";
import { autoSave } from "../script/saveScript.js";
import { getParagraph } from "./allParagraphs.js";
var currentParagraph;
/**
 * Show available choices in a paragraph
 * @param choices should takes the value of allParagraphs[nextid].choices
 * @param choiceContainer document.getElementById("choices");
 */
function showChoices(choices, choiceContainer) {
    if (choices) {
        for (var i = 0; i < choices.length; i++) {
            var currentChoice = choices[i];
            var nextid = currentChoice.nextid;
            let choice = `<a href="#" 
            class="choices" id="n${nextid}" >
            ${currentChoice.choiceCont} 
            </a><br>`;
            choiceContainer.innerHTML += choice;
        }
        for (var i = 0; i < choices.length; i++) {
            let currentChoice = choices[i];
            let nextid = currentChoice.nextid;
            let style = choices[i].style;
            let choiceHTML = choiceContainer.querySelector(`#n${nextid}`);
            choiceHTML.addEventListener('click', function () {
                updateParagraph(nextid, style);
                autoSave();
            });
        }
    }
}
/**
 * Show items present in a paragraph. Upon clicking on the item, it'll be added to inventory
 * @param items
 * @param itemContainer
 */
function showItems(items, itemContainer) {
    if (items) {
        for (var i = 0; i < items.length; i++) {
            let currentItem = items[i];
            let item = `<a href="#" class="items" id="${currentItem.itemCode}">You found a ${currentItem.itemName}</a><br>`;
            itemContainer.innerHTML += item;
        }
        for (var i = 0; i < items.length; i++) {
            let currentItem = items[i];
            let itemHTML = itemContainer.querySelector(`#${currentItem.itemCode}`);
            itemHTML.addEventListener("click", function () {
                getItem(currentItem);
                addToPickedUp(currentItem, getCurrentParagraphID());
                console.log(currentItem.itemName);
                let message = `[Added to Inventory] You picked up ${currentItem.itemName}`;
                itemHTML.innerHTML = message;
                itemHTML.style.color = "#6A6C6E";
                autoSave();
            }, { once: true });
            console.log(`item Name: ${currentItem.itemName}`);
            console.log(`item code: ${currentItem.itemCode}`);
        }
    }
}
/**Get nextid, then show the paragraph with that id.
  * @param {number} nextid next paragraph's id.
  * @param {string} style optional. Update paragraph style. Leave blank for default: clear previous paragraph then show the next one.
*/
export function updateParagraph(nextid, style) {
    let player = getPlayer();
    let allParagraphs = getParagraph(player)[nextid];
    const choiceContainer = document.getElementById("choices");
    const paragraphContainer = document.getElementById("paragraph");
    const itemContainer = document.getElementById("items");
    let choices;
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
            currentParagraph = currentParagraph + " " + allParagraphs.content;
            paragraphContainer.innerHTML = currentParagraph;
            choiceContainer.innerHTML = null;
            choices = allParagraphs.choices;
            items = allParagraphs.item;
            console.log(items);
            showChoices(choices, choiceContainer);
            if (items) {
                showItems(items, itemContainer);
            }
            showPronounDialogue();
            setCurrentParagraphID(nextid);
            break;
        default:
            paragraphContainer.innerHTML = null;
            choiceContainer.innerHTML = null;
            currentParagraph = allParagraphs.content;
            paragraphContainer.innerHTML = currentParagraph;
            choices = allParagraphs.choices;
            items = allParagraphs.item;
            console.log(items);
            showChoices(choices, choiceContainer);
            if (items) {
                showItems(items, itemContainer);
            }
            showPronounDialogue();
            setCurrentParagraphID(nextid);
            break;
    }
}
//TODO: known problems: when there's two options that redirect the user to the same paragraph,
//only the first option will work.
let currentPid = 0;
function setCurrentParagraphID(pid) {
    currentPid = pid;
    console.log(`current pid = ${pid}`);
}
export function getCurrentParagraphID() {
    return currentPid;
}
