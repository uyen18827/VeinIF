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
        is: "" //he's, she's, they're
    },
};
export function setName(inputName) {
    player.playerName = inputName;
}
export function getName() {
    var playerName = document.getElementById("playerName").value;
    console.log(`Player Name is: ${playerName}`);
    const container = document.getElementById("yourName");
    if (container) {
        container.innerHTML = null;
        let output = `Your name is: ${playerName} `;
        container.innerHTML += output;
    }
    setName(playerName);
    console.log(player);
}
