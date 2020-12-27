import { capitalise } from "../tools/formatting.js";
export function getParagraph(player) {
    const paragraphs = [
        //Array starts at 0
        {
            id: 0,
            name: "p1",
            content: `This is the first paragraph. <u><b>Welcome to a game!<\/b><\/u> This game is a multi choice Interactive fiction. Different choices will lead to different outcomes. Rejoice! Enjoy your time playing here!`,
            choices: [
                { choiceCont: "Alright then, lead me to the next paragraph", nextid: 1 },
            ],
        },
        {
            id: 1,
            name: "p2",
            content: `You are walking into the woods and there's no one around. Or so you thought. Your senses tells you that there's something out there, but your conscious mind tries to convince otherwise. After all, there's no reason for anyone to be out at this hour. <br>Or is it?<br>
        Tell us a bit about yourself: 
        `,
            choices: [
                { choiceCont: "Ooooh! Next!!!!!", nextid: 2 },
                { choiceCont: `I'm scared. Let's go back to the first one!`, nextid: 0 }
            ],
            item: [
                { itemName: 'sword', itemQty: 1, description: "An old, rusty sword you found on the ground." },
            ],
            variable: "valor:1",
            preId: 0
        },
        {
            id: 2,
            name: "p3",
            content: `This is the third paragraph. A guy whoops in and said: "This is ${player?.playerName}! ${capitalise(player?.pronouns.is)} finally here!" Oh well, this is the end. Bye ${player?.playerName}!`,
            choices: [
                { choiceCont: "Last one!", nextid: 3 }
            ],
            preId: 1,
        },
        {
            id: 3,
            name: "bruh",
            content: `You found a key lying on the ground.<br> Just a heads-up. The next paragraph uses update style "append".`,
            choices: [
                { choiceCont: "Move along", nextid: 4, style: "append" }
            ],
            item: [{ itemName: 'key', itemQty: 1, description: "A small key. You wonder what it's for." }],
            preId: 2
        },
        {
            id: 4,
            name: "bruh",
            content: `There's a bear behind you! AAAAAAAAAAAAAAAAAAAAA`,
            choices: [
                { choiceCont: "Let's go back from the beginning", nextid: 0, precondition: "key = 1" },
                { choiceCont: "Or go on?", nextid: 5 }
            ],
            preId: 3
        },
        {
            id: 5,
            name: "oh? you're still here?",
            content: ``,
            choices: [
                { choiceCont: "This is truly the end. There's nothing else. Let's just go back", nextid: 0 },
                { choiceCont: "Trust me on this one my friend.", nextid: 0 }
            ]
        }
    ];
    return paragraphs;
}
