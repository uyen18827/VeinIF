import { Stat } from "../model/Stat.js";

//Place the initial value of your player's Stat here, if you want to.
export let playerStat: Array<Stat> = [
    { statName: "Intellect", value: 10 },
    { statName: "Endurance", value: 4 },
    { statName: 'Athletic', value: 0 }
]

export function restoreDefaultStat() {
    let defaultPlayerStat: Array<Stat> = [
        { statName: "Intellect", value: 10 },
        { statName: "Endurance", value: 4 },
        { statName: 'Athletic', value: 0 }
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
export function addNewStat(statName: string, value: number) {
    let newStat = new Stat(statName, value);
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
export function loadStat(stat: Stat[]) {
    stat.forEach(element => addNewStat(element.statName, element.value));
}

export function clearAllStat() {
    getStat().length = 0;
    return playerStat;
}

export function deleteStat(statName: Stat["statName"]) {
    getStat().find(element => element.statName == statName);
}

//if stat already exist, add modify value, if not in playerStat, add to it.
export function handleStats(stat: Stat) {
    let found = playerStat.find(element => element.statName == stat.statName);
    if (found) {
        console.log(`it is found`)
        modifyStatValue(found, stat.value);
        updateStatHTML(found);
        console.log(`Handled! modified ${found.value}`);
    }
    if (!found) {
        addNewStat(stat.statName, stat.value);
        appendStatHTML(stat);
        console.log(`not found, so added new stat`)
    }
}

export function appendStatHTML(stat: Stat) {
    let statContainer = document.querySelector(`.stat`);
    statContainer!.innerHTML += `<div id='stat-${stat.statName}'>${stat.statName}: ${stat.value}</div>`;
}

export function clearStatHTML() {
    let statContainer = document.querySelector(`.stat`)!;
    statContainer.textContent = ``;
}

/** Show all Stat on the UI.
 * Use case: run when load game.
 */
export function showAllStatHTML(stat: Stat[]) {
    stat.forEach(element => {
        appendStatHTML(element);
    });
}

export function updateStatHTML(stat: Stat) {
    let statHTML = document.querySelector(`#stat-${stat.statName}`);
    statHTML!.innerHTML = `<div id='stat-${stat.statName}'>${stat.statName}: ${stat.value}</div>`;
}
//TODO: updateStatHTML: separate statName, stat value into two different HTML elements, preferably a table