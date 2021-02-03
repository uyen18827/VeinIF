import { Items } from "../model/item";
import { capitalise } from "../tools/formatting.js";

export let inventory: Array<Items> = [];

function addToInventory(item: Items) {
    inventory.push(item);
}

/**
 * Transfer items form an array of items to the inventory one by one.
 * Use case: load inventory from save file && add a bulk of item from treasure chest to inventory
 * @param items Array of items
 */
export function loadBulkInventory(items: Items[]) {
    items.forEach(element => addToInventory(element));
}

export function getInventory() {
    return inventory;
}

export function clearInventory() {
    inventory.length = 0;
    return inventory;
}

export function getItem(item: Items) {
    const inInventory = inventory.find(element => element.itemCode == item.itemCode);
    if (!inInventory) {
        console.log(`${item.itemName} has been added to inventory`);
        addToInventory(item);
        console.log(inventory);
        appendItemHTML(item);
    }
    else {
        inInventory.itemQty += item.itemQty;
        console.log(`${item.itemName} is already in the inventory. Adding 1 to quantity.`);
        console.log(inventory);
        //update item quantity on view
        let quantityDiv = document.querySelector(`#${item.itemCode}-quantity`);
        quantityDiv!.textContent = `Quantity: ${inInventory.itemQty}`;
    }
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
    inventoryTab.innerHTML += tab;

    let tabContent: string = `<div class="tab-pane fade" 
    id="pills-${item.itemCode}" 
    role="tabpanel" 
    aria-labelledby="pills-${item.itemCode}-tab">
    ${item.description}
    <div id="${item.itemCode}-quantity">Quantity: ${item.itemQty}</div>
    </div>`
    inventoryTabContent.innerHTML += tabContent;
}

export function clearInventoryHTML() {
    let inventoryTab = document.querySelector("#inventory-tab")!;
    let inventoryTabContent = document.querySelector("#inventory-tabContent")!;
    inventoryTab.textContent = '';
    inventoryTabContent.textContent = '';
}

//TODO: Shows item quantity on screen.