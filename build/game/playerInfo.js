/**
 * Player's info values. During initial start of the game, these value is used.
 * Will be overwritten by player's input during game play.
 */
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
        is: "", //he is, she is, they are
    },
};
/**
 * Upon clicking restart, player character will use these default values.
 */
export let defaultPlayer = {
    id: 0,
    playerName: "",
    pronouns: {
        Category: "",
        subjectPro: "",
        objectPro: "",
        possAdj: "",
        possessivePro: "",
        reflex: "",
        is: "", //he is, she is, they are
    },
};
