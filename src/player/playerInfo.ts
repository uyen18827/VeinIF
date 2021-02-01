import { Player } from "../model/player.js";
import { showPronouns } from "./pronouns.js";

export const player: Player = {
    id: 0,
    playerName: "",
    pronouns: {
        Category: "",
        subjectPro: "", //subject pronoun
        objectPro: "", //object pronoun
        possAdj: "", //possessive adjective
        possessivePro: "", //possessive pronoun
        reflex: "", //reflexive pronoun
        is: "", //he's, she's, they're
    },
}
export function getPlayer() {
    return player;
}

export function setPlayer(newPlayer: Player) {
    player.id = newPlayer.id;
    player.playerName = newPlayer.playerName;
    player.pronouns = newPlayer.pronouns;
}

export function setName(inputName: string) {
    player.playerName = inputName;
}

export function getName() {
    var playerName = (document.getElementById("playerName") as HTMLInputElement).value;
    console.log(`Player Name is: ${playerName}`);
    setName(playerName);
    showNameDiv(playerName);
    console.log(player);
}

/**
 * Show player's name in a any element where class = "yourName"
 * @param playerName 
 */
export function showNameDiv(playerName: string){
    const container = document.querySelectorAll(".yourName");
    if (container) {
        container.forEach(element => {
            element.innerHTML = `Name: ${playerName} `;
        });
    }
}

/**Reset player information to initial value. */
export function resetPlayer() {
    let defaultPlayer: Player = {
        id: 0,
        playerName: "",
        pronouns: {
            Category: "",
            subjectPro: "", //subject pronoun
            objectPro: "", //object pronoun
            possAdj: "", //possessive adjective
            possessivePro: "", //possessive pronoun
            reflex: "", //reflexive pronoun
            is: "", //he's, she's, they're
        },
    }
    setPlayer(defaultPlayer);
    showNameDiv(defaultPlayer.playerName);
    showPronouns(defaultPlayer.pronouns);
}