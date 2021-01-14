export class Save {
    constructor(p, i, pid) {
        this.player = p;
        this.inventory = i;
        this.currentParagraphId = pid;
    }
}
// let save1 = new Save(getPlayer(), inventory, getParagraph.id)
// new save -> stringify save -> push into local storage
// get from local storage -> json parse -> put data back
