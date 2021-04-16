import { Items, requiredItem } from "./item";
import { Stat, statWithStyle } from "./Stat";

export interface Paragraphs {
    /**A paragraph's unique identifier. There shouldn't be two paragraph with the same name. */
    name: string;
    /**The main body of the paragraph. This element should contain your story/writing. */
    content: string;
    /**Array of choices that will lead player to another paragraph. */
    choices?: Array<Choices>
    preId?: number;
    /**Array contains items that can be picked up during this scene. Optional.*/
    item?: Array<Items>;
}

export interface Choices {
    id: number;
    content: string;
    // nextid: number;
    precondition?: Precondition;
    style?: string; //next paragraph's appearance's style
    consequence?: Consequence;
    nextName: string;
}

/**
 * Items or Stat that will be added after a choice is clicked.
 */
export interface Consequence{
    stat?: Array<statWithStyle>, //add or subtract from stat
    item?: Array<Items>, //use or add item
}

/**
 * Conditions on which must be passed for a choice to be clickable
 */
export interface Precondition {
    stat?: Array<Stat>,
    item?: Array<requiredItem>,
    style?: conStyle; //this override the global setting 
};

export enum conStyle {
    show = 0, //show both the choice and the condition (met/not met)
    hidden = 1, //hide the entire choice if the condition is not met
    hideReason = 2, //hide the reason
};
//TODO: implement show/hide/hideReason on Precondition. 
//Currently, precondition shows reason why a choice cannot be clicked by default 

// const precondition: Precondition = {
//     stat: [{
//         statName: "intellect",
//         value: 1
//     }],
//     item: [{
//         itemName: "key",
//         itemQty: 1,
//         itemCode: "key"
//     }]
// }

export class singleParagraph {
    paragraph: Paragraphs;
    constructor(p: Paragraphs) {
        this.paragraph = p;
    }
}