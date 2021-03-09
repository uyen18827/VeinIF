;
export var conStyle;
(function (conStyle) {
    conStyle[conStyle["show"] = 0] = "show";
    conStyle[conStyle["hidden"] = 1] = "hidden";
    conStyle[conStyle["hideReason"] = 2] = "hideReason";
})(conStyle || (conStyle = {}));
;
//TODO: implement show/hide/hideReason on Precondition. 
//Currently, precondition shows reason why a choice cannot be clicked by default 
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
    constructor(p) {
        this.paragraph = p;
    }
}
