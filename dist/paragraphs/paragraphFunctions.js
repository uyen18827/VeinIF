import { getItem } from "../inventory/inventory.js";
import { player } from "../player/playerInfo.js";
import { getPronouns, showPronounDialogue } from "../player/pronouns.js";
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
                console.log(currentItem.itemName);
                let message = `[Added to Inventory] You picked up ${currentItem.itemName}`;
                itemHTML.innerHTML = message;
                itemHTML.style.color = "#6A6C6E";
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
    let allParagraphs = getParagraph();
    const choiceContainer = document.getElementById("choices");
    const paragraphContainer = document.getElementById("paragraph");
    const itemContainer = document.getElementById("items");
    let choices;
    let items = null;
    itemContainer.innerHTML = null;
    allParagraphs = getParagraph(player);
    switch (style) {
        case "append":
            currentParagraph = currentParagraph + " " + allParagraphs[nextid].content;
            paragraphContainer.innerHTML = currentParagraph;
            choiceContainer.innerHTML = null;
            choices = allParagraphs[nextid].choices;
            items = allParagraphs[nextid].item;
            console.log(items);
            showChoices(choices, choiceContainer);
            showItems(items, itemContainer);
            break;
        default:
            paragraphContainer.innerHTML = null;
            choiceContainer.innerHTML = null;
            currentParagraph = allParagraphs[nextid].content;
            paragraphContainer.innerHTML = currentParagraph;
            choices = allParagraphs[nextid].choices;
            items = allParagraphs[nextid].item;
            console.log(items);
            showChoices(choices, choiceContainer);
            showItems(items, itemContainer);
            let pronounsContainer = document.getElementById("pronouns");
            /**
             * Check if pronounsContainer exits, then show pronouns.
             */
            if (pronounsContainer) {
                showPronounDialogue(pronounsContainer);
                pronounsContainer.addEventListener('click', getPronouns);
            }
            break;
    }
}
//TODO: known problems: when there's two options that redirect the user to the same paragraph,
//only the first option will work.
