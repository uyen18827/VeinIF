
//stat can be used in precondition
export class Stat {
    statName: string;
    statID: string;
    value: number;
    constructor(s: string, v: number, sid: string,  ) {
        this.statName = s;
        this.statID = sid;
        this.value = v;
    }
}
//TODO: statid

export enum statStyle {
    hide,
    show
}

/**
 * Extends Stat, but has style.
 * Style property show or hide the Stat from view.
 */
export class statWithStyle extends Stat {
    style: statStyle;
    constructor(s: string, v: number, style: statStyle, sid: string) {
        super(s, v, sid);
        this.style = style;
    }
}

//stat style: hidden, default: show.
//hidden stat use case: stat and value that author does not want to show player
//like a variable that dictate which ending the player will receive (bad/good ending counter)