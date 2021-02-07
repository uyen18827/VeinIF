import { Stat } from "../model/Stat.js";
//Place the initial value of your player's Stat here, if you want to.
const playerStat = [
// { statName: "Intellect", value: 10 },
// { statName: "Endurance", value: 4 }
];
export function getStat() {
    return playerStat;
}
/**
 * Add new Stat to playerStat
 * @param statName
 * @param value
 */
export function addNewStat(statName, value) {
    let newStat = new Stat(statName, value);
    getStat().push(newStat);
}
/** Add or subtract point from a stat
 * Note that the stat must exist before trying to modify it.
*/
export function modifyStatValue(stat, value) {
    let _stat = getStat().find(element => element.statName = stat.statName);
    _stat.value += value;
}
export function loadStat(stat) {
    stat.forEach(element => {
        addNewStat(element.statName, element.value);
    });
}
export function clearAllStat() {
    getStat().length = 0;
}
export function deleteStat(statName) {
    getStat().find(element => element.statName == statName);
}
//if stat already exist, add modify value, if not in playerStat, add to it.
export function handleStats(stat) {
    let found = getStat().find(element => element.statName = stat.statName);
    if (found) {
        modifyStatValue(found, stat.value);
        updateStatHTML(found);
        console.log(`Handled! modified`);
    }
    if (!found) {
        addNewStat(stat.statName, stat.value);
        appendStatHTML(stat);
        console.log(`added new stat - Handled!`);
    }
}
export function appendStatHTML(stat) {
    let statContainer = document.querySelector(`.stat`);
    statContainer.innerHTML += `<div id='stat-${stat.statName}'>${stat.statName}: ${stat.value}</div>`;
}
export function clearStatHTML() {
    let statContainer = document.querySelector(`.stat`);
    statContainer.textContent = ``;
}
/** Show all Stat on the UI.
 * Use case: run when load game.
 */
export function showAllStatHTML(stat) {
    stat.forEach(element => {
        appendStatHTML(element);
    });
}
export function updateStatHTML(stat) {
    let statHTML = document.querySelector(`#stat-${stat.statName}`);
    statHTML.innerHTML = `<div id='stat-${stat.statName}'>${stat.statName}: ${stat.value}</div>`;
}
//TODO: updateStatHTML: separate statName, stat value into two different HTML elements, preferably a table
