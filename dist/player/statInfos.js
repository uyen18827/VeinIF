import { Stat } from "../model/Stat.js";
//Place the initial value of your player's Stat here.
const playerStat = [
    { statName: "Intellect", value: 10 },
    { statName: "Endurance", value: 4 }
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
