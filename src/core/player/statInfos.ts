import { Stat, statStyle, statWithStyle } from "../model/Stat.js";

//Place the initial value of your player's Stat here, if you want to.
export let playerStat: Array<statWithStyle> = [
    { statName: "Intellect", value: 10, style: statStyle.show },
    { statName: "Endurance", value: 4, style: statStyle.show },
    { statName: 'Athletic', value: 0, style: statStyle.show }
]

export function restoreDefaultStat() {
    let defaultPlayerStat: Array<statWithStyle> = [
        { statName: "Intellect", value: 10, style: statStyle.show },
        { statName: "Endurance", value: 4, style: statStyle.show },
        { statName: 'Athletic', value: 0, style: statStyle.show }
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
        element.innerHTML += `<div id='stat-${stat.statName}'>${stat.statName}: ${stat.value}</div>`;
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
    statHTML!.innerHTML = `<div id='stat-${stat.statName}'>${stat.statName}: ${stat.value}</div>`;
}
//TODO: updateStatHTML: separate statName, stat value into two different HTML elements, preferably a table