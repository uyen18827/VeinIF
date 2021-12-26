import { Paragraphs } from "../core/model/paragraph";
import { capitalise, verbForm } from "../tools/formatting";
import { Player } from "../core/model/player";
import { statStyle } from "../core/model/Stat";
import catImg from "../../assets/images/cat.jpg"
/**
 * Override properties from interface Paragraphs
 * Add custom properties here.
 */
interface customParagraphs extends Paragraphs {
  // special?: string;
}
/**
 * Entry point. Contains all game content. 
 * Please refrain from changing paragraphs' name. Doing so will affect other paragraphs that depends on the said paragraph.
 * @param player takes in and update the player's information. Optional.
 * @returns paragraphs
 */
export function getParagraph(player?: Player) {
  let paragraphs: customParagraphs[] =
    [
      {
        name: "start",
        content: `<p> You are but a <b>simple knight</b>, stationed at a remote village.
        Life was peaceful, until a day. </p>
        <p>The crops just won't grow.</p>
        <p>The villagers looked for someone to blame. And so they found.
        The witches <i>must</i> be the one who befall this ill fate on them. Even though they've lived in peace due to a pact with the villagers elders 100 years ago, villagers still hold a certain degree of distrust towards the witches.</p>
        <p> Even though the witches' medicine has saved some children and elders from time to time. </p>
        <p>
        And so, they tasked you to go, and confront the village's witches.</p>
        <p>Every knight may look the same with that armour, but everyone has a name. And yours is...<br>
        <input id="playerName" type="text" placeholder="Enter your name here!" aria-label="playerName" value="${player?.playerName}">
        </p>
        <p>
        <div id="pronouns">And your preferred pronouns are...<br></div></p>
        <p>Now that you've got that settled, ...</p>
        `,
        choices: [
          {
            id: 1,
            content: `With your trusty old sword in hand and armour oiled, you set out to find the witches' lair`,
            nextName: `walking`,
            consequence: {
              item: [
                {
                  itemName: `Old sword`,
                  itemQty: 1,
                  description: `Your old and trusty sword.`,
                  itemCode: `old-sword`,
                },
              ]
            }
          },
        ],
      },
      {
        name: "walking",
        content: `<p>And you go, into the forest.</p>
        <p>You start to think about yourself. Say, what's your best quality?</p>`,
        choices: [
          {
            id: 1,
            content: `Your intelligence, of course. You've learned a lot.`,
            nextName: `out`,
            consequence: {
              stat: [
                {
                  statName: `Intelligence`, value: 10,
                  style: statStyle.show,
                  statID: `int`
                },

              ]
            }
          },
          {
            id: 2,
            content: `Your strength, of course. You're a skilled, strong knight.`,
            nextName: `out`,
            consequence: {
              stat: [
                { statID: "str", statName: `Strength`, value: 10, style: statStyle.show },
              ]
            }
          },
          {
            id: 3,
            content: `Jack of all trades, but master of none. You're equally good at both thinking and punching, but excel in neither.`,
            nextName: `out`,
            consequence: {
              stat: [
                { statID: "int", statName: `Intelligence`, value: 5, style: statStyle.show },
                { statID: "str", statName: `Strength`, value: 5, style: statStyle.show },
              ]
            }
          },
        ],
      },
      {
        name: "out",
        content: `<p>You kept walking. Far into the forest near the village, you found a small hut.
        Outside, meat are hung up to be sun-dried.</p>
        <p>
        This must be the witches' lair. There should be three of them.</p>
        <p>You knock on the door.</p>
        `,
        choices: [
          {
            id: 1,
            content: `<b>Knock</b> knock`,
            nextName: `witches-lair`
          },
        ],
      },
      {
        name: "witches-lair",
        content: `<p>The door opens by itself.</p>
        <p>In front of you, three witches stand.</p>
        <p>"<b>${player?.playerName}</b>. If you could spare a minute to hear what we have to say" - the tallest of the three said.</p>
        <p>"There's a wicked dragon up this mountain. It's the one that cursed our village. For each who dies of starvation, the dragons gains in strength." - the cloaked one said.</p>
        <p>"We know that the villagers have sent you out to deal with us, and we beg of you, we're telling the truth. </p>
        <p>
        They will be heading our way soon. We must escape." - the shortest one looks at you pleadingly.</p>

        <p>What will you do?</p>
        `,
        choices: [
          {
            id: 1,
            content: `They're lying for sure. Never should've trusted the witches.`,
            nextName: `deliver-justice`
          },
          {
            id: 2,
            content: `You believe them. They'll have to get out of here fast.`,
            nextName: `hiding`
          },
        ],
      },
      {
        name: "hiding",
        content: `<p>Before you can do anything to help the witches escape, loud noises are at the door.</p>
        <p><i>"Wretched witches! Heal! Our! Land!"</i></p>
        <p> No doubt this is an angry mob. The sound is getting closer and closer.</p>
        `,
        choices: [
          {
            id: 1,
            content: `[Intelligence] Think of a clever way to convince them that the witches are long gone.`,
            nextName: `lie-success`,
            precondition: {
              stat: [
                { statID: "int", statName: `Intelligence`, value: 1, },
              ]
            }
          },
          {
            id: 2,
            content: `Scramble and try to convince them that the witches have just escaped.`,
            nextName: `lie-failed`,
            consequence: {
              stat: [
                { statID: "relation_village", statName: "Relationship: Village", value: -9, style: statStyle.show },
              ],
            }
          },
        ],
      },
      {
        name: "lie-failed",
        content: `
        <p>The witches shrink themselves. You pick them up and hide them inside a soup pot. Just in time, the door burst open. It's the village's youths who's decided to confront the witches themselves.</p>
        <p>You tried your best to made up a convincing story. However not all of them seems to be convinced by it. Some thinks you're covering the witches, others think that you are just an incapable knight who had failed to capture the witches.
        </p>
        <p>For your failure, the villagers had decided to exile you. Only when the curse is lifted are you able to return.</p>
        <p>And so you stayed behind in the witches' hut.</p>
        `,
        choices: [
          {
            id: 1,
            content: `You make sure that the villagers are gone, and talk to the witches about the dragon.`,
            nextName: `witches-talk`
          },
        ],
      },
      {
        name: "lie-success",
        content: `
        <p>The witches shrink themselves. You pick them up and hide them inside a soup pot. Just in time, the door burst open. It's the village's youths who's decided to confront the witches themselves.</p>
        <p>You make up a rather convincing story of how no one's home when you arrived. And so you stayed in the hut to see if they would come back. You lit the fireplace because it was getting cold. And it really was. </p>
        <p>The villagers believed you. After all, there's no reason for them not to. You're their trusted knight after all.</p>
        <p>And you continue to stay behind <i>"to see if the witches would return"</i>.
        </p>`,
        choices: [
          {
            id: 1,
            content: `You wait for them to leave, and talk to the witches about the dragon.`,
            nextName: `witches-talk`
          },
        ],
      },
      {
        name: "witches-talk",
        content: `<p>You open the lid and the witches quickly enlarge back to their original size.</p>
        <p>"The dragon should be up  that mountain, in case you've forgotten. Here, this is for you." the cloaked witch reaches into her cloak and pull out a sword. She puts it on the table.</p>
        <p>A magical sword. It teems with power. No doubt you could take down the dragon with it.</p>
        <p>You were so engrossed in admiring the sword that you didn't realise the witches are gone.</p>`,
        item: [
          {
            itemName: `Magic Sword`,
            itemQty: 1,
            description: `A magical sword that has strong powers within.`,
            itemCode: `magic-sword`,
          },
        ],
        choices: [
          {
            id: 1,
            content: `Time to find the dragon.`,
            nextName: `dragon-tower`
          },
        ],
      },
      {
        name: "deliver-justice",
        content: `<p>They are no match for a seasoned knight like you. One by one, they fell.</p>
        <p>Shortly after, you heard noises that could only be of an angry mob.</p> "Wretched witches! Heal our land!" they said.`,
        choices: [
          {
            id: 1,
            content: `You open the door.`,
            nextName: `justice-open-door`
          },
        ],
      },
      {
        name: "justice-open-door",
        content: `<p>The villagers couldn't believe their eyes.</p>
        <p>"The witches are dead! The curse is lifted!"</p>
        <p>The villagers cheers and celebrated with all of the little food they have left. The curse has ended! The crops shall grow again. Soon.</p>
        <p>But reality is often disappointing.</p>
        <p>Nothing blooms, nothing grew. Once again, despair covers the whole village. </p>
        <p>Maybe the witches were right.</p>
        <p>You set out quietly to the forrest and up the mountain.</p>
        `,
        choices: [
          {
            id: 1,
            content: `The dragon shall pay`,
            nextName: `dragon-tower`
          },
        ],
      },
      {
        name: "dragon-tower",
        content: `<p>You climb up the foggy mountains for what feels like hours. At the top, the fog clears.</p>
        <p>A huge tower that seems to stretch impossibly up even high. It's hard to miss, but you've never seen it from the village. Foul magic might be at play, concealing the tower.</p>
        
        <p>A dragon swoop down. It regards you with toothy smile and a sinister look in its eye.</p>
        <p>There's only one thing to do</p>
        `,
        choices: [
          {
            id: 1,
            content: `Use your trusty old sword and slay the beast`,
            nextName: `failure`
          },
          {
            id: 2,
            content: `Use the Magic Sword and slay the beast.`,
            nextName: `success`,
            precondition: {
              item: [
                {
                  itemName: `Magic Sword`,
                  itemQty: 1,
                  itemCode: `magic-sword`,
                },
              ]
            }
          },
          {
            id: 3,
            content: `Use your great strength to land a strong attack on the dragon.`,
            nextName: `success`,
            precondition: {
              stat: [
                { statID: "str", statName: `Strength`, value: 10 },
              ],
            }
          },
        ],
      },
      {
        name: "success",
        content: `<img src="${catImg}">
        <p>You did it! You killed the dragon.</p>
        <p>
        You are excited to go back home. The curse should be lifted!
        </p>`,
        choices: [
          {
            id: 1,
            content: `Climb down and go home`,
            nextName: `go-home`
          },
        ],
      },
      {
        name: "go-home",
        content: `<p>It takes several days to descend the mountain and walk back to the village.</p>
        <p>You wonder what's waiting for you back home.</p>
        <p></p>`,
        choices: [
          {
            id: 1,
            content: `You confidently walk into the village square.`,
            nextName: `home`,
            precondition: {
              stat: [{ statID: "relation_village", statName: `Relationship: Village`, value: 10, },],
            },

          },
          {
            id: 2,
            content: `You anxiously walk into the village square.`,
            nextName: `home-redeemed`,
            precondition: {
              stat: [{ statID: "relation_village", statName: `Relationship: Village`, value: 1, },],
            },
          },
        ],
      },
      {
        name: "home",
        content: `<p>Alas, you are home. </p>
        <p>"<b>${player?.playerName}</b>! There <b>${player?.pronouns.is}</b>! <b>${capitalise(player?.pronouns.is)}</b> our hero! ${capitalise(player?.pronouns.subjectPro)} ${verbForm('was', 'were')} the one who lifted the curse!"</p>
        <p>You are relieved. It seems that you have succeeded after all.</p>
        <p><b>The End</b></p>
        <p>Ending 1 of 3</p>`,
      },
      {
        name: "failure",
        content: `<p>But unfortunately, your efforts against the dragon was in vain. It's too powerful for you and your good ol' sword.</p>
        <p>Your vision fade to darkness.</p>
        <p><b>The End</b></p>
        <p>Ending 2 of 3</p>`,
      },
      {
        name: "home-redeemed",
        content: `<p>Alas, you are home. </p>
        <p>"<b>${player?.playerName}</b>! There <b>${player?.pronouns.is}</b>! <b>${capitalise(player?.pronouns.is)}</b> our hero! ${capitalise(player?.pronouns.subjectPro)} ${verbForm('was', 'were')} the one who lifted the curse!"</p>
        <p>You are relieved. It seems that you have succeeded after all.</p>
        <p>You are welcomed back into the village with open arms.</p>
        <p><b>The End</b></p>
        <p>Ending 3 of 3</p>`,
      },
    ];
  return paragraphs;
}