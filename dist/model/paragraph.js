;
var type;
(function (type) {
    type[type["show"] = 0] = "show";
    type[type["hidden"] = 1] = "hidden";
    type[type["hideReason"] = 2] = "hideReason";
})(type || (type = {}));
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
