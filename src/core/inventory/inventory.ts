import { inventoryItem, Items } from "../model/item";
import { Paragraphs } from "../model/paragraph";
import { capitalise } from "../../tools/formatting";
import DOMPurify from 'DOMPurify';

export let inventory: Array<inventoryItem> = [];

function addToInventory(item: inventoryItem) {
    inventory.push(item);
}

/**
 * Transfer items form an array of items to the inventory one by one.
 * Use case: load inventory from save file && add a bulk of item from treasure chest to inventory
 * @param items Array of itemss
 */
export function loadBulkInventory(items: inventoryItem[]) {
    items.forEach(element => addToInventory(element));
}

export function getInventory() {
    return inventory;
}

export function clearInventory() {
    inventory.length = 0;
    return inventory;
}

export function getItem(item: Items, pName: Paragraphs["name"]) {
    const inInventory = inventory.find(element => element.item.itemCode == item.itemCode);
    if (!inInventory) {
        let newItem = new inventoryItem(item, pName)
        console.log(`${item.itemName} has been added to inventory`);
        addToInventory(newItem);
        console.log(inventory);
        appendItemHTML(item);
    }
    else if (inInventory && inInventory.item.itemQty == 0) {
        inInventory.item.itemQty += item.itemQty;
        console.log(`${item.itemName} is already in the inventory. Adding 1 to quantity.`);
        console.log(inventory);
        appendItemHTML(inInventory.item);
    }
    else {
        inInventory.item.itemQty += item.itemQty;
        //when itemQty = 0, remove it from view.
        if (inInventory.item.itemQty == 0) {
            removeItemHTML(inInventory.item.itemCode)
        }
        else {
            console.log(`${item.itemName} is already in the inventory. Adding 1 to quantity.`);
            console.log(inventory);
            //update item quantity on view
            let quantityDiv = document.querySelector(`#${item.itemCode}-quantity`);
            quantityDiv!.textContent = `Quantity: ${inInventory.item.itemQty}`;
            let pNameCheck = inInventory.pickedUpLocation.find(location => location == pName);
            console.log(pNameCheck, pName)
            if (!pNameCheck) {
                inInventory.pickedUpLocation.push(pName);
            }
        }
    }
}

/**Remove a certain number of item in inventory.
 * When it reaches 0, remove item from view, but still keep it in inventory array.
 */
export function deleteItem(item: Items, quantity: number) {
    let toBeDeleted = getInventory().find(element => element.item.itemName == item.itemName && element.item.itemCode == item.itemCode);
    toBeDeleted!.item.itemQty -= quantity;
    if (toBeDeleted!.item.itemQty == 0) {
        removeItemHTML(item.itemCode);
    }
}

/**
 * Remove item from view.
 */
export function removeItemHTML(itemCode: string) {
    let itemHTML = document.querySelector(`#pills-${itemCode}-tab`);
    let itemDescriptionHTML = document.querySelector(`#pills-${itemCode}`)
    itemHTML!.remove();
    itemDescriptionHTML!.remove();
}

/**
 * After picking up an item, the item's name and description will be viewable on Inventory's UI
 * @param item 
 */
export function appendItemHTML(item: Items) {
    let inventoryTab = document.querySelector("#inventory-tab")!; //(Bootstrap's tab pills)
    let inventoryTabContent = document.querySelector("#inventory-tabContent")!; //(Bootstrap's tab-pane)
    let tab: string = `<li class="nav-item" role="presentation">
        <a class="nav-link" 
        id="pills-${item.itemCode}-tab" 
        data-bs-toggle="pill" 
        href="#pills-${item.itemCode}" 
        role="tab" 
        aria-controls="pills-${item.itemCode}" aria-selected="false">${capitalise(item.itemName)}</a>
        </li>`;
    inventoryTab.innerHTML += DOMPurify.sanitize(tab);

    let tabContent: string = `<div class="tab-pane fade" 
    id="pills-${item.itemCode}" 
    role="tabpanel" 
    aria-labelledby="pills-${item.itemCode}-tab">
    ${item.description}
    <div id="${item.itemCode}-quantity">Quantity: ${item.itemQty}</div>
    </div>`
    inventoryTabContent.innerHTML += DOMPurify.sanitize(tabContent);
}
/**
 * Clear all item from Inventory interface
 */
export function clearInventoryHTML() {
    let inventoryTab = document.querySelector("#inventory-tab")!;
    let inventoryTabContent = document.querySelector("#inventory-tabContent")!;
    inventoryTab.textContent = '';
    inventoryTabContent.textContent = '';
}