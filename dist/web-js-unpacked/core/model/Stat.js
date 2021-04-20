//stat can be used in precondition
export class Stat {
    constructor(s, v) {
        this.statName = s;
        this.value = v;
    }
}
export var statStyle;
(function (statStyle) {
    statStyle[statStyle["hide"] = 0] = "hide";
    statStyle[statStyle["show"] = 1] = "show";
})(statStyle || (statStyle = {}));
/**
 * Extends Stat, but has style.
 * Style property show or hide the Stat from view.
 */
export class statWithStyle extends Stat {
    constructor(s, v, style) {
        super(s, v);
        this.style = style;
    }
}
//stat style: hidden, default: show.
//hidden stat use case: stat and value that author does not want to show player
//like a variable that dictate which ending the player will receive (bad/good ending counter)
