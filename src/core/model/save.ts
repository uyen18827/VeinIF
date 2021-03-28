import { inventoryItem } from "./item";
import { Paragraphs } from "./paragraph";
import { Player } from "./player";
import { Stat } from "./Stat";

export class Save {
    player: Player;
    inventory: Array<inventoryItem>
    currentParagraphId: Paragraphs["id"];
    stat: Stat[];
    date: string;
    constructor(p: Player, i: Array<inventoryItem>, pid: Paragraphs["id"], s: Array<Stat>) {
        this.player = p;
        this.inventory = i;
        this.currentParagraphId = pid;
        this.stat = s;
        this.date = new Date().toLocaleString();
    }
}

// let save1 = new Save(getPlayer(), inventory, getParagraph.id)
// new save -> stringify save -> push into local storage
// load: get from local storage or save string -> json parse -> put data back