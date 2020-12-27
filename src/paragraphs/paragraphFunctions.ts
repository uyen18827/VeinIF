import { Paragraphs } from "../model/paragraph.js";
import { player } from "../player/playerInfo.js";
import { getParagraph } from "./allParagraphs.js";
var currentParagraph: string | undefined;
/**Get nextid, then show the paragraph with that id.
  * @param {number} nextid next paragraph's id.
  * @param {string} style optional. Update paragraph style. Leave blank for default: clear previous paragraph then show the next one.
*/
export function updateParagraph(nextid: number, style?: string) {
    let allParagraphs: Paragraphs[] = getParagraph();
    const choiceContainer: HTMLElement | any = document.getElementById("choices");
    const paragraphContainer: HTMLElement | any = document.getElementById("paragraph");
    let choices;
    allParagraphs = getParagraph(player);
    switch (style) {
        case "append":
            currentParagraph = currentParagraph + " " + allParagraphs[nextid].content;
            paragraphContainer.innerHTML = currentParagraph;
            choiceContainer.innerHTML = null;
            choices = allParagraphs[nextid].choices;

            if (choices) {
                for (var i = 0; i < choices.length; i++) {
                    var currentChoice = choices[i];
                    var nextid: number = currentChoice.nextid;
                    let choice = `<a href="#" 
                    class="choices" id="n${nextid}" >
                    ${currentChoice.choiceCont} 
                    </a><br>`
                    choiceContainer.innerHTML += choice;
                }
                for (var i = 0; i < choices.length; i++) {
                    let currentChoice = choices[i];
                    console.log("currentChoice.nextid" + currentChoice.nextid)
                    let nextid: number = currentChoice.nextid;
                    let style = choices[i].style;
                    console.log("nextid: " + nextid)
                    let choiceHTML = choiceContainer.querySelector("#n" + nextid);
                    choiceHTML.addEventListener('click', function () { updateParagraph(nextid, style) });
                }
            }
            break;
        default:
            paragraphContainer.innerHTML = null;
            choiceContainer.innerHTML = null;
            currentParagraph = allParagraphs[nextid].content;
            paragraphContainer.innerHTML = currentParagraph;
            choices = allParagraphs[nextid].choices;
            if (choices) {
                for (var i = 0; i < choices.length; i++) {
                    var currentChoice = choices[i];
                    var nextid: number = currentChoice.nextid;
                    let choice = `<a href="#" 
                    class="choices" id="n${nextid}" >
                    ${currentChoice.choiceCont} 
                    </a><br>`
                    choiceContainer.innerHTML += choice;
                }
                for (var i = 0; i < choices.length; i++) {
                    let currentChoice = choices[i];
                    let nextid: number = currentChoice.nextid;
                    let choiceHTML = choiceContainer.querySelector("#n" + nextid);
                    let style = choices[i].style;
                    choiceHTML.addEventListener('click', function () { updateParagraph(nextid, style) });
                }
            }
            break;
    }
}
//TODO: known problems: when there's two options that redirect the user to the same paragraph,
//only the first option will work.