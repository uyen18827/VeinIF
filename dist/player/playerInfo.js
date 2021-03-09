import { showPronouns } from "./pronouns.js";
export const player = {
    id: 0,
    playerName: "",
    pronouns: {
        Category: "",
        subjectPro: "",
        objectPro: "",
        possAdj: "",
        possessivePro: "",
        reflex: "",
        is: "",
    },
};
export function getPlayer() {
    return player;
}
export function setPlayer(newPlayer) {
    player.id = newPlayer.id;
    player.playerName = newPlayer.playerName;
    player.pronouns = newPlayer.pronouns;
}
export function setName(inputName) {
    player.playerName = inputName;
}
export function getName() {
    var playerName = document.getElementById("playerName").value;
    console.log(`Player Name is: ${playerName}`);
    setName(playerName);
    showNameDiv(playerName);
    console.log(player);
}
/**
 * Show player's name in a any element where class = "yourName"
 * @param playerName
 */
export function showNameDiv(playerName) {
    const container = document.querySelectorAll(".yourName");
    if (container) {
        container.forEach(element => {
            element.innerHTML = `${playerName} `;
        });
    }
}
/**Reset player information to initial value. */
export function resetPlayer() {
    let defaultPlayer = {
        id: 0,
        playerName: "",
        pronouns: {
            Category: "",
            subjectPro: "",
            objectPro: "",
            possAdj: "",
            possessivePro: "",
            reflex: "",
            is: "",
        },
    };
    setPlayer(defaultPlayer);
    showNameDiv(defaultPlayer.playerName);
    showPronouns(defaultPlayer.pronouns);
}
