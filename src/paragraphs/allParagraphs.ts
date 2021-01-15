import { Paragraphs } from "../model/paragraph.js";
import { capitalise } from "../tools/formatting.js";
import { Player } from "../model/player.js";

export class Paragraph {
  player: Player;
  paragraph: Paragraphs[];

  constructor(player: Player) {
    this.player = player;
    this.paragraph = [
      //Array starts at 0
      {
        id: 0,
        name: "start",
        content: `This is the first paragraph. <u><b>Welcome to a game!<\/b><\/u> This game is a multi choice Interactive fiction. Different choices will lead to different outcomes. Rejoice! Enjoy your time playing here!`,
        choices: [
          { choiceCont: "Alright then, lead me to the next paragraph", nextid: 1 },
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
          { choiceCont: "Ooooh! Next!!!!!", nextid: 2 },
          { choiceCont: `I'm scared. Let's go back to the first one!`, nextid: 0 }],
        item: [
          {
            itemName: 'sword',
            itemQty: 1,
            description: "An old, rusty sword you found on the ground.",
            itemCode: "sword",
            pickedUp: false
          },
          {
            itemName: 'great sword',
            itemQty: 1,
            description: "An old, rusty great sword you found on the ground.",
            itemCode: "great_sword",
            pickedUp: false
          },
        ],
        variable: "valor:1",
        preId: 0
      },

      {
        id: 2,
        name: "greeting",
        content: `This is the third paragraph. A guy whoops in and said: "This is ${player?.playerName}! ${capitalise(player?.pronouns.is)} finally here!" Oh well, this is the end. Bye ${player?.playerName}!`,
        choices: [
          { choiceCont: "Last one!", nextid: 3 }
        ],
        preId: 1,
      },

      {
        id: 3,
        name: "key on ground",
        content: `You found a key lying on the ground.<br> Just a heads-up. The next paragraph uses update style "append".<br>`,
        choices: [
          { choiceCont: "Move along", nextid: 4, style: "append" }
        ],
        item: [{ itemName: 'key', itemQty: 1, description: "A small key. You wonder what it's for.", itemCode: "key1", pickedUp: false }],
        preId: 2
      },

      {
        id: 4,
        name: "surprise",
        content: `There's a bear behind you! AAAAAAAAAAAAAAAAAAAAA`,
        choices: [
          {
            choiceCont: "Let's go back from the beginning", nextid: 0,
            precondition: { item: { itemName: "key", itemQty: 1, itemCode: "key1" } }
          },
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
    ]
  }
  getParagraph(id: number) {
    return this.paragraph[id];
  }
  updatePlayer(p: Player) {
    this.player = p;
  };
}