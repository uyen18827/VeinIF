import { Stat, statStyle, statWithStyle } from "../model/Stat";
import DOMPurify from "DOMPurify";

//Place the initial value of your player's Stat here, if you want to.
export let playerStat: Array<statWithStyle> = [
    { statID: "relation_village", statName: "Village", value: 10, style: statStyle.show },
    { statID: "str", statName: "Strength", value: 0, style: statStyle.show },
    { statID: "int", statName: 'Intelligence', value: 0, style: statStyle.show }
]

//TODO: statName currently cannot have a space in it as it will break. Change reference key from statName to statID
//Current behaviour requires that statName matches with HTML element class and thus cannot contain space.

export function restoreDefaultStat() {
    let defaultPlayerStat: Array<statWithStyle> = [
        { statID: "relation_village", statName: "Village", value: 10, style: statStyle.show },
        { statID: "str", statName: "Strength", value: 0, style: statStyle.show },
        { statID: "int", statName: 'Intelligence', value: 0, style: statStyle.show }
    ];
    loadStat(defaultPlayerStat);
}

export function getStat() {
    return playerStat;
}

/**
 * Add new Stat to playerStat
 * @param statName 
 * @param value 
 */
export function addNewStat(statName: string, value: number, style: statStyle) {
    let newStat = new statWithStyle(statName, value, style);
    getStat().push(newStat);
}

/** Add or subtract point from a stat 
 * Note that the stat must exist before trying to modify it.
*/
export function modifyStatValue(stat: Stat, value: number) {
    let _stat = getStat().find(element => element.statName == stat.statName);
    _stat!.value += value;
}

/** Load Stats from an Array */
export function loadStat(stat: statWithStyle[]) {
    stat.forEach(element => addNewStat(element.statName, element.value, element.style));
}

export function clearAllStat() {
    getStat().length = 0;
    return playerStat;
}

export function deleteStat(statName: Stat["statName"]) {
    getStat().find(element => element.statName == statName);
}

//if stat already exist, add modify value, if not in playerStat, add to it.
export function handleStats(stat: statWithStyle) {
    let found = playerStat.find(element => element.statName == stat.statName);
    if (found) {
        console.log(`it is found`)
        modifyStatValue(found, stat.value);
        switch (stat.style) {
            case (stat.style = statStyle.hide):
                // do nothing :)
                break;
            default:
                updateStatHTML(found);
                break;
        }
        console.log(`Handled! modified ${found.value}`);
    }
    if (!found) {
        addNewStat(stat.statName, stat.value, stat.style);
        switch (stat.style) {
            case (stat.style = statStyle.hide):
                // do nothing :)
                break;
            default:
                appendStatHTML(stat);
                break;
        }
        console.log(`not found, so added new stat`)
    }
}

export function appendStatHTML(stat: Stat) {
    let statContainer = document.querySelectorAll(`.stat`);
    statContainer!.forEach(element => {
        element.innerHTML += DOMPurify.sanitize(`<div id='stat-${stat.statName}'>${stat.statName}: ${stat.value}</div>`);
    });
    // statContainer!.innerHTML += `<div id='stat-${stat.statName}'>${stat.statName}: ${stat.value}</div>`;
}

export function clearStatHTML() {
    let statContainer = document.querySelector(`.stat`)!;
    statContainer.textContent = ``;
}

/** Show all Stat on the UI.
 * Use case: run when load game.
 */
export function showAllStatHTML(stat: statWithStyle[]) {
    stat.forEach(element => {
        switch (element.style) {
            case (element.style = statStyle.show):
                appendStatHTML(element);
                break;
            default:
                break;
        }
    });
}

export function updateStatHTML(stat: Stat) {
    let statHTML = document.querySelector(`#stat-${stat.statName}`);
    statHTML!.innerHTML = DOMPurify.sanitize(`<div id='stat-${stat.statName}'>${stat.statName}: ${stat.value}</div>`);
}
//TODO: updateStatHTML: separate statName, stat value into two different HTML elements, preferably a table