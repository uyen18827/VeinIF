
/** Interface for player's general information. */
export interface Player {
    id: number;
    playerName: string;
    pronouns: Pronouns;
}

/** Interface for player's pronouns */
export interface Pronouns {
    Category: string;
    subjectPro: string; //subject pronoun
    objectPro: string; //object pronoun
    possAdj: string; //possessive adjective
    possessivePro: string; //possessive pronoun
    reflex: string; //reflexive pronoun
    is: string; //he is, she is, they are
}

