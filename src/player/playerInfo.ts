import { Player } from "../model/player.js";

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
        is: "" //he's, she's, they're
    },
}
export function getPlayer(){
    return player;
}

export function setName(inputName: string) {
    player.playerName = inputName;
}

export function getName() {
    var playerName = (document.getElementById("playerName") as HTMLInputElement).value;
    console.log(`Player Name is: ${playerName}`);
    const container: HTMLElement | any = document.getElementById("yourName");
    if (container) {
        container.innerHTML = null;
        let output: string = `Your name is: ${playerName} `;
        container.innerHTML += output;
    }
    setName(playerName);
    console.log(player)
}