export class Save {
    constructor(p, i, pname, s) {
        this.player = p;
        this.inventory = i;
        this.currentParagraphName = pname;
        this.stat = s;
        this.date = new Date().toLocaleString();
    }
}
// let save1 = new Save(getPlayer(), inventory, getParagraph.id)
// new save -> stringify save -> push into local storage
// load: get from local storage or save string -> json parse -> put data back