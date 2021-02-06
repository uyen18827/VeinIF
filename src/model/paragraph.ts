import { Items } from "./item";
import { Stat } from "./Stat";

export interface Paragraphs {
    id: number;
    name?: string;
    content: string;
    choices?: Array<Choices>
    preId?: number;
    //item picked up during this scene. Optional.
    item?: Array<Items>;
    //variable will be used 
    variable?: any;
}

export interface Choices {
    id: number;
    choiceCont: string,
    nextid: number;
    precondition?: Precondition;
    style?: string; //next paragraph's appearance's style
    consequence?: Consequence;
}

export interface Consequence{
    stat?: Array<Stat>, //add or subtract from stat
    item?: Array<Items>, //use or add item
}

export interface Precondition {
    stat?: Array<Stat>,
    item?: Array<Items>,
}
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