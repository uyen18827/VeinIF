import { capitalise } from "../tools/formatting.js";
import { statStyle } from "../model/Stat.js";
export function getParagraph(player) {
    let paragraphs = [
        //Array starts at 0
        {
            id: 0,
            name: "start",
            content: `This is the first paragraph. <u><b>Welcome to a game!<\/b><\/u> This game is a multi choice Interactive fiction. Different choices will lead to different outcomes. Rejoice! Enjoy your time playing here!`,
            choices: [
                { id: 1, content: "Alright then, lead me to the next paragraph", nextid: 1 },
            ],
        },
        {
            id: 1,
            name: "wood",
            content: `You are walking into the woods and there's no one around. Or so you thought. Your senses tells you that there's something out there, but your conscious mind tries to convince otherwise. After all, there's no reason for anyone to be out at this hour. <br>Or is it?<br>
        No time for pleasantries, but at the very least, could you tell us a bit about yourself?<br>
        <input id="playerName" type="text" placeholder="Enter your name here!" aria-label="playerName" value="${player?.playerName}">
        <div id="pronouns">And your pronouns? <br></div>
        `,
            choices: [
                { id: 1, content: "Ooooh! Next!!!!!", nextid: 2 },
                { id: 2, content: `I'm scared. Let's go back to the first one!`, nextid: 0 }
            ],
            item: [
                {
                    itemName: 'sword',
                    itemQty: 1,
                    description: "An old, rusty sword you found on the ground.",
                    itemCode: "sword",
                },
                {
                    itemName: 'great sword',
                    itemQty: 1,
                    description: "An old, rusty great sword you found on the ground.",
                    itemCode: "great_sword",
                },
                {
                    itemName: 'very small sword',
                    itemQty: 1,
                    description: "A small small sword",
                    itemCode: "smol_sword",
                    precondition: {
                        stat: [{ statName: 'Meow', value: 1 }],
                    }
                },
            ],
            preId: 0,
        },
        {
            id: 2,
            name: "greeting",
            content: `This is the third paragraph. A guy whoops in and said: "This is ${player?.playerName}! ${capitalise(player?.pronouns.is)} finally here!" Oh well, this is the end. Bye ${player?.playerName}!`,
            choices: [
                { id: 1, content: "Last one!", nextid: 3 },
            ],
            item: [
                { itemName: 'flowers', itemQty: 3, description: `Some nice, wild flowers`, itemCode: `wild_flowers` }
            ],
            preId: 1,
        },
        {
            id: 3,
            name: "key on ground",
            content: `You found a key lying on the ground. Along with some flowers<br> Just a heads-up. The next paragraph uses update style "append".<br>`,
            choices: [
                {
                    id: 1, content: "Move along", nextid: 4, style: "append",
                }
            ],
            item: [
                { itemName: 'key', itemQty: 1, description: "A small key. You wonder what it's for.", itemCode: "key1", },
                { itemName: 'flowers', itemQty: 3, description: `Some nice, wild flowers`, itemCode: `wild_flowers` }
            ],
            preId: 2
        },
        {
            id: 4,
            name: "surprise",
            content: `There's a bear behind you! AAAAAAAAAAAAAAAAAAAAA<br>
        You run to the space-time door, which will lead you back to the beginning of the game. There's a key hole on the door. You must carry 6 flowers to get through the door.`,
            choices: [
                {
                    id: 1,
                    content: "[Use Key] [Hold the flowers] Let's go back from the beginning", nextid: 0,
                    precondition: {
                        item: [
                            { itemName: "key", description: "A small key. You wonder what it's for.", itemQty: 1, itemCode: "key1", },
                            { itemName: 'flowers', itemQty: 6, description: `Some nice, wild flowers`, itemCode: `wild_flowers` }
                        ],
                    },
                    consequence: {
                        item: [{ itemName: "key", description: "A small key. You wonder what it's for.", itemQty: -1, itemCode: "key1", }],
                        stat: [
                            { statName: 'Meow', value: 1, style: statStyle.show },
                            { statName: `hiddenValue`, value: 1, style: statStyle.hide }
                        ],
                    },
                },
                {
                    id: 2,
                    content: "Or go on? Have this little treat if you plan to go on. (1x key, 1x candied nut)",
                    nextid: 5,
                    consequence: {
                        item: [
                            { itemName: "key", description: "A small key. You wonder what it's for.", itemQty: 1, itemCode: "key1", },
                            { itemName: "candied nut", description: "A sweet, sweet treat", itemQty: 1, itemCode: "nut1", },
                        ],
                    },
                },
            ],
            preId: 3
        },
        {
            id: 5,
            name: "oh? you're still here?",
            content: ``,
            choices: [
                {
                    id: 1, content: "This is truly the end. There's nothing else. Let's just go back", nextid: 0, consequence: {
                        stat: [{ statName: 'Growl', value: 1, style: statStyle.show }],
                    }
                },
                { id: 2, content: "Trust me on this one my friend.", nextid: 0 },
                {
                    id: 3, content: "Jump over the ledge?", nextid: 6,
                    precondition: {
                        item: [
                            { itemName: "key", description: "A small key. You wonder what it's for.", itemQty: 1, itemCode: "key1", },
                        ],
                        stat: [
                            { statName: `Athletic`, value: 10 },
                        ],
                    },
                },
            ],
        },
        {
            id: 6,
            content: `You leaped across the ledge! And landed successfully`,
            choices: [
                { id: 1, content: `Weeee!`, nextid: 0 },
            ],
        },
    ];
    return paragraphs;
}
