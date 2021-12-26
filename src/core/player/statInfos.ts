import { Stat, statStyle, statWithStyle } from "../model/Stat";
import DOMPurify from "DOMPurify";

//Place the initial value of your player's Stat here, if you want to.
export let playerStat: Array<statWithStyle> = [
    { statID: "relation_village", statName: "Relationship: Village", value: 10, style: statStyle.show },
    { statID: "str", statName: "Strength", value: 0, style: statStyle.show },
    { statID: "int", statName: 'Intelligence', value: 0, style: statStyle.show },
    // { statID: "hiddenStat", statName: "Hidden stat", value: 0, style: statStyle.hide }
]

//TODO: statName currently cannot have a space in it as it will break. Change reference key from statName to statID
//Current behaviour requires that statName matches with HTML element class and thus cannot contain space.

export function restoreDefaultStat() {
    let defaultPlayerStat: Array<statWithStyle> = [
        { statID: "relation_village", statName: "Relationship: Village", value: 10, style: statStyle.show },
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
export function addNewStat(statName: string, statID: string, value: number, style: statStyle) {
    let newStat = new statWithStyle(statName, value, style, statID);
    getStat().push(newStat);
}

/** Add or subtract point from player's statistic 
 * Note that the stat must exist before trying to modify it.
*/
export function modifyStatValue(stat: Stat, value: number) {
    let _stat = getStat().find(element => element.statID == stat.statID);
    _stat!.value += value;
}

/** Load Stats from an Array */
export function loadStat(stat: statWithStyle[]) {
    stat.forEach(element => addNewStat(element.statName, element.statID, element.value, element.style));
}

export function clearAllStat() {
    getStat().length = 0;
    return playerStat;
}

/**
 * TODO: finish this.
 * @param statID 
 */
export function deleteStat(statID: Stat["statID"]) {
    getStat().find(element => element.statID == statID);
}

/**
 * Receive stat, evaluate:
 * if stat already exist, modify value; if not in playerStat, add to it.
 * @param stat 
 */
export function handleStats(stat: statWithStyle) {
    let found = playerStat.find(element => element.statID == stat.statID);
    if (found) {
        console.log(`Found existing stat ${found.statName}. Proceed to modify`)
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
        addNewStat(stat.statName, stat.statID, stat.value, stat.style);
        switch (stat.style) {
            case (stat.style = statStyle.hide):
                // do nothing :)
                break;
            default:
                appendStatHTML(stat);
                break;
        }
        console.log(`${stat.statName} not found, so added as new stat`)
    }
}

export function appendStatHTML(stat: Stat) {
    let statContainer = document.querySelectorAll(`.stat`);
    statContainer!.forEach(element => {
        element.innerHTML += DOMPurify.sanitize(`<div id='${stat.statID}'>${stat.statName}: ${stat.value}</div>`);
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
    let statHTML = document.querySelector(`#${stat.statID}`);
    statHTML!.innerHTML = DOMPurify.sanitize(`<div id='${stat.statID}'>${stat.statName}: ${stat.value}</div>`);
}
//TODO: updateStatHTML: separate statName, stat value into two different HTML elements, preferably a table