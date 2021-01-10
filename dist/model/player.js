import { inventory } from "../inventory/inventory";
const stat = [
    { statName: "intellect", value: 10 },
    { statName: "endurance", value: 4 }
];
function checkCondition(condition) {
    if (condition.itemName) {
        checkInInventory(condition.itemName, condition.itemQty);
    }
    if (condition.statName) {
        checkStat(condition.statName, condition.value);
    }
}
function checkStat(statName, value) {
    var found = stat.find(element => element.statName = statName);
    if (found) {
        if (found.value < value) {
            console.log("Condition not met!");
        }
        if (found.value >= value) {
            console.log("Condition met. Proceed.");
        }
    }
}
;
function checkInInventory(itemName, itemQty) {
    const inInventory = inventory.find(element => element.itemName == itemName);
    if (!inInventory) {
        console.log(`${itemName} cannot be found in inventory`);
        console.log(inventory);
    }
}
