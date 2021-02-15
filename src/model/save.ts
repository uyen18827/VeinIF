import { inventoryItem } from "./item";
import { Paragraphs } from "./paragraph";
import { Player } from "./player";
import { Stat } from "./Stat";

export class Save {
    player: Player;
    inventory: Array<inventoryItem>
    currentParagraphId: Paragraphs["id"];
    stat: Stat[];

    constructor(p: Player, i: Array<inventoryItem>, pid: Paragraphs["id"], s: Array<Stat>) {
        this.player = p;
        this.inventory = i;
        this.currentParagraphId = pid;
        this.stat = s;
    }
}

// let save1 = new Save(getPlayer(), inventory, getParagraph.id)
// new save -> stringify save -> push into local storage
// get from local storage -> json parse -> put data back