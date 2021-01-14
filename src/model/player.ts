import { inventory } from "../inventory/inventory";

/** Interface for player's general information. */
export interface Player {
    id: number;
    playerName: string;
    pronouns: Pronouns;
}

/** Interface for player's pronouns */
export interface Pronouns {
    Category: string;
    subjectPro: string; //subject pronoun
    objectPro: string; //object pronoun
    possAdj: string; //possessive adjective
    possessivePro: string; //possessive pronoun
    reflex: string; //reflexive pronoun
    is: string; //he's, she's, they're
}

export interface Stat {
    statName: string,
    value: number
}

const stat: Stat[] = [
    { statName: "Intellect", value: 10 },
    { statName: "Endurance", value: 4 }
]

function checkCondition(condition: any) {
    if(condition.itemName){
        checkInInventory(condition.itemName, condition.itemQty)
    }
    if(condition.statName){
        checkStat(condition.statName, condition.value)
    }
}
function checkStat(statName: string, value: number){
    var found = stat.find(element => element.statName = statName);
    if (found) {
        if (found.value < value) {
            console.log("Condition not met!");
        }
        if (found.value >= value) {
            console.log("Condition met. Proceed.");
        }
    }
};
function checkInInventory(itemName: string, itemQty: number){
    const inInventory = inventory.find(element => element.itemName == itemName);
    if (!inInventory){
        console.log(`${itemName} cannot be found in inventory`);
        console.log(inventory);
    }

}