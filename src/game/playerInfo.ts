import { Player } from "../core/model/player";

/**
 * Player's info values. During initial start of the game, these value is used.
 * Will be overwritten by player's input during game play.
 */
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
        is: "", //he is, she is, they are
    },
}

/**
 * Upon clicking restart, player character will use these default values.
 */
export let defaultPlayer: Player = {
    id: 0,
    playerName: "",
    pronouns: {
        Category: "",
        subjectPro: "", //subject pronoun
        objectPro: "", //object pronoun
        possAdj: "", //possessive adjective
        possessivePro: "", //possessive pronoun
        reflex: "", //reflexive pronoun
        is: "", //he is, she is, they are
    },
}