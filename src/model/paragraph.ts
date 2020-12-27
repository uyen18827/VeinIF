export interface Paragraphs {
    id: number;
    name?: string;
    content?: string;
    choices?: Array<Choices>
    preId?: number;
    //item picked up during this scene. Optional.
    item?: Array<Items>;
    //variable will be used 
    variable?: any;
}
export interface Items {
    itemName: string,
    description: string;
    itemImg?: string,
    itemQty: number,
}

export interface Choices {
    choiceCont: string, nextid: number; precondition?: string; style?: string;
}

