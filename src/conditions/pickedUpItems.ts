import { Items, pickedUpItem } from "../model/item.js";
import { Paragraphs } from "../model/paragraph.js";
import { getCurrentParagraphID } from "../paragraphs/paragraphFunctions.js";

//if game author ever decide to have one path leads back to a paragraph 
//that user had visited and picked up items from.
//this array save information on items player had picked up and their location
// so that picked up item can be greyed out and prevented from being picked up again.
export let pickedUpMap: pickedUpItem[] = []

export function addToPickedUp(item: Items, pid: Paragraphs["id"]) {
    let picked = new pickedUpItem(item.itemName, item.itemCode, pid);
    pickedUpMap.push(picked);
    console.log(pickedUpMap)
}

export function loadToPickedUp(items: pickedUpItem[]) {
    items.forEach(element => {
        getPickedUpMap().push(element);
    });
}

export function getPickedUpMap() {
    return pickedUpMap;
}

export function checkPickedUp(item: Items, pid: Paragraphs["id"]) {
    let found = pickedUpMap.find(element => element.itemName == item.itemName && element.itemCode == item.itemCode && element.location == pid);
    if (found) {
        //append HTML that show the item has already been picked up. 
        let message = `[Added to Inventory] You picked up ${item.itemName}`;
        //No event listener will be added.
    }
    else {
        //append item HTML and add event listener
        //which enable the user to pick up the item
    }
}

// function performCheck(flag: string, items: Items[], itemContainer: any) {
//     switch (flag) {
//         case "item":
//             //check if it's found in pickedUpItems
//             break;
//         default:
//             showItems(items, itemContainer);
//             break;
//     }
// }