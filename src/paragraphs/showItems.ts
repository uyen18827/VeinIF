import { getInventory, getItem } from "../inventory/inventory.js";
import { Items } from "../model/item.js";
import { autoSave } from "../script/saveScript.js";
import { checkItemCondition } from "../conditions/itemCondition.js";
import { getCurrentParagraphID } from "./paragraphFunctions";

export function showItems(items: Items[], itemContainer: any, pid: number) {
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
                if (currentItem.precondition) {
                    checkItemCondition(currentItem, currentItem.precondition);
                }
            }
        }
        else { //entirely new item name, entirely new location
            let item = `<a href="#" class="items" id="${currentItem.itemCode}">You found ×${currentItem.itemQty} ${currentItem.itemName}</a><br>`;
            itemContainer.innerHTML += item;
            if (currentItem.precondition) {
                checkItemCondition(currentItem, currentItem.precondition);
            }
        }
    }
    //add Event listener
    for (var i = 0; i < items.length; i++) {
        let currentItem = items[i];
        let itemHTML = itemContainer.querySelector(`#${currentItem.itemCode}`);
        let pickedUp = itemHTML.classList.contains(`picked`);
        let newLocation = itemHTML.classList.contains(`item-new-location`);
        //if item has class item-new-location, push new location and add to quantity
        let itemBlocked = itemHTML?.classList.contains("item-blocked");
        if (newLocation) {
            itemHTML.addEventListener("click", function () {
                getItem(currentItem, getCurrentParagraphID());
                let message = `[Added to Inventory] You picked up ${currentItem.itemName}`;
                itemHTML.innerHTML = message;
                itemHTML.style.color = "#6A6C6E";
                autoSave();
            }, { once: true });
        }
        else if (itemBlocked) {
            //do nothing :) 
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
