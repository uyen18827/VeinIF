
/** Interface for player's general information. */
export interface Player {
    id: number;
    playerName: string;
    pronouns: Pronouns;
}

/** Interface for player's pronouns */
export interface Pronouns {
    /** Pronouns Category */
    Category: string;
    /** Subject Pronouns: he, she, they */
    subjectPro: string;
    /** Object Pronouns: him, her, them */
    objectPro: string;
    /** Possessive Adjective: his, her, their */
    possAdj: string;
    /** Possessive Pronoun: his, hers, theirs */
    possessivePro: string;
    /** Reflexive Pronouns: himself, herself, themselves */
    reflex: string;
    /** he is, she is, they are */
    is: string;
}

