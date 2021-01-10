import { Items } from "../model/item";

export let inventory: Array<Items> = [];

function addToInventory(item: Items){
    inventory.push(item);
}

export function getInventory() {
    return inventory;
}

export function clearInventory(){
    inventory.length = 0;
    return inventory;
}

function scourAdd(item: Items){
    
}

export function getItem(item: Items){
    const inInventory = inventory.find(element => element.itemName == item.itemName && element.description == item.description ); 
    if (!inInventory){
        console.log(`${item.itemName} has been added to inventory`);
        addToInventory(item);
        console.log(inventory);
    }
    else { 
        inInventory.itemQty +=1;
        console.log(`${item.itemName} is already in the inventory. Adding 1 to quantity.`);
        console.log(inventory);
    }
}