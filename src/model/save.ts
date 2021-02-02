import { Items, pickedUpItem } from "./item";
import { Paragraphs } from "./paragraph";
import { Player } from "./player";

export class Save {
    player: Player;
    inventory: Array<Items>
    currentParagraphId: Paragraphs["id"];
    pickedUpMap: pickedUpItem[];

    constructor(p: Player, i: Array<Items>, pid: Paragraphs["id"],picked: pickedUpItem[]) {
        this.player = p;
        this.inventory = i;
        this.currentParagraphId = pid;
        this.pickedUpMap = picked;
    }
}

// let save1 = new Save(getPlayer(), inventory, getParagraph.id)
// new save -> stringify save -> push into local storage
// get from local storage -> json parse -> put data back