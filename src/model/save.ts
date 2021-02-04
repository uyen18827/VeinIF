import { inventoryItem } from "./item";
import { Paragraphs } from "./paragraph";
import { Player } from "./player";

export class Save {
    player: Player;
    inventory: Array<inventoryItem>
    currentParagraphId: Paragraphs["id"];

    constructor(p: Player, i: Array<inventoryItem>, pid: Paragraphs["id"]) {
        this.player = p;
        this.inventory = i;
        this.currentParagraphId = pid;
    }
}

// let save1 = new Save(getPlayer(), inventory, getParagraph.id)
// new save -> stringify save -> push into local storage
// get from local storage -> json parse -> put data back