import { capitalise, verbForm } from "../tools/formatting.js";
import { statStyle } from "../core/model/Stat.js";
export function getParagraph(player) {
    let paragraphs = [
        {
            name: "start",
            content: `This is the first paragraph. <u><b>Welcome to a game!<\/b><\/u> This game is a multi choice Interactive fiction. Different choices will lead to different outcomes. Rejoice! Enjoy your time playing here!`,
            choices: [
                { id: 1, content: "Alright then, lead me to the next paragraph", nextName: "wood" },
            ],
        },
        {
            // id: 1,
            name: "wood",
            content: `You are walking into the woods and there's no one around.
        Or so you thought. Your senses tells you that there's something out there, but your conscious mind tries to convince otherwise.
        After all, there's no reason for anyone to be out at this hour.
        <br>Or is it?<br>
        No time for pleasantries, but at the very least, could you tell us a bit about yourself?<br>
        <input id="playerName" type="text" placeholder="Enter your name here!" aria-label="playerName" value="${player?.playerName}">
        <div id="pronouns">And your pronouns? <br></div>
        `,
            choices: [
                { id: 1, content: "Ooooh! Next!!!!!", nextName: `greeting` },
                { id: 2, content: `I'm scared. Let's go back to the first one!`, nextName: `start` }
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
                        item: [{ itemName: "candied nut", itemQty: 1, itemCode: "nut1", }]
                    }
                },
            ],
            preId: 0,
        },
        {
            // id: 2,
            name: "greeting",
            content: `This is the third paragraph. A guy and his friend, Snail Guy waved at you and said: "This is ${player?.playerName}! ${capitalise(player?.pronouns.is)} finally here! ${capitalise(player?.pronouns.subjectPro) + " " + verbForm('was', 'were')} busy last time you were here, so I couldn't introduce ${player?.pronouns.subjectPro} to you. Oh well, this is the end. Bye ${player?.playerName}!"`,
            choices: [
                { id: 1, content: "Last one!", nextName: "key on ground" },
            ],
            item: [
                { itemName: 'flowers', itemQty: 3, description: `Some nice, wild flowers`, itemCode: `wild_flowers` }
            ],
            preId: 1,
        },
        {
            // id: 3,
            name: "key on ground",
            content: `You found a key lying on the ground. Along with some flowers<br> Just a heads-up. The next paragraph uses update style "append".<br>`,
            choices: [
                {
                    id: 1, content: "Move along", style: "append", nextName: "surprise"
                    // precondition: {
                    //   stat: [{ statName: 'Meow', value: 2 }],
                    // }
                }
            ],
            item: [
                { itemName: 'key', itemQty: 1, description: "A small key. You wonder what it's for.", itemCode: "key1", },
                { itemName: 'flowers', itemQty: 3, description: `Some nice, wild flowers`, itemCode: `wild_flowers` }
            ],
            preId: 2
        },
        {
            // id: 4,
            name: "surprise",
            content: `There's a bear behind you! AAAAAAAAAAAAAAAAAAAAA<br>
        You run to the space-time door, which will lead you back to the beginning of the game. There's a key hole on the door. You must carry 6 flowers to get through the door.`,
            choices: [
                {
                    id: 1,
                    content: "[Use Key] [Hold the flowers] Let's go back from the beginning",
                    nextName: "start",
                    precondition: {
                        item: [
                            { itemName: "key", itemQty: 1, itemCode: "key1", },
                            { itemName: 'flowers', itemQty: 6, itemCode: `wild_flowers` }
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
                    nextName: "oh? you're still here?",
                    consequence: {
                        item: [
                            { itemName: "key", description: "A small key. You wonder what it's for.", itemQty: 1, itemCode: "key1", },
                            { itemName: "candied nut", description: "A sweet, sweet treat", itemQty: 1, itemCode: "nut1", },
                        ],
                    },
                },
                {
                    id: 3,
                    content: `Hmmm`,
                    nextName: "cave ahead"
                },
            ],
            preId: 3
        },
        {
            // id: 5,
            name: "oh? you're still here?",
            content: ``,
            choices: [
                {
                    id: 1, content: "This is truly the end. There's nothing else. Let's just go back",
                    nextName: "start",
                    consequence: {
                        stat: [{ statName: 'Growl', value: 1, style: statStyle.show }],
                    }
                },
                { id: 2, content: "Trust me on this one my friend.", nextName: "start" },
                {
                    id: 3, content: "Jump over the ledge?",
                    nextName: "edge",
                    precondition: {
                        item: [
                            { itemName: "key", itemQty: 1, itemCode: "key1", },
                        ],
                        stat: [
                            { statName: `Athletic`, value: 10 },
                        ],
                    },
                },
            ],
        },
        {
            // id: 6,
            name: "edge",
            content: `You leaped across the ledge! And landed successfully. You are safe, for now.`,
            choices: [
                {
                    id: 1, content: `Weeee!`, nextName: "start"
                },
            ],
        },
        {
            // id: 7,
            name: "cave ahead",
            content: `You walked south from where you started. You saw a cave`,
            choices: [
                {
                    id: 1,
                    content: `Enter Cave`,
                    nextName: "enter cave",
                },
                {
                    id: 2,
                    content: `Turn back to where you started`,
                    nextName: "edge"
                },
                {
                    id: 3,
                    content: `Stop and think for a moment`,
                    nextName: "start"
                },
            ],
        },
        {
            // id: 8,
            name: "enter cave",
            content: `You enter the cave. It's dark, pitch-black in here`,
            choices: [
                {
                    id: 1,
                    content: `Try to adjust your eyes`,
                    nextName: "start",
                    precondition: {
                        item: [{
                                itemName: `sword`,
                                itemQty: 1,
                                itemCode: `sword`,
                            },
                        ],
                        stat: [],
                    },
                },
                {
                    id: 2,
                    content: `Turn back to the cave entrance`,
                    nextName: "cave ahead"
                },
            ],
        },
    ];
    return paragraphs;
}
