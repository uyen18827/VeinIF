import { inventoryItem } from "../model/item.js";
import { capitalise } from "../tools/formatting.js";
export let inventory = [];
function addToInventory(item) {
    inventory.push(item);
}
/**
 * Transfer items form an array of items to the inventory one by one.
 * Use case: load inventory from save file && add a bulk of item from treasure chest to inventory
 * @param items Array of items
 */
export function loadBulkInventory(items) {
    items.forEach(element => addToInventory(element));
}
export function getInventory() {
    return inventory;
}
export function clearInventory() {
    inventory.length = 0;
    return inventory;
}
export function getItem(item, pid) {
    const inInventory = inventory.find(element => element.item.itemCode == item.itemCode);
    if (!inInventory) {
        let newItem = new inventoryItem(item, pid);
        console.log(`${item.itemName} has been added to inventory`);
        addToInventory(newItem);
        console.log(inventory);
        appendItemHTML(item);
    }
    else {
        inInventory.item.itemQty += item.itemQty;
        console.log(`${item.itemName} is already in the inventory. Adding 1 to quantity.`);
        console.log(inventory);
        //update item quantity on view
        let quantityDiv = document.querySelector(`#${item.itemCode}-quantity`);
        quantityDiv.textContent = `Quantity: ${inInventory.item.itemQty}`;
        let pidCheck = inInventory.pickedUpLocation.find(location => location == pid);
        console.log(pidCheck, pid);
        if (!pidCheck) {
            inInventory.pickedUpLocation.push(pid);
        }
    }
}
/**
 * After picking up an item, the item's name and description will be viewable on Inventory's UI
 * @param item
 */
export function appendItemHTML(item) {
    let inventoryTab = document.querySelector("#inventory-tab"); //(Bootstrap's tab pills)
    let inventoryTabContent = document.querySelector("#inventory-tabContent"); //(Bootstrap's tab-pane)
    let tab = `<li class="nav-item" role="presentation">
        <a class="nav-link" 
        id="pills-${item.itemCode}-tab" 
        data-bs-toggle="pill" 
        href="#pills-${item.itemCode}" 
        role="tab" 
        aria-controls="pills-${item.itemCode}" aria-selected="false">${capitalise(item.itemName)}</a>
        </li>`;
    inventoryTab.innerHTML += tab;
    let tabContent = `<div class="tab-pane fade" 
    id="pills-${item.itemCode}" 
    role="tabpanel" 
    aria-labelledby="pills-${item.itemCode}-tab">
    ${item.description}
    <div id="${item.itemCode}-quantity">Quantity: ${item.itemQty}</div>
    </div>`;
    inventoryTabContent.innerHTML += tabContent;
}
export function clearInventoryHTML() {
    let inventoryTab = document.querySelector("#inventory-tab");
    let inventoryTabContent = document.querySelector("#inventory-tabContent");
    inventoryTab.textContent = '';
    inventoryTabContent.textContent = '';
}
