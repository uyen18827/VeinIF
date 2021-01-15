import { Items } from "./item";
import { Stat } from "./player";

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
    choiceCont: string,
    nextid: number;
    precondition?: Precondition;
    style?: string;
}

export interface Precondition {
    stat?: Stat,
    item?: Items,
}
const precondition: Precondition = {
    stat: {
        statName: "intellect",
        value: 1
    },
    item: {
        itemName: "key",
        itemQty: 1,
        itemCode: "key"
    }
}