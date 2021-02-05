import { checkChoiceCondition } from "../conditions/statsFunctions.js";
import { getInventory, getItem } from "../inventory/inventory.js";
import { singleParagraph } from "../model/paragraph.js";
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
            let choice = `<a href="#" 
            class="choices" id="cid${currentChoice.id}" >
            ${currentChoice.choiceCont} 
            </a><br>`;
            choiceContainer.innerHTML += choice;
            if (currentChoice.precondition) {
                console.log(`choice n.${currentChoice.id} is not undefined`);
                checkChoiceCondition(currentChoice, currentChoice.precondition);
            }
            else {
                console.log(`choice n.${currentChoice.id} has no condition`);
            }
        }
        for (var i = 0; i < choices.length; i++) {
            let currentChoice = choices[i];
            let nextid = currentChoice.nextid;
            let style = choices[i].style;
            let choiceHTML = choiceContainer.querySelector(`#cid${currentChoice.id}`);
            if (!choiceHTML.classList.contains("choice-blocked")) {
                choiceHTML.addEventListener('click', function () {
                    updateParagraph(nextid, style);
                    autoSave();
                });
            }
            //if doesn't have class choice-blocked, add event listener, if not, don't do anything
        }
    }
}
function showItems(items, itemContainer, pid) {
    //these are kinda ugly but oh my god did it run :( Probably should refactor some other time
    for (var i = 0; i < items.length; i++) {
        let currentItem = items[i];
        let found = getInventory().find(element => element.item.itemName == currentItem.itemName && element.item.itemCode == currentItem.itemCode);
        if (found) { //item name is in inventory
            //Check if item had been found at this location
            let pidCheck = found.pickedUpLocation.find(element => element == pid);
            if (pidCheck) {
                let message = `<a href="#" class="items picked" id="${currentItem.itemCode}">[Added to Inventory] You've already picked up ${currentItem.itemName}</a><br>`;
                console.log(`${currentItem.itemName} is already picked up at this location (${pid})`);
                itemContainer.innerHTML += message;
            }
            else { //not found at this location
                let item = `<a href="#" class="items item-new-location" id="${currentItem.itemCode}">You found ×${currentItem.itemQty} ${currentItem.itemName}</a><br>`;
                itemContainer.innerHTML += item;
            }
        }
        else { //entirely new item name, entirely new location
            let item = `<a href="#" class="items" id="${currentItem.itemCode}">You found ×${currentItem.itemQty} ${currentItem.itemName}</a><br>`;
            itemContainer.innerHTML += item;
        }
    }
    //add Event listener
    for (var i = 0; i < items.length; i++) {
        let currentItem = items[i];
        let itemHTML = itemContainer.querySelector(`#${currentItem.itemCode}`);
        let pickedUp = itemHTML.classList.contains(`picked`);
        let newLocation = itemHTML.classList.contains(`item-new-location`);
        //if item has class item-new-location, push new location and add to quantity
        if (newLocation) {
            itemHTML.addEventListener("click", function () {
                getItem(currentItem, getCurrentParagraphID());
                let message = `[Added to Inventory] You picked up ${currentItem.itemName}`;
                itemHTML.innerHTML = message;
                itemHTML.style.color = "#6A6C6E";
                autoSave();
            }, { once: true });
        }
        else if (pickedUp) {
            itemHTML.style.color = "#6A6C6E";
        }
        else { //entirely new item name, entirely new location
            itemHTML.addEventListener("click", function () {
                getItem(currentItem, getCurrentParagraphID());
                console.log(currentItem.itemName);
                let message = `[Added to Inventory] You picked up ${currentItem.itemName}`;
                itemHTML.innerHTML = message;
                itemHTML.style.color = "#6A6C6E";
                autoSave();
            }, { once: true });
        }
    }
}
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
            setCurrentParagraphID(nextid);
            currentParagraph = currentParagraph + " " + nextParagraph.content;
            paragraphContainer.innerHTML = currentParagraph;
            choiceContainer.innerHTML = null;
            choices = nextParagraph.choices;
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
            choices = nextParagraph.choices;
            items = nextParagraph.item;
            showChoices(choices, choiceContainer);
            if (items) {
                showItems(items, itemContainer, nextid);
            }
            showPronounDialogue();
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
