import { Items, requiredItem } from "./item";
import { Stat, statWithStyle } from "./Stat";

/**
 * Contains description of the scene, its name, available choices and items.
 */
export interface Paragraphs {
    /**A paragraph's unique identifier. There shouldn't be two paragraph with the same name.
     * The first paragraph should be named "start"
     */
    name: string;
    /**The main body of the paragraph. This element should contain your story/writing. HTML tags can be used for formatting, except for the "script" tag. */
    content: string;
    /**Array of choices that will lead player to another paragraph. */
    choices?: Array<Choices>
    /**Array contains items that can be picked up during this scene. Optional.*/
    item?: Array<Items>;
}

export interface Choices {
    id: number;
    /**Describe the choice. */
    content: string;
    // nextid: number;
    /**Conditions that must be satisfied or the choice will be disabled */
    precondition?: Precondition;
    /**Style dictate how the next paragraph will appear. If = "append"
     * the previous paragraph won't be cleared, and the new one appears after it.
     */
    style?: string; //next paragraph's appearance's style
    /**The consequence of the player's action. Gain/loose items or stat. */
    consequence?: Consequence;
    /**Next Paragraph's name. */
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
//Currently, precondition checks on default will always show reason why a choice cannot be clicked by default

export class singleParagraph {
    paragraph: Paragraphs;
    constructor(p: Paragraphs) {
        this.paragraph = p;
    }
}