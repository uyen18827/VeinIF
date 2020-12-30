import { Items } from "../model/item";

let inventory: Array<Items> = [];

function addToInventory(item: Items){
    inventory.push(item);
}

function getItems() {
    return inventory;
}

function clearInventory(){
    inventory.length = 0;
    return inventory;
}

function scourAdd(item: Items){
    
}