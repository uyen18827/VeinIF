export class Save {
    constructor(p, i, pid, s) {
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
